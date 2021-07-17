import Component from '@/src/interfaces/Component';

export default class PostContent extends Component {
  template() {
    return `
    <textarea id="post-content" placeholder="게시글을 작성해주세요."></textarea>
    `;
  }

  setEvent() {
    this.addEvent('input', '#post-content', (e: any) => {
      console.log('hi');
      const $chatBar = this.$target.querySelector('#post-content') as HTMLElement;
      $chatBar.style.height = 'auto';
      $chatBar.style.height = e.target.scrollHeight + 'px';
    });
  }
}
