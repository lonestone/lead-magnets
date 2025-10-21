export interface Provider {
  name: string
  pricingUrl: string
}

export interface Model {
  name: string
  provider: keyof typeof providers
  inputPrice: number
  outputPrice: number
  toolTokens: number
}

export const providers = {
  openai: {
    name: 'OpenAI',
    pricingUrl: 'https://openai.com/api/pricing/',
  },
  anthropic: {
    name: 'Anthropic',
    pricingUrl: 'https://claude.com/pricing#api',
  },
  google: {
    name: 'Google',
    pricingUrl: 'https://ai.google.dev/pricing',
  },
  mistral: {
    name: 'Mistral',
    pricingUrl: 'https://mistral.ai/pricing#api-pricing',
  },
} as const

export const models: Record<string, Model> = {
  // OpenAI GPT
  'gpt-5': {
    name: 'GPT-5',
    provider: 'openai',
    inputPrice: 1.25,
    outputPrice: 10.0,
    toolTokens: 100,
  },
  // Anthropic Claude
  'claude-sonnet-4.5': {
    name: 'Claude Sonnet 4.5',
    provider: 'anthropic',
    inputPrice: 3.0,
    outputPrice: 15.0,
    toolTokens: 346,
  },
  'claude-3.7-sonnet': {
    name: 'Claude 3.7 Sonnet',
    provider: 'anthropic',
    inputPrice: 3.0,
    outputPrice: 15.0,
    toolTokens: 346,
  },
  'claude-sonnet-4': {
    name: 'Claude Sonnet 4',
    provider: 'anthropic',
    inputPrice: 3.0,
    outputPrice: 15.0,
    toolTokens: 346,
  },
  'claude-opus-4': {
    name: 'Claude Opus 4',
    provider: 'anthropic',
    inputPrice: 15.0,
    outputPrice: 75.0,
    toolTokens: 530,
  },
  'claude-3.5-haiku': {
    name: 'Claude 3.5 Haiku',
    provider: 'anthropic',
    inputPrice: 0.8,
    outputPrice: 4.0,
    toolTokens: 264,
  },
  // Google Gemini
  'gemini-2.5-pro': {
    name: 'Gemini 2.5 Pro',
    provider: 'google',
    inputPrice: 1.25,
    outputPrice: 10.0,
    toolTokens: 80,
  },
  'gemini-2.5-flash': {
    name: 'Gemini 2.5 Flash',
    provider: 'google',
    inputPrice: 0.1,
    outputPrice: 0.4,
    toolTokens: 50,
  },
  // Mistral
  'mistral-medium-3': {
    name: 'Mistral Medium 3',
    provider: 'mistral',
    inputPrice: 0.4,
    outputPrice: 2.0,
    toolTokens: 100,
  },
  'mistral-large-2': {
    name: 'Mistral Large 2',
    provider: 'mistral',
    inputPrice: 2.0,
    outputPrice: 6.0,
    toolTokens: 120,
  },
}
