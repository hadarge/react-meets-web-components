// STEP 3 — Complex React Web Component: <video-player>
import { defineVideoPlayer, type VideoPlayer } from "../webcomponents/defineVideoPlayer.tsx";
import { isStandalone } from "./mode.ts";

defineVideoPlayer();

if (isStandalone) {
    window.addEventListener('DOMContentLoaded', () => {
        for (const id of ['player1', 'player2']) {
            const player = document.getElementById(id) as VideoPlayer | null;
            if (!player) continue;

            player.onPlay = () => console.log(`▶️  ${id} play`);
            player.onPause = () => console.log(`⏸️  ${id} pause`);
        }
    });
}
