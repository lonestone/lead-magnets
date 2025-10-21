import React from 'react'
import { ExternalLink } from 'lucide-react'
import { Calculations } from '../types'
import { Model, providers } from '../models'
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card'

interface CostDetailsCardProps {
  calculations: Calculations
  selectedModel: Model
}

export const CostDetailsCard: React.FC<CostDetailsCardProps> = ({
  calculations,
  selectedModel,
}) => {
  return (
    <Card className="bg-gray-50">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Détail des coûts</CardTitle>
          <a
            href={providers[selectedModel.provider].pricingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-800 hover:text-blue-600 text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Tarifs de {providers[selectedModel.provider].name}
          </a>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
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
      </CardContent>
    </Card>
  )
}
