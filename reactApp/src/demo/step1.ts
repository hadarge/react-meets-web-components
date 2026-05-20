// STEP 1 — Vanilla Web Component: <my-element>
import { defineComponent1 } from "../webcomponents/component1.ts";

// 1.1 — Register the element. (Icon starts 🔴 — no click handler yet.)
defineComponent1();

// 1.2 — On the standalone page, attach the click handler.
//       The icon inside <my-element> flips 🔴 → 🟢.
//       Uncomment the block below on stage:
//
// import type { MyElement } from "../webcomponents/component1.ts";
// import { isStandalone } from "./mode.ts";
//
// if (isStandalone) {
//     window.addEventListener('DOMContentLoaded', () => {
//         const el = document.getElementById('myElement') as MyElement | null;
//         if (!el) return;
//
//         el.customOnClick = (times) => {
//             console.log(`🖱️  click #${times} — from vanilla web component`);
//         };
//     });
// }
