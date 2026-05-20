// STEP 2 — React-wrapped Web Component: <like-button>
import { defineLikeButton, type LikeButton } from "../webcomponents/defineLikeButton.tsx";
import { isStandalone } from "./mode.ts";

defineLikeButton();

if (isStandalone) {
    window.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('likeButton') as LikeButton | null;
        if (!btn) return;

        btn.onLikeChange = (liked, newCount) => {
            console.log(`❤️  liked=${liked} count=${newCount}`);
        };
    });
}
