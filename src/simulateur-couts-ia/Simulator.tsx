import React, { useState, useMemo } from 'react'
import { Users, MessageSquare, Zap, DollarSign, Info } from 'lucide-react'
import { models } from './models'

const AICostSimulator = () => {
  const [config, setConfig] = useState({
    model: 'gpt-5',
    users: 100,
    requestsPerUserPerDay: 10,
    systemPromptTokens: 500,
    injectedDataTokens: 1000,
    averageResponseTokens: 800,
    useTools: false,
    llmCallsPerRequest: 1,
  })

  const selectedModel = models[config.model]

  const calculations = useMemo(() => {
    const totalRequestsPerDay = config.users * config.requestsPerUserPerDay
    const totalRequestsPerMonth = totalRequestsPerDay * 30

    // Tokens par requête
    let inputTokensPerRequest =
      config.systemPromptTokens + config.injectedDataTokens
    let outputTokensPerRequest = config.averageResponseTokens

    // Ajout des tokens pour les tools
    if (config.useTools) {
      inputTokensPerRequest += selectedModel.toolTokens
    }

    // Multiplication par le nombre d'appels LLM
    inputTokensPerRequest *= config.llmCallsPerRequest
    outputTokensPerRequest *= config.llmCallsPerRequest

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

  const handleConfigChange = (field, value) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Configuration */}
      <div className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modèle (LLM)
              </label>
              <select
                value={config.model}
                onChange={(e) => handleConfigChange('model', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <optgroup label="OpenAI">
                  <option value="gpt-5">GPT-5</option>
                </optgroup>
                <optgroup label="Anthropic Claude">
                  <option value="claude-sonnet-4.5">Claude Sonnet 4.5</option>
                  <option value="claude-sonnet-4">Claude Sonnet 4</option>
                  <option value="claude-3.7-sonnet">Claude 3.7 Sonnet</option>
                  <option value="claude-opus-4">Claude Opus 4</option>
                  <option value="claude-3.5-haiku">Claude 3.5 Haiku</option>
                </optgroup>
                <optgroup label="Google Gemini">
                  <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
                  <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                </optgroup>
                <optgroup label="Mistral">
                  <option value="mistral-medium-3">Mistral Medium 3</option>
                  <option value="mistral-large-2">Mistral Large 2</option>
                </optgroup>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Nombre d'utilisateurs
                </label>
                <input
                  type="number"
                  value={config.users}
                  step={100}
                  onChange={(e) =>
                    handleConfigChange('users', parseInt(e.target.value))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Requêtes/jour/utilisateur
                </label>
                <input
                  type="number"
                  value={config.requestsPerUserPerDay}
                  step={10}
                  onChange={(e) =>
                    handleConfigChange(
                      'requestsPerUserPerDay',
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Système prompt (tokens)
                </label>
                <input
                  type="number"
                  value={config.systemPromptTokens}
                  step={100}
                  onChange={(e) =>
                    handleConfigChange(
                      'systemPromptTokens',
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Données injectées (tokens)
                </label>
                <input
                  type="number"
                  value={config.injectedDataTokens}
                  step={100}
                  onChange={(e) =>
                    handleConfigChange(
                      'injectedDataTokens',
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taille moyenne réponse (tokens)
              </label>
              <input
                type="number"
                value={config.averageResponseTokens}
                step={100}
                onChange={(e) =>
                  handleConfigChange(
                    'averageResponseTokens',
                    parseInt(e.target.value)
                  )
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Zap className="w-4 h-4 inline mr-1" />
                  Utiliser les Tools
                </label>
                <select
                  value={config.useTools ? 'true' : 'false'}
                  onChange={(e) =>
                    handleConfigChange('useTools', e.target.value === 'true')
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="false">Non</option>
                  <option value="true">Oui</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appels LLM/requête
                </label>
                <input
                  type="number"
                  min="1"
                  value={config.llmCallsPerRequest}
                  step={1}
                  onChange={(e) =>
                    handleConfigChange(
                      'llmCallsPerRequest',
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="space-y-6">
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Coût mensuel estimé
          </h2>

          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">
                ${calculations.totalCost.toFixed(2)}
              </div>
              <div className="text-gray-600">Total mensuel</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-2xl font-semibold">
                  ${calculations.costPerUser.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Par utilisateur</div>
              </div>

              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-2xl font-semibold">
                  ${calculations.costPerRequest.toFixed(4)}
                </div>
                <div className="text-sm text-gray-600">Par requête</div>
              </div>
            </div>
          </div>
        </div>

        {/* Détail des coûts */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Détail des coûts</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Tokens d'entrée:</span>
              <span className="font-semibold">
                ${calculations.inputCost.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-700">Tokens de sortie:</span>
              <span className="font-semibold">
                ${calculations.outputCost.toFixed(2)}
              </span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between items-center font-bold">
              <span>Total:</span>
              <span>${calculations.totalCost.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Info className="w-5 h-5" />
            Statistiques
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Modèle:</span>
              <span className="font-medium">{selectedModel.name}</span>
            </div>

            <div className="flex justify-between">
              <span>Provider:</span>
              <span className="font-medium">{selectedModel.provider}</span>
            </div>

            <div className="flex justify-between">
              <span>Requêtes/mois:</span>
              <span className="font-medium">
                {calculations.totalRequestsPerMonth.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tokens entrée/mois:</span>
              <span className="font-medium">
                {calculations.totalInputTokensPerMonth.toFixed(2)}M
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tokens sortie/mois:</span>
              <span className="font-medium">
                {calculations.totalOutputTokensPerMonth.toFixed(2)}M
              </span>
            </div>

            <div className="flex justify-between">
              <span>Prix entrée:</span>
              <span className="font-medium">
                ${selectedModel.inputPrice}/MTok
              </span>
            </div>

            <div className="flex justify-between">
              <span>Prix sortie:</span>
              <span className="font-medium">
                ${selectedModel.outputPrice}/MTok
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AICostSimulator
