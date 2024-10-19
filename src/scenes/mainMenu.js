import { k } from "../kaplayCtx.js";
import { makeSonic } from "../entities/sonic.js";

export default function mainMenu() {
  if (!k.getData('best-score')) k.setData('best-score', 0);
  k.onButtonPress('jump', () =>   k.go('game'))
  const bgPiceWith = 1920
  const bgPices = [
    k.add([k.sprite('chemical-bg'), k.pos(0, 0), k.scale(2), k.opacity(0.8), k.area()]),
    k.add([k.sprite('chemical-bg'), k.pos(bgPiceWith * 2, 0), k.scale(2), k.opacity(0.8), k.area()]),
  ]
  const platformWith = 1280
  const platforms = [
    k.add([k.sprite('platforms'), k.pos(0, 450), k.scale(4), k.opacity(1)]),
    k.add([k.sprite('platforms'), k.pos(platformWith * 4, 450), k.scale(4), k.opacity(1)]),
  ]

  k.add([
    k.text('Running Sonic Game', {font: 'mania',size: 100, color: 'white'}), 
    k.pos(k.center().x, 200),
    k.anchor('center'),
  ])
  k.add([
    k.text('Press Space/Click/Touch to Play', {font: 'mania',size: 50, color: 'white'}), 
    k.pos(k.center().x, k.center().y -200),
    k.anchor('center'),
  ])

  makeSonic(k.vec2(200, 750))
  k.onUpdate(() => {
    if (bgPices[1].pos.x < 0) {
      bgPices[0].moveTo(bgPices[1].pos.x + bgPiceWith * 2, 0)
      bgPices.push(bgPices.shift())
    }

    bgPices[0].move(-100, 0)
    bgPices[1].moveTo(bgPices[0].pos.x + bgPiceWith * 2, 0)

    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 4, 450);
      platforms.push(platforms.shift());
    }

    platforms[0].move(-4000, 0);
    platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450);

  })

}