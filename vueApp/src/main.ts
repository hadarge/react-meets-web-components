/**
 * Vue App Entry Point - Web Components Workshop
 *
 * This demonstrates how to consume React-wrapped Web Components in a Vue app.
 * The key integration pattern is shown here: importing the compiled web components
 * bundle before mounting the Vue app.
 */

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// ============================================================================
// STEP 1: Import Web Components Bundle
// ============================================================================
// This imports the compiled JavaScript bundle from the React app.
// The bundle registers all custom elements (my-element, like-button, video-player)
// in the global CustomElementRegistry.
//
// Build process:
// 1. React app builds web components → reactApp/dist/assets/wcMain.js
// 2. Vue app imports this bundle during initialization
// 3. Custom elements become available in Vue templates
//
// NOTE: The web components MUST be imported before the Vue app is created
// to ensure they're registered before Vue tries to use them.

import '../../reactApp/dist/assets/wcMain.js'

// ============================================================================
// STEP 2: Create and Mount Vue App
// ============================================================================
// Once the web components are registered, Vue can use them in templates
// just like any other HTML element. Vue will treat them as custom elements
// and won't try to resolve them as Vue components.
//
// Key Concepts:
// - Web components work as native HTML elements in Vue
// - Use .prop modifier for JavaScript properties (functions, objects)
// - Reactive bindings work seamlessly with attributes
// - Event handlers are passed as properties, not DOM events

console.log(
    '%c[Vue Workshop]%c Web Components imported from React build',
    'background: #42b883; color: white; font-weight: bold; padding: 4px; border-radius: 4px;',
    'color: gray; margin-left: 8px;'
);

createApp(App).mount('#app')

console.log(
    '%c[Vue Workshop]%c Vue app mounted and ready',
    'background: #42b883; color: white; font-weight: bold; padding: 4px; border-radius: 4px;',
    'color: gray; margin-left: 8px;'
);

// ============================================================================
// WORKSHOP NOTES
// ============================================================================
//
// Framework Integration Comparison:
//
// Vue:
//   - Attributes: :attr="value" or attr="literal"
//   - Properties: :prop.prop="value" (requires .prop modifier!)
//   - Events: Passed as properties with .prop modifier
//
// React:
//   - Attributes: attr={value} or attr="literal"
//   - Properties: Direct prop assignment (ref.current.prop = value)
//   - Events: Passed as props directly
//
// Angular:
//   - Attributes: [attr.name]="value"
//   - Properties: Must be set programmatically in lifecycle hooks
//   - Events: Set via ElementRef in ngAfterViewInit
//
// Key Takeaway:
// Each framework has its own way of setting properties vs attributes.
// Vue's .prop modifier is crucial for passing non-string values!
//
// ============================================================================
