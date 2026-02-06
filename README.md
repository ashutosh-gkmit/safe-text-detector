# Safe Text Detector

A content classification server that uses AI to detect potentially unsafe names, emails, and usernames.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy the example environment file and configure your API keys:
```bash
cp .env.example .env
```

Edit `.env` and add your API key:
- For OpenAI: Set `OPENAI_API_KEY=your_openai_api_key`
- For Gemini: Set `GEMINI_API_KEY=your_gemini_api_key` and change `AI_PROVIDER=gemini`

### 3. Start the Server
```bash
node content-classifier-server.js
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### Classify Individual Content
- **Name classification**: `GET /classify?name=John Doe`
- **Email classification**: `GET /classify?email=john.doe123`

### Combined Classification
- **Name + Username**: `GET /classify-combined?name=John Doe&username=johndoe123`

### Utility
- **Clear cache**: `POST /clear-cache`

## Configuration Options

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server port |
| `AI_PROVIDER` | openai | AI provider (`openai` or `gemini`) |
| `AI_MODEL` | gpt-4o-mini | AI model to use |
| `OPENAI_API_KEY` | - | Required for OpenAI provider |
| `GEMINI_API_KEY` | - | Required for Gemini provider |

## Health Check
- **Health check**: `GET /`

## Example Response

### Success Response
```curl "http://localhost:3000/classify-combined?name=Modreen%20Moyo&username=ChocolateLolita02"```

```json
{
  "success": true,
  "classification": {
    "name": "Modreen Moyo",
    "username": "ChocolateLolita02",
    "combinedAnalysis": true,
    "result": "UNSAFE",
    "isSafe": false,
    "modelUsed": "gemini",
    "source": "api"
  },
  "timestamp": "2026-02-06T10:12:07.248Z"
}
```

## Using name endpoint

```curl "http://localhost:3000/classify?name=ChocolateLolita02"```

```json
{"success":true,"classification":{"content":"ChocolateLolita02","contentType":"name","result":"UNSAFE","isSafe":false,"modelUsed":"gemini","source":"api","rawResponse":"UNSAFE"},"timestamp":"2026-02-06T10:19:55.490Z"}
```

## Using email endpoint

```curl "http://localhost:3000/classify?email=ChocolateLolita02"```

```json
{"success":true,"classification":{"content":"ChocolateLolita02","contentType":"email","result":"UNSAFE","isSafe":false,"modelUsed":"gemini","source":"api","rawResponse":"UNSAFE"},"timestamp":"2026-02-06T10:19:55.490Z"}
```
