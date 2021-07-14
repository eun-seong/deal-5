import Component from '@/src/interfaces/Component';
import MainHeader from './MainHeader';
import CategoryContainer from './Category';


export default function (this: Component, $target: HTMLElement, props: Object) {
  const setup = () => {
    this.$target = $target;
    this.$props = props;
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
    this.render();
    console.log(this.$state);
  };

  this.template = () => {
    return `
        <header class='main-header' data-component='main-header'></header>
        <section class='main-body' data-component></section>
        <footer class='main-footer' data-component></footer>
        ${this.$state.categoryToggle ? `<aside class='category-container' data-component='category'></aside>` : ''}
      `;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
    this.mounted();
  };

  this.mounted = () => {
    const $header = this.$target.querySelector('header[data-component="main-header"]');
    const $categoryContainer = this.$target.querySelector('[data-component="category"]');

    new MainHeader($header, { title: '현재위치', toggleCategory: toggleCategory.bind(this) });
    if (this.$state.categoryToggle)
      new CategoryContainer($categoryContainer, { title: '카테고리', toggleCategory: toggleCategory.bind(this) });
  };

  //!-카테고리 트랜지션
  function toggleCategory(this: any) {
    if (this.$state.categoryToggle) {
      this.$target.querySelector('[data-component="category"]').style.left = '-100%';
      setTimeout(() => {
        this.setState({ categoryToggle: !this.$state.categoryToggle });
      }, 900);
    } else {
      this.setState({ categoryToggle: !this.$state.categoryToggle });
      setTimeout(() => {
        this.$target.querySelector('[data-component="category"]').style.left = '0%';
      }, 1);
    }
  }

  this.setState = (nextState: object) => {
    this.$state = { ...this.$state, ...nextState };
    this.render();
  };

  setup();
}
