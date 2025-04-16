import { useEffect, useRef } from "react"

interface DonutChartProps {
  data: {
    label: string
    value: number
    color: string
  }[]
  showLegend?: boolean
}

export default function DonutChart({ data, showLegend = true }: DonutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const size = 240
    canvas.width = size
    canvas.height = size

    // Calculate total value
    const total = data.reduce((sum, item) => sum + item.value, 0)

    // Draw donut chart
    let startAngle = 0
    const centerX = size / 2
    const centerY = size / 2
    const outerRadius = size / 2 - 10
    const innerRadius = size / 3

    // Add shadow effect
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 3
    ctx.shadowBlur = 10
    ctx.shadowColor = "rgba(0, 0, 0, 0.1)"

    data.forEach((item) => {
      // Calculate end angle
      const endAngle = startAngle + (item.value / total) * 2 * Math.PI

      // Draw arc
      ctx.beginPath()
      ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle)
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true)
      ctx.closePath()

      // Fill with color
      ctx.fillStyle = item.color
      ctx.fill()

      // Update start angle for next segment
      startAngle = endAngle
    })

    // Remove shadow for inner circle
    ctx.shadowColor = "rgba(0, 0, 0, 0)"

    // Draw inner circle (hole)
    ctx.beginPath()
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI)
    ctx.fillStyle = "#f8f8f8"
    ctx.fill()

    // Add total in the center
    ctx.fillStyle = "#333"
    ctx.font = "bold 24px Inter, sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(total.toString(), centerX, centerY - 10)

    ctx.font = "14px Inter, sans-serif"
    ctx.fillText("Total", centerX, centerY + 15)
  }, [data])

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} className="mx-auto" />

      {showLegend && (
        <div className="flex justify-center mt-4 gap-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm">
                {item.label}: {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
