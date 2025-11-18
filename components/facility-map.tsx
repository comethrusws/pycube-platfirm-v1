export function FacilityMap() {
  return (
    <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground mb-2">
        Digital Hospital Map
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Interactive floorplan with real-time asset tracking and alerts
      </p>
      
      <div className="bg-muted rounded-xl h-96 flex items-center justify-center border border-border/50">
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Facility Digital Twin Visualization
          </p>
          <p className="text-xs text-muted-foreground">
            Blood Bank • Lab • OR • Warehouse • Patient Rooms • Supply Chain
          </p>
        </div>
      </div>
    </div>
  )
}
