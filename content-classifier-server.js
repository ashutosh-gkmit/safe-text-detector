require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { NAME_EXAMPLES, USERNAME_EXAMPLES, COMBINED_EXAMPLES, EMAIL_EXAMPLES } = require('./classification-examples');
const { getClassificationPrompt } = require('./prompts');
const app = express();
const PORT = process.env.PORT || 3000;

const classificationCache = new Map();

app.use(express.json());

const AI_CONFIG = {
    provider: process.env.AI_PROVIDER || 'openai',
    model: process.env.AI_MODEL || 'gpt-4o-mini',
    apiKey: process.env.AI_API_KEY
};

let openai, gemini;

if (AI_CONFIG.provider === 'openai') {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is required');
    }
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
} else if (AI_CONFIG.provider === 'gemini') {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is required');
    }
    gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

async function callAIModel(content, contentType) {
    try {
        const examples = { NAME_EXAMPLES, EMAIL_EXAMPLES, COMBINED_EXAMPLES };
        const prompt = getClassificationPrompt(contentType, examples);
        console.log(`[${AI_CONFIG.provider.toUpperCase()}] Classifying ${contentType}: "${content}"`);

        let rawResponse;

        if (AI_CONFIG.provider === 'openai') {
            const completion = await openai.chat.completions.create({
                model: AI_CONFIG.model,
                messages: [
                    { role: "system", content: prompt },
                    { role: "user", content: content }
                ],
                temperature: 0.1,
                max_tokens: 10
            });

            console.log('OpenAI response:', completion);
            rawResponse = completion.choices[0].message.content;

        } else if (AI_CONFIG.provider === 'gemini') {
            const model = gemini.getGenerativeModel({ model: AI_CONFIG.model });
            
            const fullPrompt = `${prompt}\n\nContent to classify: ${content}`;
            const result = await model.generateContent(fullPrompt, {
                generationConfig: {
                    temperature: 0.1,
                    maxOutputTokens: 10
                }
            });
            const response = await result.response;
            
            console.log('Gemini response:', response);
            rawResponse = response.text();

        } else {
            throw new Error(`Unsupported AI provider: ${AI_CONFIG.provider}`);
        }

        console.log(`[${AI_CONFIG.provider.toUpperCase()}] Raw response:`, rawResponse);
        return rawResponse.trim();

    } catch (error) {
        console.error(`[${AI_CONFIG.provider.toUpperCase()}] Error:`, error.message);
        throw error;
    }
}

function parseClassificationResponse(rawResponse, content) {
    if (!rawResponse) {
        console.warn(`Empty response for content: "${content}"`);
        return { isSafe: true, confidence: 'low' };
    }

    console.log(`Raw response: "${rawResponse}"`);

    const cleaned = rawResponse
        .replace(/<[^>]*>/g, '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/['"]/g, '')
        .trim()
        .toUpperCase();

    console.log(`Cleaned response: "${cleaned}"`);

    if (cleaned === 'UNSAFE') {
        console.log('Parsed as UNSAFE');
        return { isSafe: false, confidence: 'high' };
    } else if (cleaned === 'SAFE') {
        console.log('Parsed as SAFE');
        return { isSafe: true, confidence: 'high' };
    } 
    
    if (cleaned.includes('UNSAFE')) {
        console.log('Contains UNSAFE - parsed as unsafe');
        return { isSafe: false, confidence: 'medium' };
    } else if (cleaned.includes('SAFE')) {
        console.log('Contains SAFE - parsed as safe');
        return { isSafe: true, confidence: 'medium' };
    } 
    
    console.warn(`Ambiguous response for "${content}": "${rawResponse}"`);
    return { isSafe: true, confidence: 'low' };
}


function generateCacheKey(content, contentType) {
    return `${contentType}:${AI_CONFIG.provider}:${content}`;
}


async function classifyContent(content, contentType) {
    try {
        if (!content || typeof content !== 'string') {
            return {
                error: 'Invalid content provided',
                status: 400
            };
        }

        const trimmedContent = content.trim();
        if (trimmedContent.length === 0) {
            return {
                error: 'Empty content provided',
                status: 400
            };
        }

        if (trimmedContent.length > 500) {
            return {
                error: 'Content too long (max 500 characters)',
                status: 400
            };
        }

        const cacheKey = generateCacheKey(trimmedContent, contentType);

        if (classificationCache.has(cacheKey)) {
            const cachedResult = classificationCache.get(cacheKey);
            console.log(`Retrieved cached result for: "${trimmedContent}"`);
            return {
                ...cachedResult,
                fromCache: true,
                cacheKey: cacheKey
            };
        }

        console.log(`No cached result found for: "${trimmedContent}"`);

        const rawResponse = await callAIModel(trimmedContent, contentType);
        
        const classification = parseClassificationResponse(rawResponse, trimmedContent);
        
        const result = {
            content: trimmedContent,
            contentType: contentType,
            modelUsed: AI_CONFIG.provider,
            isSafe: classification.isSafe,
            confidence: classification.confidence,
            rawResponse: rawResponse,
            fromCache: false
        };

        if (classification.confidence === 'high') {
            classificationCache.set(cacheKey, {
                content: trimmedContent,
                contentType: contentType,
                modelUsed: AI_CONFIG.provider,
                isSafe: classification.isSafe,
                confidence: classification.confidence,
                rawResponse: rawResponse,
                timestamp: new Date().toISOString()
            });
            console.log(`Cached result for: "${trimmedContent}"`);
            result.cached = true;
        } else {
            console.log(`Not caching low confidence result for: "${trimmedContent}"`);
            result.cached = false;
        }
        
        return result;

    } catch (error) {
        console.error('Classification Error:', error.message);
        return {
            error: 'Classification service temporarily unavailable',
            status: 500,
            details: error.message,
            
        };
    }
}


app.get('/classify', async (req, res) => {
    try {
        const { name, email } = req.query;

        let content, contentType;
        
        if (name) {
            content = name;
            contentType = 'name';
        } else if (email) {
            content = email;
            contentType = 'email';
        } else {
            return res.status(400).json({
                error: 'Missing required parameter',
                message: 'Provide either "name" or "email" parameter',
                examples: [
                    '/classify?name=John Doe Smith',
                    '/classify?email=john.doe123'
                ]
            });
        }

        const result = await classifyContent(content, contentType);

        if (result.error) {
            return res.status(result.status || 500).json({
                error: result.error,
                details: result.details
            });
        }

        res.json({
            success: true,
            classification: {
                content: result.content,
                contentType: result.contentType,
                result: result.isSafe ? 'SAFE' : 'UNSAFE',
                isSafe: result.isSafe,
                modelUsed: result.modelUsed,
                source: result.fromCache ? 'cache' : 'api',
                rawResponse: result.rawResponse
            },
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Endpoint Error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'An unexpected error occurred'
        });
    }
});

app.get('/classify-combined', async (req, res) => {
    try {
        const { name, username } = req.query;
        
        if (!name || !username) {
            return res.status(400).json({
                error: 'Missing required parameters',
                message: 'Both "name" and "username" parameters are required',
                examples: [
                    '/classify-combined?name=Calli Louise Edwards&username=edwardscalliox',
                    '/classify-combined?name=John Doe Smith&username=johndoe123'
                ]
            });
        }

        const combinedContent = `Name: ${name}\nUsername: ${username}`;
        const result = await classifyContent(combinedContent, 'combined');

        if (result.error) {
            return res.status(result.status || 500).json({
                error: result.error,
                details: result.details
            });
        }

        res.json({
            success: true,
            classification: {
                name: name,
                username: username,
                combinedAnalysis: true,
                result: result.isSafe ? 'SAFE' : 'UNSAFE',
                isSafe: result.isSafe,
                modelUsed: result.modelUsed,
                source: result.fromCache ? 'cache' : 'api'
            },
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Combined Classification Error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'An unexpected error occurred during combined classification'
        });
    }
});

app.get('/', (req, res) => {
    console.log('Server is running');
    res.status(200).json({
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

app.post('/clear-cache', (req, res) => {
    const previousSize = classificationCache.size;
    classificationCache.clear();
    
    res.json({
        message: 'Cache cleared successfully',
        previousSize: previousSize,
        currentSize: classificationCache.size,
        timestamp: new Date().toISOString()
    });
});

app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: 'An unexpected error occurred'
    });
});

app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        message: `The endpoint ${req.method} ${req.originalUrl} does not exist`,
        availableEndpoints: [
            'GET /classify?name=<name>',
            'GET /classify?email=<email>',
            'GET /classify-combined?name=<name>&username=<username>',
            'POST /clear-cache'
        ]
    });
});

app.listen(3000, () => {
    console.log(`Content Classification Server Started`);
    console.log(`Base URL: http://localhost:3000`);
    console.log(`Server ready for requests!`);
});
