'use client'

import { useState } from 'react'
import { Settings, X, User, Building2, Zap, GalleryVerticalIcon } from 'lucide-react'
import { PersonaSelector, PersonaInsightsPanel } from './persona-selector'
import { type Persona } from '@/lib/demo-mode'
import { getCustomerConfig } from '@/lib/customer-config'

interface DemoControlPanelProps {
    onPersonaChange?: (persona: Persona) => void
    onCustomerChange?: (customerId: string) => void
}

/**
 * Demo Control Panel (R6.5)
 * 
 * Floating control panel for sales engineers during demos
 * Features:
 * - Persona selector with real-time guidance
 * - Customer/demo data switcher
 * - Quick reference for talking points
 * - Demo flow sequence tracker
 */
export function DemoControlPanel({ onPersonaChange, onCustomerChange }: DemoControlPanelProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)
    const [selectedCustomer, setSelectedCustomer] = useState('baptist')

    const handlePersonaChange = (persona: Persona) => {
        setSelectedPersona(persona)
        onPersonaChange?.(persona)
    }

    const handleCustomerChange = (customerId: string) => {
        setSelectedCustomer(customerId)
        onCustomerChange?.(customerId)
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all group"
                title="Open Demo Controls"
            >
                <GalleryVerticalIcon className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
        )
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border-2 border-blue-200 overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Demo Controls</h3>
                        <p className="text-xs text-blue-100">Sales Engineer Panel</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                    <X className="w-5 h-5 text-white" />
                </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                {/* Customer Selector */}
                <div>
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">
                        Demo Customer
                    </label>
                    <div className="flex gap-2">
                        {['baptist', 'cleveland'].map((id) => {
                            const config = getCustomerConfig(id)
                            const isSelected = selectedCustomer === id
                            return (
                                <button
                                    key={id}
                                    onClick={() => handleCustomerChange(id)}
                                    className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                                        isSelected
                                            ? 'border-blue-600 bg-blue-50'
                                            : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                >
                                    <Building2 className={`w-5 h-5 mb-2 ${
                                        isSelected ? 'text-blue-600' : 'text-gray-400'
                                    }`} />
                                    <div className={`text-xs font-semibold ${
                                        isSelected ? 'text-blue-900' : 'text-gray-700'
                                    }`}>
                                        {config.name}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {config.transfusion.hospitalCount} hospitals
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Persona Selector */}
                <div>
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 block">
                        Stakeholder Persona
                    </label>
                    <PersonaSelector
                        selectedPersona={selectedPersona}
                        onPersonaChange={handlePersonaChange}
                    />
                </div>

                {/* Persona Insights */}
                {selectedPersona && (
                    <PersonaInsightsPanel persona={selectedPersona} />
                )}

                {/* Quick Stats */}
                {!selectedPersona && (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-xs font-semibold text-gray-700">Quick Tip</span>
                        </div>
                        <p className="text-xs text-gray-600">
                            Select a stakeholder persona to see tailored pain points, success metrics, and talking points for your demo.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
