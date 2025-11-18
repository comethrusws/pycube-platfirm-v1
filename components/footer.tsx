export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="px-6 py-8">
        <nav className="flex items-center justify-center gap-8">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Support
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            API Docs
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Security
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Compliance
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Legal
          </a>
        </nav>
        <p className="text-xs text-muted-foreground text-center mt-8">
          © 2025 PyCube Platform. Hospital Operations Intelligence.
        </p>
      </div>
    </footer>
  )
}
