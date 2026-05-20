<script setup lang="ts">
/**
 * Web Components Workshop - Vue Integration
 *
 * This Vue app demonstrates how to consume React-wrapped Web Components
 * built in another framework. This showcases the framework-agnostic nature
 * of Web Components.
 *
 * Key Learning Points:
 * 1. How to import and use web components in Vue
 * 2. Vue-specific syntax for passing props (.prop modifier)
 * 3. Attribute vs Property binding in Vue
 * 4. Reactive state with web components
 * 5. Event handling from web components
 */

import HelloWorld from './components/HelloWorld.vue'
import {ref, onMounted} from "vue";

// ============================================================================
// WORKSHOP SECTION 1: Basic Setup & State
// ============================================================================
// Vue uses ref() for reactive state. When we update these values,
// the web components will automatically re-render with new attributes.

const link1 = 'https://www.w3schools.com/html/mov_bbb.mp4'
const link2 = 'https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4'

// Reactive video source - changes will propagate to <video-player>
const currentLink = ref(link1);

// Reactive like count - demonstrates two-way communication
const likeCount = ref(88);

// Track which player is currently playing (for single-play behavior)
const activePlayer = ref<'player1' | 'player2' | null>(null);

// ============================================================================
// WORKSHOP SECTION 2: Attribute Updates
// ============================================================================
// This demonstrates how Vue's reactive system works with web components

const changeSrc = () => {
  currentLink.value = currentLink.value === link1 ? link2 : link1;
  console.log(
      `%c🔄 VIDEO SWITCH%c Changed video source to: %c${currentLink.value === link1 ? 'Big Buck Bunny' : 'Sintel'}`,
      'color: #42b883; font-weight: bold;',
      'color: gray;',
      'color: orange; font-weight: bold;'
  );
}

// Example: Programmatically update like count
const incrementLikes = () => {
  likeCount.value += 10;
  console.log(
      `%c📈 LIKES INCREMENTED (from Vue)%c New count: %c${likeCount.value}`,
      'color: #42b883; font-weight: bold;',
      'color: gray;',
      'color: blue; font-weight: bold;'
  );

  // Debug: Check the actual DOM attribute value
  const likeBtn = document.querySelector('like-button');
  if (likeBtn) {
    console.log(
        `%c🔍 DEBUG%c DOM attribute value: %c${likeBtn.getAttribute('likeCount')}`,
        'color: purple; font-weight: bold;',
        'color: gray;',
        'color: orange; font-weight: bold;'
    );
  }
}

// ============================================================================
// WORKSHOP SECTION 3: Event Handlers (Child → Parent Communication)
// ============================================================================
// These callbacks are passed to web components via the .prop modifier
// This is Vue's way of setting JavaScript properties (not HTML attributes)

// Like Button Events
const likeChanged = (value: boolean, counter: number) => {
  console.log(
      `%c💚 LIKE EVENT (from <like-button>)%c Liked: %c${value}%c | Count: %c${counter}`,
      'color: #42b883; font-weight: bold;',
      'color: gray;',
      value ? 'color: green; font-weight: bold;' : 'color: orange; font-weight: bold;',
      'color: gray;',
      'color: blue; font-weight: bold;'
  );

  // Example: Sync with Vue state (optional)
  likeCount.value = counter;

  // Example: Make API call
  // fetch('/api/likes', { method: 'POST', body: JSON.stringify({ value, counter }) })
}

// Video Player 1 Events
const onPlay1 = () => {
  activePlayer.value = 'player1';
  console.log(
      `%c▶️ PLAY EVENT (Player 1)%c Video started playing`,
      'color: #42b883; font-weight: bold;',
      'color: gray;'
  );

  // Example: Pause other players for single-play behavior
  // Note: You'd need to expose a pause() method on the web component
}

const onPause1 = () => {
  if (activePlayer.value === 'player1') {
    activePlayer.value = null;
  }
  console.log(
      `%c⏸️ PAUSE EVENT (Player 1)%c Video paused`,
      'color: orange; font-weight: bold;',
      'color: gray;'
  );
}

// Video Player 2 Events (demonstrates multiple instances)
const onPlay2 = () => {
  activePlayer.value = 'player2';
  console.log(
      `%c▶️ PLAY EVENT (Player 2)%c Video started playing`,
      'color: #42b883; font-weight: bold;',
      'color: gray;'
  );
}

const onPause2 = () => {
  if (activePlayer.value === 'player2') {
    activePlayer.value = null;
  }
  console.log(
      `%c⏸️ PAUSE EVENT (Player 2)%c Video paused`,
      'color: orange; font-weight: bold;',
      'color: gray;'
  );
}

// ============================================================================
// WORKSHOP SECTION 4: Lifecycle & Direct DOM Access
// ============================================================================
// Sometimes you need to access web component methods directly via refs
// This demonstrates imperative control vs declarative props

onMounted(() => {
  console.log(
      `%c🎓 Vue Workshop App Mounted!%c Web Components loaded from React build`,
      'background: #42b883; color: white; font-weight: bold; padding: 8px; border-radius: 4px;',
      'color: gray; margin-left: 8px;'
  );

  // Example: Access web component directly via DOM
  // const myElement = document.querySelector('my-element');
  // if (myElement) {
  //   myElement.customOnClick = (times) => console.log('Direct DOM access', times);
  // }
})

</script>

<template>
  <div>
    <!-- Vue Branding -->
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo"/>
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo"/>
    </a>
  </div>

  <HelloWorld msg="Vite + Vue + React Web Components"/>

  <!-- ====================================================================== -->
  <!-- EXAMPLE 1: Vanilla Web Component in Vue                               -->
  <!-- ====================================================================== -->
  <!-- Note: String attributes work directly, no special syntax needed        -->

  <div class="workshop-section">
    <h2>📦 Example 1: Vanilla Web Component</h2>
    <p class="description">
      This component (<code>&lt;my-element&gt;</code>) is built with vanilla JavaScript,
      no React. Notice how the <code>name</code> attribute is passed as a simple string.
    </p>

    <my-element name="Vue Workshop Attendee"></my-element>

    <details class="code-notes">
      <summary>💡 Vue Integration Notes</summary>
      <ul>
        <li>String attributes can be passed directly: <code>name="value"</code></li>
        <li>For reactive data: <code>:name="reactiveValue"</code></li>
        <li>Function properties must be set via refs or direct DOM access</li>
      </ul>
    </details>
  </div>

  <!-- ====================================================================== -->
  <!-- EXAMPLE 2: React-Wrapped Web Component (Simple)                       -->
  <!-- ====================================================================== -->
  <!-- ⚠️ IMPORTANT: Use .prop modifier for function callbacks in Vue!       -->

  <div class="workshop-section">
    <h2>❤️ Example 2: React Component as Web Component</h2>
    <p class="description">
      The <code>&lt;like-button&gt;</code> is a React component wrapped as a web component.
      Notice the <code>:onLikeChange.prop</code> syntax - the <strong>.prop</strong> modifier
      tells Vue to set it as a JavaScript property, not an HTML attribute.
    </p>

    <like-button
        :likeCount.prop="likeCount"
        :onLikeChange.prop="likeChanged">
    </like-button>

    <div class="controls">
      <button @click="incrementLikes" class="vue-button">
        📈 Add 10 Likes (from Vue)
      </button>
      <p class="status">Current count: <strong>{{ likeCount }}</strong></p>
    </div>

    <details class="code-notes">
      <summary>💡 Vue Integration Notes</summary>
      <ul>
        <li><code>:likeCount="likeCount"</code> - Reactive binding (number converted to string)</li>
        <li><code>:onLikeChange.prop="likeChanged"</code> - Function passed as property (requires .prop!)</li>
        <li>Without <code>.prop</code>, Vue would try to set it as an HTML attribute (won't work for functions)</li>
        <li>The web component converts the string "likeCount" back to a number internally</li>
      </ul>
    </details>
  </div>

  <!-- ====================================================================== -->
  <!-- EXAMPLE 3: Complex React Component (Multiple Instances)               -->
  <!-- ====================================================================== -->

  <div class="workshop-section">
    <h2>🎬 Example 3: Complex Component - Video Player</h2>
    <p class="description">
      Two instances of the same <code>&lt;video-player&gt;</code> component,
      demonstrating reusability and independent state management.
    </p>

    <div class="video-container">
      <div class="player-wrapper">
        <h3>Player 1 {{ activePlayer === 'player1' ? '▶️' : '' }}</h3>
        <video-player
            width="550"
            height="300"
            :onPlay.prop="onPlay1"
            :onPause.prop="onPause1"
            :src="currentLink">
        </video-player>
      </div>

      <div class="player-wrapper">
        <h3>Player 2 {{ activePlayer === 'player2' ? '▶️' : '' }}</h3>
        <video-player
            width="550"
            height="300"
            :onPlay.prop="onPlay2"
            :onPause.prop="onPause2"
            src="https://www.w3schools.com/html/movie.mp4">
        </video-player>
      </div>
    </div>

    <div class="controls">
      <button @click="changeSrc" class="vue-button">
        🔄 Switch Player 1 Video
      </button>
      <p class="status">
        Current: <strong>{{ currentLink === link1 ? 'Big Buck Bunny' : 'Sintel' }}</strong>
      </p>
    </div>

    <details class="code-notes">
      <summary>💡 Vue Integration Notes</summary>
      <ul>
        <li>Multiple instances work independently (separate Shadow DOM)</li>
        <li>Numeric attributes (width, height) are passed as strings and converted internally</li>
        <li>The <code>:src</code> binding is reactive - changes update the video source</li>
        <li>Each instance has its own event handlers for fine-grained control</li>
      </ul>
    </details>
  </div>

  <!-- ====================================================================== -->
  <!-- WORKSHOP EXERCISES                                                     -->
  <!-- ====================================================================== -->

  <div class="workshop-section exercises">
    <h2>🎯 Workshop Exercises</h2>

    <details>
      <summary><strong>Exercise 1:</strong> Add a Reset Button</summary>
      <p>Create a button that resets the like count back to 88.</p>
      <pre><code>const resetLikes = () => { likeCount.value = 88; }</code></pre>
    </details>

    <details>
      <summary><strong>Exercise 2:</strong> Implement Single-Play Behavior</summary>
      <p>When one video plays, automatically pause the other. You'll need to:</p>
      <ul>
        <li>Expose a <code>pause()</code> method on the VideoPlayer web component</li>
        <li>Use template refs to access the components</li>
        <li>Call <code>playerRef.value.pause()</code> in the play handler</li>
      </ul>
    </details>

    <details>
      <summary><strong>Exercise 3:</strong> Add a New Web Component</summary>
      <p>Create a simple counter web component and use it here:</p>
      <ol>
        <li>Build it in the React app following the existing patterns</li>
        <li>Register it in <code>wcMain.ts</code></li>
        <li>Rebuild the React app: <code>npm run build</code></li>
        <li>Use it here with Vue's reactive state</li>
      </ol>
    </details>

    <details>
      <summary><strong>Exercise 4:</strong> Handle Edge Cases</summary>
      <p>What happens if you:</p>
      <ul>
        <li>Pass an invalid video URL to <code>&lt;video-player&gt;</code>?</li>
        <li>Set <code>likeCount</code> to a negative number?</li>
      </ul>
      <p>Test these scenarios and add appropriate error handling!</p>
    </details>

    <details>
      <summary><strong>Exercise 5:</strong> Load Web Components via Script Tag (Runtime Loading)</summary>
      <p>Instead of importing the web components bundle in <code>main.ts</code>, load them dynamically at runtime via a script tag in the HTML.</p>

      <p><strong>Steps:</strong></p>
      <ol>
        <li>Remove the import from <code>vueApp/src/main.ts</code>:
          <pre><code>// Remove this line:
import '../../reactApp/dist/assets/wcMain.js'</code></pre>
        </li>
        <li>Add a script tag to <code>vueApp/index.html</code>:
          <pre><code>&lt;script type="module" src="http://127.0.0.1:8080/assets/wcMain.js"&gt;&lt;/script&gt;</code></pre>
        </li>
        <li>Restart the Vue dev server and test that the components still work</li>
      </ol>

      <p><strong>Benefits of runtime loading:</strong></p>
      <ul>
        <li>Web components can be hosted on a CDN</li>
        <li>No need to rebuild Vue app when web components change</li>
        <li>Components can be versioned independently</li>
        <li>Lazy loading - only load components when needed</li>
      </ul>

      <p><strong>Advanced:</strong> Create a dynamic loader function:</p>
      <pre><code>// In a utility file
export async function loadWebComponents(version = 'latest') {
  const script = document.createElement('script');
  script.type = 'module';
  script.src = `https://cdn.example.com/web-components@${version}/wcMain.js`;
  document.head.appendChild(script);

  return new Promise((resolve) => {
    script.onload = () => resolve();
  });
}

// In App.vue
onMounted(async () => {
  await loadWebComponents('1.0.0');
  console.log('Web components loaded!');
});</code></pre>
    </details>
  </div>

</template>

<style scoped>
/* ============================================================================ */
/* Branding & Logos                                                             */
/* ============================================================================ */

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

/* ============================================================================ */
/* Workshop Sections                                                            */
/* ============================================================================ */

.workshop-section {
  margin: 3rem 0;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #f0f2f5 100%);
  border-radius: 12px;
  border: 2px solid #42b883;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.workshop-section h2 {
  color: #42b883;
  margin-top: 0;
  border-bottom: 2px solid #42b883;
  padding-bottom: 0.5rem;
}

.description {
  color: #555;
  line-height: 1.6;
  margin: 1rem 0;
  font-size: 1rem;
}

.description code {
  background: #35495e;
  color: #42b883;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

/* ============================================================================ */
/* Code Notes & Details                                                         */
/* ============================================================================ */

.code-notes {
  margin-top: 1.5rem;
  padding: 1rem;
  background: white;
  border-left: 4px solid #42b883;
  border-radius: 4px;
}

.code-notes summary {
  cursor: pointer;
  font-weight: bold;
  color: #42b883;
  user-select: none;
  padding: 0.5rem;
}

.code-notes summary:hover {
  background: #f0f2f5;
  border-radius: 4px;
}

.code-notes ul {
  margin-top: 1rem;
  line-height: 1.8;
}

.code-notes li {
  margin: 0.5rem 0;
}

.code-notes code {
  background: #f0f2f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  color: #e83e8c;
}

/* ============================================================================ */
/* Controls & Buttons                                                           */
/* ============================================================================ */

.controls {
  margin-top: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.vue-button {
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.vue-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.4);
}

.vue-button:active {
  transform: translateY(0);
}

.status {
  color: #555;
  font-size: 1rem;
  margin: 0;
}

.status strong {
  color: #42b883;
  font-size: 1.2em;
}

/* ============================================================================ */
/* Video Players Layout                                                         */
/* ============================================================================ */

.video-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.player-wrapper {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.player-wrapper h3 {
  margin-top: 0;
  color: #35495e;
  font-size: 1.2rem;
}

/* ============================================================================ */
/* Exercises Section                                                            */
/* ============================================================================ */

.exercises {
  background: linear-gradient(135deg, #fff5e6 0%, #ffe8cc 100%);
  border-color: #ff9800;
}

.exercises h2 {
  color: #ff9800;
  border-bottom-color: #ff9800;
}

.exercises details {
  margin: 1.5rem 0;
  padding: 1rem;
  background: white;
  border-left: 4px solid #ff9800;
  border-radius: 4px;
}

.exercises summary {
  cursor: pointer;
  font-weight: bold;
  color: #ff9800;
  user-select: none;
  padding: 0.5rem;
}

.exercises summary:hover {
  background: #fff5e6;
  border-radius: 4px;
}

.exercises p, .exercises ul, .exercises ol {
  margin-top: 1rem;
  line-height: 1.6;
  color: #555;
}

.exercises pre {
  background: #f5f7fa;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin: 1rem 0;
}

.exercises code {
  font-family: 'Courier New', monospace;
  color: #e83e8c;
}

/* ============================================================================ */
/* Responsive Design                                                            */
/* ============================================================================ */

@media (max-width: 768px) {
  .workshop-section {
    padding: 1rem;
    margin: 2rem 0;
  }

  .video-container {
    grid-template-columns: 1fr;
  }

  .controls {
    flex-direction: column;
    align-items: stretch;
  }

  .vue-button {
    width: 100%;
  }
}
</style>
