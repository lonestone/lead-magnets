import React from 'react'
import { Users, MessageSquare, Zap } from 'lucide-react'
import { SimulatorConfig } from '../types'
import { models, providers } from '../models'
import { Card } from '@/ui/card'
import { Input } from '@/ui/input'
import { Combobox } from '@/ui/combobox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select'

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
  const modelOptions = Object.entries(models).map(([key, model]) => ({
    value: key,
    label: model.name,
    group: providers[model.provider].name,
  }))

  return (
    <Card variant="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Modèle (LLM)
          </label>
          <Combobox
            value={config.model}
            onValueChange={(value) => onConfigChange('model', value)}
            options={modelOptions}
            placeholder="Sélectionner un modèle..."
            searchPlaceholder="Rechercher un modèle..."
            emptyText="Aucun modèle trouvé."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 inline mr-1" />
              Nombre d'utilisateurs
            </label>
            <Input
              type="number"
              value={config.users}
              step={100}
              onChange={(e) =>
                onConfigChange('users', parseInt(e.target.value))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-1" />
              Requêtes/jour/utilisateur
            </label>
            <Input
              type="number"
              value={config.requestsPerUserPerDay}
              step={10}
              onChange={(e) =>
                onConfigChange(
                  'requestsPerUserPerDay',
                  parseInt(e.target.value)
                )
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Système prompt (tokens)
            </label>
            <Input
              type="number"
              value={config.systemPromptTokens}
              step={100}
              onChange={(e) =>
                onConfigChange('systemPromptTokens', parseInt(e.target.value))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Données injectées (tokens)
            </label>
            <Input
              type="number"
              value={config.injectedDataTokens}
              step={100}
              onChange={(e) =>
                onConfigChange('injectedDataTokens', parseInt(e.target.value))
              }
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Taille moyenne réponse (tokens)
          </label>
          <Input
            type="number"
            value={config.averageResponseTokens}
            step={100}
            onChange={(e) =>
              onConfigChange('averageResponseTokens', parseInt(e.target.value))
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Zap className="w-4 h-4 inline mr-1" />
              Utiliser les Tools
            </label>
            <Select
              value={config.useTools ? 'true' : 'false'}
              onValueChange={(value) =>
                onConfigChange('useTools', value === 'true')
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">Non</SelectItem>
                <SelectItem value="true">Oui</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appels LLM/requête
            </label>
            <Input
              type="number"
              min="1"
              value={config.llmCallsPerRequest}
              step={1}
              onChange={(e) =>
                onConfigChange('llmCallsPerRequest', parseInt(e.target.value))
              }
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
