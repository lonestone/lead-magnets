import React from 'react'
import { Users, MessageSquare, Zap } from 'lucide-react'
import { SimulatorConfig } from '../types'

interface ConfigurationCardProps {
  config: SimulatorConfig
  onConfigChange: (
    field: keyof SimulatorConfig,
    value: string | number | boolean
  ) => void
}

export const ConfigurationCard: React.FC<ConfigurationCardProps> = ({
  config,
  onConfigChange,
}) => {
  return (
    <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Modèle (LLM)
          </label>
          <select
            value={config.model}
            onChange={(e) => onConfigChange('model', e.target.value)}
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
                onConfigChange('users', parseInt(e.target.value))
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
                onConfigChange(
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
                onConfigChange('systemPromptTokens', parseInt(e.target.value))
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
                onConfigChange('injectedDataTokens', parseInt(e.target.value))
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
              onConfigChange('averageResponseTokens', parseInt(e.target.value))
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
                onConfigChange('useTools', e.target.value === 'true')
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
                onConfigChange('llmCallsPerRequest', parseInt(e.target.value))
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
