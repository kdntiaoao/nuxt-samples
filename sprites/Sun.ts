import * as PIXI from 'pixi.js'

type AddPlanet = (app: PIXI.Application) => void

export class Sun extends PIXI.Graphics {
  constructor(x: number, y: number) {
    super()

    this.x = x
    this.y = y
    this.eventMode = 'static'

    this.beginFill(0xff3300).drawCircle(0, 0, 40).endFill()
  }
}
