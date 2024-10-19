import { makeSonic } from "../entities/sonic.js";
import { k } from "../kaplayCtx.js";
export default function game() {
    k.setGravity(3100)
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

    const sonic = makeSonic(k.vec2(200, 745))
    sonic.setControlls()
    sonic.setEvent()

    let gameSpeed = 300
    k.loop(1, () => {
        gameSpeed += 10
    })

    k.add([
        k.rect(1920, 300),
        k.opacity(0),
        k.area(),
        k.pos(0, 832),
        k.body({ isStatic: true }),
    ])

    k.onUpdate(() => {
        if (bgPices[1].pos.x < 0) {
            bgPices[0].moveTo(bgPices[1].pos.x + bgPiceWith * 2, 0)
            bgPices.push(bgPices.shift())
        }

        bgPices[0].move(-100, 0)
        bgPices[1].moveTo(bgPices[0].pos.x + bgPiceWith * 2, 0)

         // for jump effect
         bgPices[0].moveTo(bgPices[0].pos.x, -sonic.pos.y / 10 - 50);
         bgPices[1].moveTo(bgPices[1].pos.x, -sonic.pos.y / 10 - 50);

        if (platforms[1].pos.x < 0) {
            platforms[0].moveTo(platforms[1].pos.x + platformWith * 4, 450);
            platforms.push(platforms.shift());
        }

        platforms[0].move(-gameSpeed, 0);
        platforms[1].moveTo(platforms[0].pos.x + platformWith * 4, 450);

    })
}