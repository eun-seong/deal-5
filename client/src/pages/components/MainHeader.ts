import { $ } from '@/src/utils/querySelector';
import { createElem } from '@/src/utils/createElem';

export default function (this: any) {
  const root = $('#root');
  const _Category = Category();
  const _Location = createElem('div', {
    class: 'location',
  });
  console.log(_Category);
  const _userInfo = createElem('div', {
    class: 'user-info',
  });
  const _Menu = createElem('div', {
    class: 'menu',
  });
  const _Header = createElem(
    'Header',
    {
      class: 'main-header',
    },
    _Category,
    _Location,
    _userInfo,
    _Menu
  );
  this.render = function () {
    console.log('render');
    return root?.appendChild(_Header);
  };
}

function Category() {
  const _elButton = createElem('button', {
    class: 'icon-button',
  });
  _elButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.33333 4H4.66667C4.29848 4 4 4.29848 4 4.66667V9.33333C4 9.70152 4.29848 10 4.66667 10H9.33333C9.70152 10 10 9.70152 10 9.33333V4.66667C10 4.29848 9.70152 4 9.33333 4Z" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.33333 14H4.66667C4.29848 14 4 14.2985 4 14.6667V19.3333C4 19.7015 4.29848 20 4.66667 20H9.33333C9.70152 20 10 19.7015 10 19.3333V14.6667C10 14.2985 9.70152 14 9.33333 14Z" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19.3333 4H14.6667C14.2985 4 14 4.29848 14 4.66667V9.33333C14 9.70152 14.2985 10 14.6667 10H19.3333C19.7015 10 20 9.70152 20 9.33333V4.66667C20 4.29848 19.7015 4 19.3333 4Z" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19.3333 14H14.6667C14.2985 14 14 14.2985 14 14.6667V19.3333C14 19.7015 14.2985 20 14.6667 20H19.3333C19.7015 20 20 19.7015 20 19.3333V14.6667C20 14.2985 19.7015 14 19.3333 14Z" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
  const _edAside = createElem('aside', {
    class: 'category-aside',
  });
  const _catergoryArr = [
    '디지털기기',
    '생활가전',
    '가구/인테리어',
    '게임/취미',
    '생활/가공식품',
    '스포츠/레저',
    '여성패션/잡화',
    '남성패션/잡화',
    '유아동',
    '뷰티/미용',
    '반려동물',
    '도서/티켓/음반',
    '식물',
    '기타 중고물품',
  ];
  _edAside.innerHTML = _catergoryArr
    .map(
      a => `<div>
    <div class='category-icon'>I</div>
    <div class='category-title'>${a}</div>
  </div>`
    )
    .join('');
  const _el = createElem(
    'div',
    {
      class: 'category',
      id: 'category',
    },
    _elButton,
    _edAside
  );
  return _el;
}
