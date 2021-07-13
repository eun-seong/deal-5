export interface HTMLElementAttrs {
  class: string;
  id: string;
  placeholder: string;
  disabled: boolean;
  style: string;
  width: string;
  height: string;
}

export const createElem = (tag: string, attrs: HTMLElementAttrs, ...children: HTMLElement[]) => {
  const _el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    _el.setAttribute(key, value);
  }
  if (!children) return _el;
  children.forEach(a => _el.appendChild(a));
  return _el;
};
