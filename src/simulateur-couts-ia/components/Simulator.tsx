import React, { useState } from 'react'
import { models } from '../models'
import { SimulatorConfig } from '../types'
import { useCalculations } from '../hooks/useCalculations'
import { ConfigurationCard } from './ConfigurationCard'
import { CostSummaryCard } from './CostSummaryCard'
import { CostDetailsCard } from './CostDetailsCard'
import { StatisticsCard } from './StatisticsCard'

const AICostSimulator = () => {
  const [config, setConfig] = useState<SimulatorConfig>({
    model: 'gpt-5',
    users: 100,
    requestsPerUserPerDay: 10,
    systemPromptTokens: 500,
    injectedDataTokens: 1000,
    averageResponseTokens: 800,
    useTools: false,
    llmCallsPerRequest: 2,
  })

  const selectedModel = models[config.model]
  const calculations = useCalculations(config, selectedModel)

  const handleConfigChange = (
    field: keyof SimulatorConfig,
    value: string | number | boolean
  ) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Configuration */}
      <div className="space-y-6">
        <ConfigurationCard
          config={config}
          onConfigChange={handleConfigChange}
        />
      </div>

      {/* Résultats */}
      <div className="space-y-6">
        <CostSummaryCard calculations={calculations} />
        <CostDetailsCard
          calculations={calculations}
          selectedModel={selectedModel}
        />
        <StatisticsCard
          calculations={calculations}
          selectedModel={selectedModel}
        />
      </div>
    </div>
  )
}

export default AICostSimulator
