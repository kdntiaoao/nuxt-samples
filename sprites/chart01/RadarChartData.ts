import * as PIXI from 'pixi.js'

export type DataItem = { label: string; value: number }

export class RadarChartData extends PIXI.Graphics {
  constructor(
    centerX: number,
    centerY: number,
    radius: number,
    data: DataItem[],
    min: number,
    max: number,
    color: number
  ) {
    super()

    const pointsBase = getPolygonApexesPoints(data.length, radius)
    const pointsData = []
    for (let i = 0; i < data.length; i++) {
      const value = Math.max(data[i].value, min / 2)
      const ratio = Math.min(value / max, 1.2)
      pointsData.push([pointsBase[i][0] * ratio, pointsBase[i][1] * ratio])
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
