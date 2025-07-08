export interface Component3 extends HTMLElement {
    customOnClick: () => void;
}

export const defineComponent3 = (): void => {
    class MyElement extends HTMLElement {
        static get observedAttributes(): string[] {
            return ['name'];
        }

        private shadow: ShadowRoot;
        private name: string | null = null;
        private _onClick: (() => void) | null = null;

        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
        }

        connectedCallback(): void {
            this.name = this.getAttribute('name');
            this.render();
            this.attachClickHandler();
        }

        attributeChangedCallback(attrName: string, oldVal: string | null, newVal: string | null): void {
            if (attrName === 'name' && oldVal !== newVal) {
                this.name = newVal;
                this.render();
                this.attachClickHandler();
            }
        }

        set customOnClick(fn: (() => void) | null) {
            this._onClick = fn;
            this.attachClickHandler();
        }

        get customOnClick(): (() => void) | null {
            return this._onClick;
        }

        private attachClickHandler(): void {
            const p = this.shadow.querySelector('p');
            if (p) {
                p.onclick = () => {
                    if (this._onClick) {
                        this._onClick();
                    } else {
                        alert(`Hello, ${this.name ?? 'Guest'}!`);

                    }
                };
            }
        }

        private render(): void {
            this.shadow.innerHTML = `
        <style>
          p { color: blue; font-weight: bold; cursor: pointer; }
        </style>
        <p>Hello, ${this.name ?? 'Guest'} from <strong>&lt;my-element-3&gt;</strong>!</p>
      `;
        }
    }

    if (!customElements.get('my-element-3')) {
        customElements.define('my-element-3', MyElement);
    }
};
