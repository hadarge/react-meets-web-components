<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {ref} from "vue";

const link1 = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
const link2 = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'

const currentLink = ref(link1);

const changeSrc = () => {
  currentLink.value = currentLink.value === link1 ? link2 : link1;
}

const likeChanged = (value: boolean, counter: number) => {
  console.log(
      `%c💚 likeChanged%c @vue component %c${value}%c, counter: %c${counter}`,
      'color: green; font-weight: bold;',
      'color: gray;',
      'color: orange; font-weight: bold;',
      'color: gray;',
      'color: blue; font-weight: bold;'
  );
}


const onPlay = () => {
  console.log(
      `%c▶️️ onPlay%c @vue component`,
      'color: green; font-weight: bold;',
      'color: gray;'
  );
}

const onPause = () => {
  console.log(
      `%c⏸️️ onPause%c @vue component`,
      'color: green; font-weight: bold;',
      'color: gray;'
  );
}


</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo"/>
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo"/>
    </a>
  </div>
  <HelloWorld msg="Vite + Vue"/>

  <video-player width="550" height="400"
                :onPlay.prop="onPlay"
                :onPause.prop="onPause"
                :src="currentLink"></video-player>

  <like-button likeCount="88" :onLikeChange.prop="likeChanged"></like-button>

  <button :onclick="changeSrc">switch</button>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
