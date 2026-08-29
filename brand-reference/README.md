# Brand reference

Source material for the AQVION LABS identity. **Nothing in this folder is
served to the browser** — it lives outside `public/` on purpose.

## aqvion-logo-animation.gif

The supplied logo animation. 768x768, 48 frames, ~55ms per frame, 2.67s per
loop, looping indefinitely.

It is reference for the intended *motion language*, not a production asset — a
1.4MB looping GIF is not something to ship. Its loop duration is recorded as
`--duration-sweep` in `styles/tokens.css` so the motion can be rebuilt in CSS /
Framer Motion over the real vector-crisp mark when the animated logo is built.
