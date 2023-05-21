import * as PIXI from 'pixi.js'

export class RadarChartScales extends PIXI.Graphics {
  constructor(centerX: number, centerY: number, radius: number, apexesCount: number, step: number, color: number) {
    super()

    const pointsBase = getPolygonApexesPoints(apexesCount, radius)

    const scalesPointsList: [number, number][][] = []
    for (let i = 1; i <= step; i++) {
      scalesPointsList.push(pointsBase.map((point) => [point[0] * (i / step), point[1] * (i / step)]))
    }

    const bottomPointY = Math.max(...pointsBase.map((p) => p[1]))

    const fixedPoints = pointsBase.map((point) => [
      point[0] + centerX,
      point[1] + centerY + (radius - bottomPointY) / 2,
    ])

    const fixedScalesPointsList = scalesPointsList.map((scalesPoints) =>
      scalesPoints.map<[number, number]>((point) => [
        point[0] + centerX,
        point[1] + centerY + (radius - bottomPointY) / 2,
      ])
    )

    this.lineStyle(1, color)
    // 頂点に向かう直線の描画
    for (const point of fixedPoints) {
      this.moveTo(centerX, centerY + (radius - bottomPointY) / 2)
      this.lineTo(point[0], point[1])
    }

    // 目盛りの描画
    for (const scalesPoints of fixedScalesPointsList) {
      for (let i = 0; i < apexesCount; i++) {
        const point = scalesPoints[i]
        if (i === 0) {
          this.moveTo(...point)
        } else {
          this.lineTo(...point)
        }
      }
      this.lineTo(...scalesPoints[0])
    }
  }
}
