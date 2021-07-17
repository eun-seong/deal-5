export default (event: any, target: HTMLElement, selector: string) => {
  const $textarea = target.querySelector(selector) as HTMLElement;
  if (event.target.scrollHeight <= 70) {
    $textarea.style.height = 'auto';
    $textarea.style.height = event.target.scrollHeight + 'px';
  }
};
