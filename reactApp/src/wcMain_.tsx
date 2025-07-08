import {defineComponent1} from "./webcomponents/component1.ts";
import {defineComponent2} from "./webcomponents/component2.ts";
import {defineComponent3, type Component3} from "./webcomponents/component3.ts";
import {defineLikeButton, type LikeButton} from "./webcomponents/defineLikeButton.tsx";
import {defineVideoPlayer, type VideoPlayer} from "./webcomponents/defineVideoPlayer.tsx";

defineComponent1();
defineComponent2();

defineComponent3();
const component3 = document.getElementById('myElement')! as Component3;
component3.customOnClick = () => {
    console.log("component3 clicked");
};

defineLikeButton();
const likeButton = document.getElementById('likeButton')! as LikeButton;
likeButton.onLikeChange = (liked, newCount) => {
    console.log(`${liked}, ${newCount}`);
};


defineVideoPlayer();


const player1 = document.getElementById('player1')! as VideoPlayer;
player1.onPlay = () => {
    console.log(`player1.onPlay`);
};
player1.onPause = () => {
    console.log(`player1.onPause`);
};

const player2 = document.getElementById('player2')! as VideoPlayer;
player2.onPlay = () => {
    console.log(`player2.onPlay`);
};
player2.onPause = () => {
    console.log(`player2.onPause`);
};


