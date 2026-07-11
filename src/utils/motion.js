/**
 * Animating `filter: blur()` looks great but is expensive to composite on
 * every frame — on phones this is the main source of janky/stuttery scroll
 * reveals. Desktop keeps the full blur-in effect; touch devices get the same
 * opacity/transform motion without the blur, which the GPU compositor can
 * run smoothly.
 */
const isCoarsePointer =
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

export const blurIn = (amount = 8) => (isCoarsePointer ? {} : { filter: `blur(${amount}px)` })
export const blurOut = () => (isCoarsePointer ? {} : { filter: 'blur(0px)' })
