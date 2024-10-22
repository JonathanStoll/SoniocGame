import { makeMotobug } from "../entities/motobug.js";
import { makering } from "../entities/ring.js";
import { makeSonic } from "../entities/sonic.js";
import { k } from "../kaplayCtx.js";
export default function game() {
    k.setGravity(3100)
    const citySfx = k.play('city', {volume: 0.2})
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
let score = 0
let scoreMultiplier = 0


const  controllText = k.add([
    k.text('Score: 0',{font: 'mania',size: 50, color: 'white'}), 
    k.pos(20,20),
])
    const sonic = makeSonic(k.vec2(200, 745))
    sonic.setControlls()
    sonic.setEvent()
    sonic.onCollide('enemy', (enemy)=>{
        if(!sonic.isGrounded()){
            k.play('destroy',{volume: 0.5})
            k.play('hyper-ring',{volume: 0.5})
            k.destroy(enemy)
            sonic.jump()
            k.play('jump', {volume: 0.5})
            scoreMultiplier += 1
            score += scoreMultiplier * 10
             controllText.text = `Score: ${score}`
           if(scoreMultiplier === 1) sonic.ringCollector.text = '+10'
           if(scoreMultiplier > 1) sonic.ringCollector.text = `x${scoreMultiplier}`
            return
        }
        k.play('hurt',{volume: 0.5})
        k.setData('current-score', score)
        k.go('gameover', citySfx)
    })

    sonic.onCollide('ring', (ring)=>{
        k.play('ring',{volume: 0.5})
        k.destroy(ring)
        score++
        controllText.text = `Score: ${score}`
        sonic.ringCollector.text = '+1'
        k.wait(1,()=>{
            sonic.ringCollector.text = ''
        })
        
    })




    let gameSpeed = 300
    const spawnMotoBug = () => {
        const motobug = makeMotobug(k.vec2(1950, 773))
        motobug.onUpdate(() => {
            if (gameSpeed < 3000) {
                motobug.move(-(gameSpeed + 300), 0)
                return
            }
            motobug.move(-gameSpeed, 0)
        })
        motobug.onExitScreen(() => {
            if (motobug.pos.x < 0) {
                k.destroy(motobug)
            }
        })
        const waitTime = k.rand(0.5, 2.5)
        k.wait(waitTime, spawnMotoBug)
    }
    spawnMotoBug()


    const spawnRings = () => {
        const ring = makering(k.vec2(1950, 745))
        ring.onUpdate(() => {
            if (gameSpeed < 3000) {
                ring.move(-(gameSpeed + 300), 0)
                return
            }
            ring.move(-gameSpeed, 0)
        })
        ring.onExitScreen(() => {
            if (ring.pos.x < 0) {
                k.destroy(ring)
            }
        })
        const waitTime = k.rand(0.5, 3)
        k.wait(waitTime, spawnRings)
    }
    spawnRings()

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
        if(sonic.isGrounded()) scoreMultiplier = 0

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