import * as PIXI from 'pixi.js'

let sun: PIXI.Graphics | null = null

if (process.client) {
  sun = new PIXI.Graphics().beginFill(0xff3300).drawCircle(0, 0, 40).endFill()
}

export default sun
