import React from 'react'
import { Info } from 'lucide-react'
import { Calculations, ModelData } from '../types'
import { providers } from '../models'

interface StatisticsCardProps {
  calculations: Calculations
  selectedModel: ModelData
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  calculations,
  selectedModel,
}) => {
  return (
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
          <span className="font-medium">
            {providers[selectedModel.provider].name}
          </span>
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
          <span className="font-medium">${selectedModel.inputPrice}/MTok</span>
        </div>

        <div className="flex justify-between">
          <span>Prix sortie:</span>
          <span className="font-medium">${selectedModel.outputPrice}/MTok</span>
        </div>
      </div>
    </div>
  )
}
