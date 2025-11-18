export function Footer() {
  return (
    <footer className="border-t border-border bg-white mt-20">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <nav className="flex items-center justify-center gap-12">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            Support
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            API Docs
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            Security
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            Compliance
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            Legal
          </a>
        </nav>
        <p className="text-sm text-muted-foreground text-center mt-10">
          © 2025 PyCube Platform. Hospital Operations Intelligence.
        </p>
      </div>
    </footer>
  )
}
