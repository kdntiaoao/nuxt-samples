import * as PIXI from 'pixi.js'

let mercury: PIXI.Graphics | null = null

if (process.client) {
  mercury = new PIXI.Graphics().beginFill(0x0033ff).drawCircle(0, 0, 8).endFill()
}

export default mercury
