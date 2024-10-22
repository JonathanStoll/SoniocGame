import { k } from "../kaplayCtx.js";

export function makeSonic(poc) {
    const sonic = k.add([
        k.sprite('sonic', {anim: 'run'}),	
        k.scale(4),
        k.area(),
        k.anchor('center'),
        k.pos(poc),
        k.body({jumpForce: 1700}),
        {
            ringCollector: null,
            setControlls (){
                k.onButtonPress('jump', () => {
                    if(this.isGrounded()){
                        this.play('jump')
                        this.jump()
                        k.play('jump', {volume: 0.5})
                    }
                })
            },
            setEvent (){
                    this.onGround(()=>{
                        this.play('run')
                    })
            }
        }
    ])
    sonic.ringCollector =  sonic.add([
        k.text('', {font: 'mania', size: 15}),
        k.color(225,255,0),
        k.anchor('center'),
        k.pos(30, -10),
    ])
    return sonic
}