import * as PIXI from 'pixi.js'

export type DataItem = { label: string; value: number }

export class RadarChartData extends PIXI.Graphics {
  constructor(centerX: number, centerY: number, radius: number, data: DataItem[], color: number) {
    super()

    const pointsBase = []
    const pointsData = []
    for (let i = 0; i < data.length; i++) {
      const radian = (2 / data.length) * Math.PI * i
      const value = radius * Math.max(data[i].value, 0.05)
      pointsBase.push([Math.sin(radian) * radius, -Math.cos(radian) * radius])
      pointsData.push([Math.sin(radian) * value, -Math.cos(radian) * value])
    }
    const bottomPointY = Math.max(...pointsBase.map((p) => p[1]))

    const fixedPoints = pointsData
      .map((point) => [point[0] + centerX, point[1] + centerY + (radius - bottomPointY) / 2])
      .flat()

    this.beginFill(color)
      .drawPolygon(...fixedPoints)
      .endFill()
  }
}
