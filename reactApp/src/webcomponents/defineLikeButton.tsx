import {createRoot, type Root} from 'react-dom/client';
import indexCss from '../index.css?inline';
import {LikeButton as LikeButtonComponent} from "../components/LikeButton.tsx";

export interface LikeButton extends HTMLElement {
    onLikeChange: (liked: boolean, newCount: number) => void;
    likeCount: number
}

type NullableString = string | null;

export const defineLikeButton = () => {
    class MyElement extends HTMLElement {
        static get observedAttributes(): string[] {
            return ['initialLiked', 'likeCount'];
        }

        shadow: ShadowRoot;
        root?: Root;
        props: Record<string, any> = {};

        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
        }

        set onLikeChange(fn: LikeButton['onLikeChange']) {
            this.props.onLikeChange = fn;
            this.render();
        }

        set likeCount(n: LikeButton['likeCount']) {
            this.props.likeCount = n;
            this.render();
        }

        connectedCallback(): void {
            const style = document.createElement('style');
            style.textContent = indexCss;
            this.shadow.appendChild(style);

            MyElement.observedAttributes.forEach(attr => {
                const attrValue = this.getAttribute(attr);
                if (attrValue !== null) {
                    if (attr === 'likeCount') {
                        const numValue = Number.parseInt(attrValue, 10);
                        // Defensive: only set if it's a valid number
                        if (!isNaN(numValue)) {
                            this.props[attr] = numValue;
                        }
                    } else {
                        this.props[attr] = attrValue;
                    }
                }
            });

            this.render();
        }

        attributeChangedCallback(attrName: string, oldVal: NullableString, newVal: NullableString): void {
            // Skip if value hasn't actually changed
            if (oldVal === newVal) {
                return;
            }

            if (newVal === null) {
                return;
            }

            if (attrName === 'likeCount') {
                const numValue = Number.parseInt(newVal, 10);
                // Defensive: only update if it's a valid number and different from current value
                if (!isNaN(numValue) && this.props[attrName] !== numValue) {
                    this.props[attrName] = numValue;
                    this.render();
                }
            } else {
                // Only update if value is different
                if (this.props[attrName] !== newVal) {
                    this.props[attrName] = newVal;
                    this.render();
                }
            }
        }

        render(): void {
            if (!this.root) {
                this.root = createRoot(this.shadow);
            }

            this.root.render(<LikeButtonComponent {...this.props}/>);
        }
    }

    if (!customElements.get('like-button')) {
        customElements.define('like-button', MyElement);
    }
};
