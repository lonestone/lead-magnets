import { useMemo } from 'react'
import { SimulatorConfig, Calculations } from '../types'
import { Model } from '../models'

export const useCalculations = (
  config: SimulatorConfig,
  selectedModel: Model
): Calculations => {
  return useMemo(() => {
    const totalRequestsPerDay = config.users * config.requestsPerUserPerDay
    const totalRequestsPerMonth = totalRequestsPerDay * 30

    // Tokens par requête
    let inputTokensPerRequest =
      config.systemPromptTokens + config.injectedDataTokens
    let outputTokensPerRequest = config.averageResponseTokens

    // Ajout des tokens pour les tools
    if (config.useTools) {
      inputTokensPerRequest += selectedModel.toolTokens

      // Multiplication par le nombre d'appels LLM
      inputTokensPerRequest *= config.llmCallsPerRequest
      outputTokensPerRequest *= config.llmCallsPerRequest
    }

    // Tokens totaux par mois
    const totalInputTokensPerMonth =
      (inputTokensPerRequest * totalRequestsPerMonth) / 1000000 // en MTok
    const totalOutputTokensPerMonth =
      (outputTokensPerRequest * totalRequestsPerMonth) / 1000000 // en MTok

    // Calcul des coûts
    const inputCost = totalInputTokensPerMonth * selectedModel.inputPrice
    const outputCost = totalOutputTokensPerMonth * selectedModel.outputPrice

    const totalCost = inputCost + outputCost
    const costPerUser = totalCost / config.users
    const costPerRequest = totalCost / totalRequestsPerMonth

    return {
      totalRequestsPerMonth,
      totalInputTokensPerMonth,
      totalOutputTokensPerMonth,
      inputCost,
      outputCost,
      totalCost,
      costPerUser,
      costPerRequest,
    }
  }, [config, selectedModel])
}
