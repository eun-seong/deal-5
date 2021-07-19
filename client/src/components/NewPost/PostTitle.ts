import Component from '@/src/interfaces/Component';
import autoHeightTextarea from '@/src/assets/utils/autoHeightTextarea';

export default class PostTitle extends Component {
  clickedCategories: Array<string> = [];

  template() {
    return `
    <div>
      <textarea rows="1" placeholder="글 제목"></textarea>
      <div class="category" hidden>
        <div>(필수)카테고리를 선택해주세요.</div>
        <ul></ul>
      </div>
    </div>
    `;
  }

  mounted() {
    this.clickedCategories = new Array();
    const categoryList = ['여성패션/잡화', '기타 중고물품', '가구/인테리어', '가전', '노트북/컴퓨터', 'TV/모니터'];
    const $categoryUl = this.$target.querySelector('.category>ul');
    categoryList.sort(_ => Math.random() - 0.5); // shuffle
    categoryList.forEach((category: string, i) => {
      const $li = document.createElement('li');
      $li.innerText = category;
      $li.setAttribute('category-id', String(i));
      $categoryUl?.appendChild($li);
    });
  }

  setEvent() {
    this.addEvent('input', 'textarea', (e: any) => {
      autoHeightTextarea(this.$target, 'textarea');
      if (e.target.value.length > 2) {
        // 카테고리 생성
        const $category = this.$target.querySelector('.category');
        $category?.removeAttribute('hidden');
      } else {
        // 카테고리 제거
        const $category = this.$target.querySelector('.category');
        $category?.setAttribute('hidden', '');
      }
    });

    this.addEvent('click', '.category>ul', (e: any) => {
      const categoryId = e.target.getAttribute('category-id');
      if (!categoryId) return;

      const isActive = e.target.getAttribute('active');
      if (isActive === '') {
        this.clickedCategories = this.clickedCategories.filter(e => e != categoryId);
        e.target.removeAttribute('active');
      } else {
        this.clickedCategories.push(categoryId);
        e.target.setAttribute('active', '');
      }

      // 제목 입력 기준 충족 event
      if (this.clickedCategories.length === 0) {
        this.$target.dispatchEvent(new Event('disableTitle', { bubbles: true }));
      } else if (this.clickedCategories.length === 1) {
        this.$target.dispatchEvent(new Event('ableTitle', { bubbles: true }));
      }
    });
  }
}
