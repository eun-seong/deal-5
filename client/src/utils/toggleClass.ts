export const toggleClass = (listenElem: HTMLElement, targetElem: HTMLElement, toggleClass: string) => {
  listenElem.addEventListener('click', () => {
    targetElem.classList.toggle(toggleClass);
  });
};
