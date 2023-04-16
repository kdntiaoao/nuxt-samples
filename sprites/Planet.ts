import * as PIXI from 'pixi.js'

export class Planet extends PIXI.Graphics {
  private centerX: number
  private centerY: number
  private radiusOrbit: number
  private elapsed: number

  constructor(x: number, y: number, radiusOrbit: number) {
    super()

    this.x = x + radiusOrbit
    this.y = y
    this.centerX = x
    this.centerY = y
    this.radiusOrbit = radiusOrbit
    this.elapsed = 0

    this.beginFill(0x0033ff).drawCircle(0, 0, 8).endFill()
  }

  revolve() {
    this.elapsed += 100 / this.radiusOrbit
    this.x = this.centerX + Math.cos(this.elapsed / 40) * this.radiusOrbit
    this.y = this.centerY + Math.sin(this.elapsed / 40) * this.radiusOrbit
  }
}
