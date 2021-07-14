import Component from '@/src/interfaces/Component';
import CommonHeader from '../Share/CommonHeader';
import CategoryBody from './CategoryBody';

const CategoryContainer = function (this: Component, $target: HTMLElement, props: any) {
  const setup = () => {
    this.$target = $target;
    this.$props = props;
    this.render();

    console.log(this.$props);
  };

  this.template = () => {
    return `
        <header class='category-header' data-component='category-header'></header>
        <section class='category-body' data-component='category-body'></section>
        <footer class='category-footer'></footer>
      `;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
    this.mounted();
  };

  this.mounted = () => {
    const $header = this.$target.querySelector('header[data-component="category-header"]');
    const $body = this.$target.querySelector('section[data-component="category-body"]');
    new CommonHeader($header, { title: '카테고리', leftArrowEvent: this.$props.toggleCategory });
    new CategoryBody($body);
  };

  this.setState = (nextState: object) => {
    this.$state = { ...this.$state, ...nextState };
    this.render();
  };

  setup();
} as any;

export default CategoryContainer;
