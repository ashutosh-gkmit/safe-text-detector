// Format name examples for prompt inclusion

function formatNameExamples(examples, limit = 6) {
    const safeExamples = [];
    const unsafeExamples = [];
    
    examples.forEach(example => {
        if (example.ans === 'SAFE' && safeExamples.length < limit) {
            safeExamples.push(example);
        } else if (example.ans === 'UNSAFE' && unsafeExamples.length < limit) {
            unsafeExamples.push(example);
        }
    });
    
    return {
        safe: safeExamples,
        unsafe: unsafeExamples
    };
}

// Format combined examples for prompt inclusion
function formatCombinedExamples(examples, limit = 8) {
    const safeExamples = [];
    const unsafeExamples = [];
    
    examples.forEach(example => {
        if (example.ans === 'SAFE' && safeExamples.length < limit) {
            safeExamples.push(example);
        } else if (example.ans === 'UNSAFE' && unsafeExamples.length < limit) {
            unsafeExamples.push(example);
        }
    });
    
    return {
        safe: safeExamples,
        unsafe: unsafeExamples
    };
}

// Format email examples for prompt inclusion
function formatEmailExamples(examples, limit = 6) {
    const safeExamples = [];
    const unsafeExamples = [];
    
    examples.forEach(example => {
        if (example.ans === 'SAFE' && safeExamples.length < limit) {
            safeExamples.push(example);
        } else if (example.ans === 'UNSAFE' && unsafeExamples.length < limit) {
            unsafeExamples.push(example);
        }
    });
    
    return {
        safe: safeExamples,
        unsafe: unsafeExamples
    };
}

// Generate name classification prompt
function getNamePrompt(NAME_EXAMPLES) {
    const examples = formatNameExamples(NAME_EXAMPLES, 6);
    return `You are a professional content safety classifier for corporate environments.

CRITICAL INSTRUCTIONS:
Respond with EXACTLY one word: either "SAFE" or "UNSAFE"
No explanations, no additional text, no punctuation
Be strict in your classification

UNSAFE names include:
- Profanity or vulgar language
- Sexual or suggestive terms
- Offensive, hateful, or discriminatory words
- Drug, alcohol, or violence references
- Explicit or inappropriate humor
- Clearly fake or joke names
- Names that are clearly unprofessional
- Leetspeak variations of offensive terms

SAFE names include:
- Real first and last names from any culture
- Professional business names
- Standard name formats and combinations
- Names that would be acceptable in a corporate directory

EXAMPLES WITH REASONING:

SAFE NAMES:
${examples.safe.map(ex => `"${ex.name}" - ${ex.reason}`).join('\n')}

UNSAFE NAMES:
${examples.unsafe.map(ex => `"${ex.name}" - ${ex.reason}`).join('\n')}

TASK:
Classify the provided full name (first and last name combination).
Respond with: SAFE or UNSAFE`;
}

function getEmailPrompt(EMAIL_EXAMPLES) {
    const examples = formatEmailExamples(EMAIL_EXAMPLES, 6);
    return `You are a professional content safety classifier for corporate environments.

CRITICAL INSTRUCTIONS:
Respond with EXACTLY one word: either "SAFE" or "UNSAFE"
No explanations, no additional text, no punctuation
Be strict in your classification

UNSAFE email usernames include:
- Profanity or vulgar language
- Sexual or suggestive terms (including numbers like 69, 420)
- Offensive, hateful, or discriminatory words
- Drug, alcohol, or violence references
- Explicit or inappropriate humor
- Adult content indicators (xxx, goddess, etc.)
- Clearly unprofessional or offensive phrases

SAFE email usernames may include:
- Professional name combinations
- Creative words, rhymes, nicknames, or playful phrases
- Random or abstract words and colors
- Technical/system-generated identifiers
- Numbers, dots, or mixed characters (when not inappropriate)
- Slightly informal but non-offensive expressions

EXAMPLES WITH REASONING:

SAFE USERNAMES:
${examples.safe.map(ex => `"${ex.username}" - ${ex.reason}`).join('\n')}

UNSAFE USERNAMES:
${examples.unsafe.map(ex => `"${ex.username}" - ${ex.reason}`).join('\n')}

TASK:
Classify the provided email username (the part before the @ symbol).
Respond with: SAFE or UNSAFE`;
}

function getCombinedPrompt(COMBINED_EXAMPLES) {
    const examples = formatCombinedExamples(COMBINED_EXAMPLES, 6);
    return `You are a professional content safety classifier for corporate environments.

CRITICAL INSTRUCTIONS:
Respond with EXACTLY one word: either "SAFE" or "UNSAFE"
No explanations, no additional text, no punctuation
Be strict in your classification

You will analyze BOTH a full name and username together to make a contextual decision.

COMBINED ANALYSIS RULES:
- If username appears to be derived from the name (initials, parts of name, etc.), it's more likely SAFE
- If both name and username are individually appropriate, classify as SAFE
- If either name OR username contains inappropriate content, classify as UNSAFE
- Consider if username could be a nickname, abbreviation, or variation of the name
- Look for patterns like: firstlast, first.last, flast, firstname123, etc.
- Numbers like 420, 69 have inappropriate connotations
- Terms like "domina", "twerks", "hentai", "onlyfans" are sexually suggestive
- Identity mismatches (unrelated names) are concerning in corporate contexts

EXAMPLES WITH REASONING:

SAFE COMBINATIONS:
${examples.safe.map(ex => `"${ex.name}" | "${ex.username}" - ${ex.reason}`).join('\n')}

UNSAFE COMBINATIONS:
${examples.unsafe.map(ex => `"${ex.name}" | "${ex.username}" - ${ex.reason}`).join('\n')}

TASK:
Analyze the provided name and username combination for appropriateness.
Respond with: SAFE or UNSAFE`;
}

function getDefaultPrompt() {
    return `You are a professional content safety classifier for corporate environments.

CRITICAL INSTRUCTIONS:
Respond with EXACTLY one word: either "SAFE" or "UNSAFE"
No explanations, no additional text, no punctuation
Be strict in your classification

TASK: Classify the provided content.
Respond with: SAFE or UNSAFE`;
}

function getClassificationPrompt(contentType, examples) {
    const { NAME_EXAMPLES, EMAIL_EXAMPLES, COMBINED_EXAMPLES } = examples;
    
    switch (contentType) {
        case 'name':
            return getNamePrompt(NAME_EXAMPLES);
            
        case 'email':
            return getEmailPrompt(EMAIL_EXAMPLES);
            
        case 'combined':
            return getCombinedPrompt(COMBINED_EXAMPLES);
            
        default:
            return getDefaultPrompt();
    }
}

module.exports = {
    getClassificationPrompt,
    formatNameExamples,
    formatCombinedExamples,
    formatEmailExamples
};
