import { $ } from '@/src/utils/querySelector';
import { createElem } from '@/src/utils/createElem';
import { toggleClass } from '@/src/utils/toggleClass';
import { svgIcons } from '../components/svgIcons';
import { categoryInfo } from './CategoryContents';
import CommonHeader from '@/src/pages/components/commonHeader';

export default function (this: any) {
  const root = $('#root');
  const _Category = Category();

  const _elButton = createElem('button', {
    class: 'icon-button',
  });
  _elButton.innerHTML = svgIcons.categoty;
  //!-카테고리 showToggleBtn
  toggleClass(_elButton, _Category, 'show');

  const _Location = createElem('div', { class: 'location' });
  const _userInfo = createElem('div', { class: 'user-info' });
  const _Menu = createElem('div', { class: 'menu' });
  const _Header = createElem('Header', { class: 'main-header' }, _elButton, _Location, _userInfo, _Menu);

  this.render = function () {
    console.log('render');
    return root?.append(_Header, _Category);
  };
}

//@-promise 처리
function Category() {
  //카테고리 헤더
  const _CategoryHeader = new (CommonHeader as any)({ class: 'category-header' }, '카테고리');

  //카테코리 리스트
  const _elLeftAside = createElem('aside', {
    class: 'category-aside',
  });

  //@-카테고리 클릭 이벤트 리스너 getItem api 추가
  //일반 메인헤더에서 click이벤트 추가하고 category 함수에서는 데이터 받아오는 함수를 작성.
  _elLeftAside.addEventListener('click', e => {
    const _target = (e.target as any) || null;
    const _parent = _target.parentElement;
    const type = _target.getAttribute('data-type') || _parent.getAttribute('data-type');

    if (!!!type) return;

    console.log(type);
    //api promise 추가
  });

  //!-카테고리 정보 [한글, 영문];
  const _categoryArr = categoryInfo;
  _elLeftAside.innerHTML = _categoryArr
    .map(
      a => `
        <div class='category-item' data-type='${a[1]}'>
          <div class='category-icon'></div>
          <div class='category-title typo xsmall'>${a[0]}</div>
        </div>`
    )
    .join('');

  //!-최종 category div 태그에 Node 추가
  const _el = createElem(
    'section',
    {
      class: 'category',
      id: 'category',
    },
    _CategoryHeader,
    _elLeftAside
  );

  //!--Category헤더 버튼 addeventListen
  toggleClass(_CategoryHeader.children[0], _el, 'show');
  return _el;
}
