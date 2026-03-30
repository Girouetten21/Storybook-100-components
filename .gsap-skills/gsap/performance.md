# GSAP Performance Master Skill
Official GreenSock performance strategy.

## Global Rules:
- **Always** prefer `x`, `y`, `scale`, `rotation`, `opacity`.
- **Never** animate `top`, `left`, `width`, `height`, `margin`, `padding` for motion (these cause layout thrashing).
- Use `autoAlpha: 1` over `opacity: 1` to improve paint cost (hides non-visible elements).
- Use `will-change: transform` only on elements that animate frequently.
- Use `gsap.quickTo()` for mouse-following or frequently updated Tweens.

## Scroll Performance:
- Set `scrub: 1` (or number) to buffer scroll jitter.
- Avoid intense filters like `blur()` during scroll on many items at once.
- Call `ScrollTrigger.refresh()` AFTER DOM/Layout changes.
- Pin only essential containers to avoid layout cost.
