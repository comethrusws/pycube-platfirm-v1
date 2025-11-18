export function FacilityMap() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-foreground mb-3 tracking-tight">
        Digital Hospital Map
      </h2>
      <p className="text-base text-muted-foreground mb-8">
        Interactive floorplan with real-time asset tracking and alerts
      </p>
      
      <div className="bg-secondary/30 rounded-2xl h-96 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-muted-foreground mb-3">
            Facility Digital Twin Visualization
          </p>
          <p className="text-sm text-muted-foreground">
            Blood Bank • Lab • OR • Warehouse • Patient Rooms • Supply Chain
          </p>
        </div>
      </div>
    </div>
  )
}
