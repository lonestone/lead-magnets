export const models = {
  // OpenAI GPT
  'gpt-5': {
    name: 'GPT-5',
    provider: 'OpenAI',
    inputPrice: 1.25,
    outputPrice: 10.0,
    toolTokens: 100,
  },
  // Anthropic Claude
  'claude-sonnet-4.5': {
    name: 'Claude Sonnet 4.5',
    provider: 'Anthropic',
    inputPrice: 3.0,
    outputPrice: 15.0,
    toolTokens: 346,
  },
  'claude-3.7-sonnet': {
    name: 'Claude 3.7 Sonnet',
    provider: 'Anthropic',
    inputPrice: 3.0,
    outputPrice: 15.0,
    toolTokens: 346,
  },
  'claude-sonnet-4': {
    name: 'Claude Sonnet 4',
    provider: 'Anthropic',
    inputPrice: 3.0,
    outputPrice: 15.0,
    toolTokens: 346,
  },
  'claude-opus-4': {
    name: 'Claude Opus 4',
    provider: 'Anthropic',
    inputPrice: 15.0,
    outputPrice: 75.0,
    toolTokens: 530,
  },
  'claude-3.5-haiku': {
    name: 'Claude 3.5 Haiku',
    provider: 'Anthropic',
    inputPrice: 0.8,
    outputPrice: 4.0,
    toolTokens: 264,
  },
  // Google Gemini
  'gemini-2.5-pro': {
    name: 'Gemini 2.5 Pro',
    provider: 'Google',
    inputPrice: 1.25,
    outputPrice: 10.0,
    toolTokens: 80,
  },
  'gemini-2.5-flash': {
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    inputPrice: 0.1,
    outputPrice: 0.4,
    toolTokens: 50,
  },
  // Mistral
  'mistral-medium-3': {
    name: 'Mistral Medium 3',
    provider: 'Mistral',
    inputPrice: 0.4,
    outputPrice: 2.0,
    toolTokens: 100,
  },
  'mistral-large-2': {
    name: 'Mistral Large 2',
    provider: 'Mistral',
    inputPrice: 2.0,
    outputPrice: 6.0,
    toolTokens: 120,
  },
}
