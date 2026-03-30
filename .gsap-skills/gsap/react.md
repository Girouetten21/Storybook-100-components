# GSAP React Master Skill
Manual copy of the official GreenSock React skill.

## Key Rules:
- **Always** use `useGSAP()` hook from `@gsap/react` for component setup.
- **Always** provide a `scope` (ref) to the hook to keep selectors local.
- **Always** wrap event-driven animations (hovers/clicks) in `contextSafe` to prevent leaks.
- Avoid global selectors like `gsap.to(".box")` without a scope.

## Installation:
npm install @gsap/react
gsap.registerPlugin(useGSAP);

## Best Practice Sequence:
1. Define a container ref.
2. Use the hook with that ref as scope.
3. Define tweens/timelines inside the hook using class names directly.
