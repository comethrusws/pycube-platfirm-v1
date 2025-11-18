export function AISummaryBanner() {
  return (
    <div className="bg-primary/5 border-b border-border px-6 py-5">
      <div className="max-w-full">
        <div className="flex items-start gap-4">
          <div className="flex h-8 w-8 rounded-full bg-primary/20 items-center justify-center flex-shrink-0 mt-0.5">
            <div className="h-3 w-3 rounded-full bg-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground leading-relaxed text-pretty">
              <span className="font-semibold">Hospital operating normally.</span> $4.8M annualized savings identified. 
              <span className="font-semibold"> 23 high-risk items</span> require attention across OR, Lab & Supply Chain.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
