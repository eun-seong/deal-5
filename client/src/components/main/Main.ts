import Component from '@/src/interfaces/Component';
import MainHeader from './MainHeader';
import CategoryContainer from './Category';
import MenuContainer from './Menu';
import MainBody from './MainBody';
import { svgIcons } from '@/src/assets/svgIcons';

export default class MainContainer extends Component {
  setup() {
    this.$state = {
      categoryToggle: false,
      items: [
        {
          id: 0,
          title: '상품',
          price: 123000,
        },
        {
          id: 1,
          title: '상품',
          price: 123000,
        },
      ],
    };
  }
  template() {
    return `
        <header class='main-header' data-component='main-header'></header>
        <section class='main-body' data-component='main-body'></section>
        <aside class='category-container' data-component='category'></aside>
        <aside class='menu-container' data-component='menu'></aside>
        <div class='new-item'><a href="#" class='new-item-sale'>${svgIcons.add}</a></div>
      `;
  }
  mounted() {
    const $header = this.$target.querySelector('header[data-component="main-header"]') as HTMLElement;
    const $body = this.$target.querySelector('section[data-component="main-body"]') as HTMLElement;
    const $categoryContainer = this.$target.querySelector('[data-component="category"]') as HTMLElement;
    const $menuContainer = this.$target.querySelector('[data-component="menu"]') as HTMLElement;
    const [toggleCategory, toggleMenu, clickUserLocation] = [
      this.toggleCategory.bind(this),
      this.toggleMenu.bind(this),
      this.clickUserLocation.bind(this),
    ];
    new MainHeader($header, {
      title: '현재위치',
      toggleCategory,
      toggleMenu,
      onClickItem: clickUserLocation,
    });
    new MainBody($body);
    new CategoryContainer($categoryContainer, { title: '카테고리', toggleCategory });
    new MenuContainer($menuContainer, { title: '메뉴', toggleMenu });
  }

  toggleCategory(this: any) {
    this.$target.querySelector('[data-component="category"]').classList.toggle('show');
  }

  toggleMenu(this: any) {
    this.$target.querySelector('[data-component="menu"]').classList.toggle('show');
  }

  clickUserLocation(e: any) {
    const clickedItem = e.target.closest('.dropdown-item');
    const type = clickedItem.getAttribute('type');
    if (type === 'setting-location') location.href = '/#/location';
    else console.log(clickedItem.innerText);
  }
}
