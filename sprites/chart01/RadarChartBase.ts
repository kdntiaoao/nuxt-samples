import * as PIXI from 'pixi.js'

export class RadarChartBase extends PIXI.Graphics {
  constructor(centerX: number, centerY: number, radius: number, apexesCount: number, color: number) {
    super()

    const points = []
    for (let i = 0; i < apexesCount; i++) {
      const radian = (2 / apexesCount) * Math.PI * i
      points.push([Math.sin(radian) * radius, -Math.cos(radian) * radius])
    }
    const bottomPointY = Math.max(...points.map((p) => p[1]))

    const fixedPoints = points
      .map((point) => [point[0] + centerX, point[1] + centerY + (radius - bottomPointY) / 2])
      .flat()

    this.beginFill(color)
      .drawPolygon(...fixedPoints)
      .endFill()
  }
}
