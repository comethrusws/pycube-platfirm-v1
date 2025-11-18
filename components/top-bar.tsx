import Image from 'next/image'

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 h-16">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <Image
            src="/pycube-logo.svg"
            alt="PyCube"
            width={32}
            height={32}
            className="h-9 w-auto"
          />
         {/* <span className="text-lg font-light align-text-bottom text-foreground">Platform</span> */}
        </div>
        
        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
            Facilities
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
            Alerts
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
            Insights
          </a>
          <a href="#" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-lg bg-primary/10">
            Admin
          </a>
        </nav>
      </div>
    </header>
  )
}
