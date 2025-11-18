import Image from 'next/image'

export function TopBar() {
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
          <span className="text-xl font-semibold text-foreground tracking-tight">PyCube</span>
        </div>
        
        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            Facilities
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            Alerts
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            Insights
          </a>
          <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors px-4 py-2 rounded-lg bg-primary/5 hover:bg-primary/10">
            Admin
          </a>
        </nav>
      </div>
    </header>
  )
}
