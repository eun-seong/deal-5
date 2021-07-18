export default (target: HTMLElement, selector: string) => {
  const $textarea = target.querySelector(selector) as HTMLElement;
  if ($textarea.scrollHeight <= 70) {
    $textarea.style.height = 'auto';
    $textarea.style.height = $textarea.scrollHeight + 'px';
  }
};
