import Component from '@/src/interfaces/Component';
import autoHeightTextarea from '@/src/assets/utils/autoHeightTextarea';

export default class PostContent extends Component {
  template() {
    return `
    <textarea rows=15 id="post-content" placeholder="게시글을 작성해주세요."></textarea>
    `;
  }

  setEvent() {
    this.addEvent('input', '#post-content', (e: any) => {
      autoHeightTextarea(e, this.$target, '#post-content');

      // 컨텐츠 내용 기준 충족 event
      if (e.target.value.length === 0) {
        this.$target.dispatchEvent(new Event('disableContent', { bubbles: true }));
      } else if (e.target.value.length === 1) {
        this.$target.dispatchEvent(new Event('ableContent', { bubbles: true }));
      }
    });
  }
}
