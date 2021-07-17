import Component from '@/src/interfaces/Component';
import autoHeightTextarea from '@/src/assets/utils/autoHeightTextarea';

export default class PostContent extends Component {
  template() {
    return `
    <textarea id="post-content" placeholder="게시글을 작성해주세요."></textarea>
    `;
  }

  setEvent() {
    this.addEvent('input', '#post-content', (e: any) => {
      autoHeightTextarea(e, this.$target, '#post-content');
    });
  }
}
