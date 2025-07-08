import {createRoot, type Root} from 'react-dom/client';
import indexCss from '../index.css?inline';
import {LikeButton} from "../components/LikeButton.tsx";

export interface LikeButton extends HTMLElement {
    onLikeChange: (liked: boolean, newCount: number) => void;
}

export const defineLikeButton = () => {
    class MyElement extends HTMLElement {
        static get observedAttributes(): string[] {
            return ['initialLiked', 'likeCount', 'onLikeChange'];
        }

        private shadow: ShadowRoot;
        private root: Root | null = null;
        private props: Record<string, any> = {};

        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
        }

        set onLikeChange(fn: (() => void) | null) {
            this.props.onLikeChange = fn;
            this.render();
        }

        get onLikeChange(): (() => void) | null {
            return this.props.onLikeChange;
        }

        connectedCallback(): void {
            const style = document.createElement('style');
            style.textContent = indexCss;
            this.shadow.appendChild(style);

            MyElement.observedAttributes.forEach(attr => {
                const val = this.getAttribute(attr);
                if (val !== null)
                    this.props[attr] = val;

                if (attr === 'likeCount') {
                    this.props[attr] = Number.parseInt(this.props[attr]);
                }
            });

            this.render();
        }

        attributeChangedCallback(attrName: string, oldVal: string | null, newVal: string | null): void {
            if (oldVal !== newVal) {
                this.props[attrName] = newVal;
                this.render();
            }
        }

        private render(): void {
            if (!this.root) {
                this.root = createRoot(this.shadow);
            }

            this.root.render(<LikeButton {...this.props}/>);
        }
    }

    if (!customElements.get('like-button')) {
        customElements.define('like-button', MyElement);
    }
};
