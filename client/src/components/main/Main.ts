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
    };
  }
  template() {
    return `
        <header class='main-header' data-component='main-header'></header>
        <section class='main-body' data-component='main-body'></section>
        <aside class='category-container side-container' data-component='category'></aside>
        <aside class='menu-container side-container' data-component='menu'></aside>
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
    const target = this.$target.querySelector('[data-component="category"]')!;
    this.backgroundClick(this);
    target.classList.toggle('show');

    if (!target.classList.contains('show')) {
      document.querySelector('.container-background')?.remove();
    }
  }

  toggleMenu(this: any) {
    const target = this.$target.querySelector('[data-component="menu"]')!;
    this.backgroundClick(this);
    target.classList.toggle('show');

    if (!target.classList.contains('show')) {
      document.querySelector('.container-background')?.remove();
    }
  }

  backgroundClick(this: any) {
    let background = document.querySelector('.container-background') as HTMLElement;
    if (!background) {
      background = document.createElement('div');
      background.classList.add('dropdown-background', 'container-background');
      document.getElementById('root')!.appendChild(background);
    }

    const sideContainers = [...this.$target.querySelectorAll('.side-container')];

    background.addEventListener('click', (e: any) => {
      sideContainers.forEach((a: any) => a.classList.remove('show'));
      background.remove();
    });
  }

  clickUserLocation(e: any) {
    const clickedItem = e.target.closest('.dropdown-item');
    const type = clickedItem.getAttribute('type');
    if (type === 'setting-location') location.href = '/#/location';
    else console.log(clickedItem.innerText);
  }
}
