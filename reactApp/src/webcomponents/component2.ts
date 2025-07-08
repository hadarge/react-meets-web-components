export const defineComponent2 = (): void => {
    class MyElement extends HTMLElement {
        static get observedAttributes(): string[] {
            return ['name'];
        }

        private shadow: ShadowRoot;
        private name: string | null = null;

        constructor() {
            super();
            this.shadow = this.attachShadow({ mode: 'open' });
        }

        connectedCallback(): void {
            this.name = this.getAttribute('name');
            this.render();
        }

        attributeChangedCallback(attrName: string, oldVal: string | null, newVal: string | null): void {
            if (attrName === 'name' && oldVal !== newVal) {
                this.name = newVal;
                this.render();
            }
        }

        private render(): void {
            this.shadow.innerHTML = `
        <style>
          p { color: blue; font-weight: bold; }
        </style>
        <p>Hello, ${this.name ?? 'Guest'} from <strong>&lt;my-element-2&gt;</strong>!</p>
      `;
        }
    }

    if (!customElements.get('my-element-2')) {
        customElements.define('my-element-2', MyElement);
    }
};
