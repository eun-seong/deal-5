import { createElem, HTMLElementAttrs } from '@/src/utils/createElem';
import { svgIcons } from '@/src/pages/components/svgIcons';

export default function (attrs: HTMLElementAttrs, title: string) {
  const _leftArrow = createElem('button', { class: 'header-left-arrow svg-icon' });
  _leftArrow.innerHTML = svgIcons.chevronLeft;

  const _headerTitle = createElem('div', { class: 'header-title' });
  _headerTitle.innerText = title;

  attrs.class = attrs.class + ' common-header';
  return createElem('header', { ...attrs }, _leftArrow, _headerTitle);
}
