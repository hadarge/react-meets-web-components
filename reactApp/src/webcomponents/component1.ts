export const defineComponent1 = (): void => {
    class MyElement extends HTMLElement {
        shadow: ShadowRoot;

        constructor() {
            super();
            this.shadow = this.attachShadow({ mode: 'open' });
        }

        connectedCallback(): void {
            if (this.shadow) {
                this.shadow.innerHTML = `
          <style>
            p { color: blue; font-weight: bold; }
          </style>
          <p>Hello from <strong>&lt;my-element&gt;</strong>!</p>
        `;
            }
        }
    }

    if (!customElements.get('my-element')) {
        customElements.define('my-element', MyElement);
    }
};
