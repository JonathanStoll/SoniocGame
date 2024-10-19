import { k } from "../kaplayCtx.js";

export function makeMotobug(pos) {
    return k.add([
        k.sprite('motobug', {anim: 'run'}),
        k.scale(4),
        k.area({shape: new k.Rect(k.vec2(-5, 1), 32,32)}),
        k.anchor('center'),
        k.pos(pos),
        k.offscreen(),
        'enemy',
    ])
}