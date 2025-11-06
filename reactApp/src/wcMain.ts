/**
 * Web Components Workshop - Step by Step Examples
 *
 * This file demonstrates how to register and interact with Web Components
 * in a progressive, workshop-style format. Each section builds upon the previous.
 *
 * Workshop Structure:
 * 1. Vanilla Web Component (component1) - Basic concepts
 * 2. React-wrapped Web Component (LikeButton) - Simple React integration
 * 3. Complex React Component (VideoPlayer) - Advanced patterns
 */

// ============================================================================
// WORKSHOP CONFIGURATION
// ============================================================================
// Control which parts of the workshop are active
//
// STEP 1: "standalone" - Web components with vanilla JS interaction
//         Use this when viewing wcindex.html directly
//         This will set up all event handlers and demo logic here
//
// STEP 2: "framework-host" - Web components consumed by other frameworks
//         Use this when the web components are imported by Vue/Angular/React
//         This will ONLY register the components, logic is in the host app
//
// STEP 3: "both" - Useful for debugging, runs both modes

type WorkshopMode = 'standalone' | 'framework-host' | 'both';

const WORKSHOP_MODE: WorkshopMode = ((): WorkshopMode => {
    // You can also detect the mode automatically based on the page URL
    // Uncomment this to enable auto-detection:
    /*
    return window.location.pathname.includes('wcindex.html')
        ? 'standalone'
        : 'framework-host';
    */

    // Default mode for framework integration (Vue, Angular, etc.)
   // return 'framework-host';
    return 'standalone'
})();

const shouldRunStandaloneLogic = WORKSHOP_MODE === 'standalone' || WORKSHOP_MODE === 'both';

console.log(
    `%c🎓 Workshop Mode:%c ${WORKSHOP_MODE}`,
    'background: #4CAF50; color: white; font-weight: bold; padding: 8px; border-radius: 4px;',
    'color: gray; margin-left: 8px; font-weight: bold;'
);

// ============================================================================
// STEP 1: Vanilla Web Component
// ============================================================================
// This demonstrates the fundamental Web Component pattern without React.
// Key concepts:
// - Custom element registration
// - Shadow DOM for encapsulation
// - Observed attributes (string-based)
// - Property setters for complex types (functions, objects)
// - Lifecycle callbacks (connectedCallback, attributeChangedCallback)

import {defineComponent1} from "./webcomponents/component1.ts";
import type {MyElement} from "./webcomponents/component1.ts";

console.log('%c[STEP 1] Registering Vanilla Web Component', 'background: #222; color: #bada55; font-weight: bold; padding: 4px;');
defineComponent1(); // Registers <my-element> custom element

// Standalone mode: Set up event handlers and demo logic
if (shouldRunStandaloneLogic) {
    // Wait for DOM to be ready
    window.addEventListener('DOMContentLoaded', () => {
        // Get reference to the element
        const el = document.getElementById('myElement') as MyElement | null;

        if (el) {
            console.log('%c✓ Found <my-element> in DOM', 'color: green; font-weight: bold;');

            // Example 1.1: Set property via JavaScript (not possible via HTML attributes for functions)
            el.customOnClick = (times) => {
                console.log(
                    `%c🖱️ CLICK #${times}%c Custom click handler called from vanilla web component`,
                    'color: purple; font-weight: bold;',
                    'color: gray;'
                );
            };

            // Example 1.2: Attributes can be set via HTML or JavaScript
            // Try changing the 'name' attribute dynamically:
            // setTimeout(() => {
            //     el.setAttribute('name', 'Workshop Attendee');
            // }, 3000);
        } else {
            console.warn('⚠️ <my-element> not found. Make sure wcindex.html includes it.');
        }
    });
}

// ============================================================================
// STEP 2: React-Wrapped Web Component (Simple Example)
// ============================================================================
// This demonstrates wrapping a React component as a Web Component.
// Key concepts:
// - Using React's createRoot to render inside Shadow DOM
// - Converting string attributes to proper types
// - Callback functions via property setters
// - Bi-directional communication (parent → child via props, child → parent via callbacks)

import {defineLikeButton} from "./webcomponents/defineLikeButton.tsx";
import type {LikeButton} from "./webcomponents/defineLikeButton.tsx";

console.log('%c[STEP 2] Registering React-Wrapped Web Component (LikeButton)', 'background: #222; color: #61dafb; font-weight: bold; padding: 4px;');
defineLikeButton(); // Registers <like-button> custom element

// Standalone mode: Set up event handlers and demo logic
if (shouldRunStandaloneLogic) {
    window.addEventListener('DOMContentLoaded', () => {
        const likeButton = document.getElementById('likeButton') as LikeButton | null;

        if (likeButton) {
            console.log('%c✓ Found <like-button> in DOM', 'color: green; font-weight: bold;');

            // Example 2.1: Set callback via JavaScript property
            likeButton.onLikeChange = (liked, newCount) => {
                console.log(
                    `%c❤️ LIKE EVENT%c Liked: %c${liked}%c | Count: %c${newCount}`,
                    'color: red; font-weight: bold;',
                    'color: gray;',
                    liked ? 'color: green; font-weight: bold;' : 'color: orange; font-weight: bold;',
                    'color: gray;',
                    'color: blue; font-weight: bold;'
                );

                // Example 2.2: You could sync this with a backend API
                // fetch('/api/likes', {
                //     method: 'POST',
                //     body: JSON.stringify({ liked, count: newCount })
                // });
            };

            // Example 2.3: Programmatically update attributes
            // setTimeout(() => {
            //     likeButton.setAttribute('likeCount', '100');
            // }, 5000);
        } else {
            console.warn('⚠️ <like-button> not found. Make sure wcindex.html includes it.');
        }
    });
}

// ============================================================================
// STEP 3: Complex React Component (Advanced Example)
// ============================================================================
// This demonstrates a more complex React component with multiple props and events.
// Key concepts:
// - Multiple observed attributes
// - Multiple event callbacks
// - Numeric attribute conversion
// - Real-world media control implementation

import {defineVideoPlayer} from "./webcomponents/defineVideoPlayer.tsx";
import type {VideoPlayer} from "./webcomponents/defineVideoPlayer.tsx";

console.log('%c[STEP 3] Registering Complex React Component (VideoPlayer)', 'background: #222; color: #ff6b6b; font-weight: bold; padding: 4px;');
defineVideoPlayer(); // Registers <video-player> custom element

// Standalone mode: Set up event handlers and demo logic
if (shouldRunStandaloneLogic) {
    window.addEventListener('DOMContentLoaded', () => {
        // Example 3.1: First video player instance
        const player1 = document.getElementById('player1') as VideoPlayer | null;

        if (player1) {
            console.log('%c✓ Found <video-player id="player1"> in DOM', 'color: green; font-weight: bold;');

            player1.onPlay = () => {
                console.log(
                    `%c▶️ PLAYER 1%c Play event triggered`,
                    'color: green; font-weight: bold;',
                    'color: gray;'
                );

                // Example: Pause other players when this one plays
                if (player2) {
                    // You could add a pause() method to the web component
                    console.log('  → Could pause player2 here for single-play behavior');
                }
            };

            player1.onPause = () => {
                console.log(
                    `%c⏸️ PLAYER 1%c Pause event triggered`,
                    'color: orange; font-weight: bold;',
                    'color: gray;'
                );
            };
        } else {
            console.warn('⚠️ <video-player id="player1"> not found.');
        }

        // Example 3.2: Second video player instance (showing multiple instances)
        const player2 = document.getElementById('player2') as VideoPlayer | null;

        if (player2) {
            console.log('%c✓ Found <video-player id="player2"> in DOM', 'color: green; font-weight: bold;');

            player2.onPlay = () => {
                console.log(
                    `%c▶️ PLAYER 2%c Play event triggered`,
                    'color: green; font-weight: bold;',
                    'color: gray;'
                );

                // Example: Analytics tracking
                // trackEvent('video_play', { player: 'player2', timestamp: Date.now() });
            };

            player2.onPause = () => {
                console.log(
                    `%c⏸️ PLAYER 2%c Pause event triggered`,
                    'color: orange; font-weight: bold;',
                    'color: gray;'
                );

                // Example: Track watch time
                // const watchTime = calculateWatchTime();
                // trackEvent('video_pause', { player: 'player2', watchTime });
            };
        } else {
            console.warn('⚠️ <video-player id="player2"> not found.');
        }
    });
}

// ============================================================================
// WORKSHOP EXERCISES & NEXT STEPS
// ============================================================================
// Try these exercises to deepen your understanding:
//
// Exercise 1: Add a new callback to component1
//   - Add an onNameChange callback that fires when the name attribute changes
//   - Hint: Modify component1.ts attributeChangedCallback
//
// Exercise 2: Create a counter component
//   - Start with vanilla web component pattern
//   - Add increment/decrement buttons
//   - Expose current count via attribute
//   - Dispatch CustomEvent when count changes
//
// Exercise 3: Convert a React component to a web component
//   - Pick a simple React component from src/components/
//   - Create a new file in webcomponents/ following the pattern
//   - Register it here and test in wcindex.html
//
// Exercise 4: Framework integration
//   - Try consuming these components in Vue (see vueApp/)
//   - Try consuming these components in Angular (see angularApp/)
//   - Notice the differences in how properties are set
//
// Exercise 5: Advanced patterns
//   - Implement slot support (<slot> in Shadow DOM)
//   - Add CSS custom properties for theming
//   - Implement CustomEvent dispatch instead of callbacks
//   - Try server-side rendering with Declarative Shadow DOM
//
// ============================================================================

console.log(
    '%c🎓 Workshop Ready!%c Check the browser console for interaction logs.',
    'background: #4CAF50; color: white; font-weight: bold; padding: 8px; border-radius: 4px;',
    'color: gray; margin-left: 8px;'
);
