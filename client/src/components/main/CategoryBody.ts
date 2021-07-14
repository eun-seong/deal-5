import Component from '@/src/interfaces/Component';
import CategoryContents from './CategoryContents';

const CategoryBody = function (this: Component, $target: HTMLElement, props: any) {
  const setup = () => {
    this.$target = $target;
    this.$props = props;
    this.render();

    console.log('CategoryBodyRender', this.$props);
  };

  this.template = () => {
    return CategoryContents.map(
      (a: string[]) =>
        `<div class='category-item' data-key='${a[1]}'>
            <div class='category-icon'></div>
            <div class='category-title'>${a[0]}</div>
        </div>`
    ).join('');
  };

  this.render = () => {
    console.log(this.$target);
    this.$target.innerHTML = this.template();
    this.mounted();
  };

  this.mounted = () => {};

  this.setState = (nextState: object) => {
    this.$state = { ...this.$state, ...nextState };
    this.render();
  };

  setup();
} as any;

export default CategoryBody;
