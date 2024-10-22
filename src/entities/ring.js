import { k } from "../kaplayCtx.js";

export function makering(pos) {
    return k.add([
        k.sprite('ring', {anim: 'spin'}),
        k.scale(4),
        k.area(),
        k.anchor('center'),
        k.pos(pos),
        k.offscreen(),
        'ring',
    ])
}