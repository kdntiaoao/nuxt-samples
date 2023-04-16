import * as PIXI from 'pixi.js'

export class Sun extends PIXI.Graphics {
  constructor(x: number, y: number) {
    super()

    this.x = x
    this.y = y

    this.beginFill(0xff3300).drawCircle(0, 0, 40).endFill()
  }
}
