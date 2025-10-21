import React from 'react'
import { DollarSign } from 'lucide-react'
import { Calculations } from '../types'

interface CostSummaryCardProps {
  calculations: Calculations
}

export const CostSummaryCard: React.FC<CostSummaryCardProps> = ({
  calculations,
}) => {
  return (
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
  )
}
