import Image from 'next/image'
import { ChevronDown, Building2, LayoutDashboard } from 'lucide-react'
import { customerConfigs, DEFAULT_CUSTOMER } from '@/lib/customer-config'

interface TopBarProps {
  viewMode: 'executive' | 'operational'
  onViewModeChange: (mode: 'executive' | 'operational') => void
  selectedCustomer: string
  onCustomerChange: (customerId: string) => void
}

export function TopBar({
  viewMode,
  onViewModeChange,
  selectedCustomer,
  onCustomerChange
}: TopBarProps) {
  const currentCustomer = customerConfigs[selectedCustomer] || customerConfigs[DEFAULT_CUSTOMER]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4 h-16">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <Image
            src="/pycube-logo.svg"
            alt="PyCube"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          <div className="h-6 w-px bg-gray-200 mx-2" />
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Building2 className="w-4 h-4 text-gray-400" />
            {currentCustomer.displayName}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          {/* Customer Switcher (Demo Only) */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200">
              <LayoutDashboard className="w-4 h-4" />
              <span>Switch Demo</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hidden group-hover:block animate-in fade-in zoom-in-95 duration-200">
              {Object.values(customerConfigs).map((config) => (
                <button
                  key={config.id}
                  onClick={() => onCustomerChange(config.id)}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${selectedCustomer === config.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                    }`}
                >
                  {config.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
