export interface SimulatorConfig {
  model: string
  users: number
  requestsPerUserPerDay: number
  systemPromptTokens: number
  injectedDataTokens: number
  averageResponseTokens: number
  useTools: boolean
  llmCallsPerRequest: number
}

export interface Calculations {
  totalRequestsPerMonth: number
  totalInputTokensPerMonth: number
  totalOutputTokensPerMonth: number
  inputCost: number
  outputCost: number
  totalCost: number
  costPerUser: number
  costPerRequest: number
}
