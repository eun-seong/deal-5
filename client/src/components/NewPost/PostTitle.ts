import Component from '@/src/interfaces/Component';
import autoHeightTextarea from '@/src/assets/utils/autoHeightTextarea';

export default class PostTitle extends Component {
  categoryId: number = -1;

  template() {
    return `
    <div>
      <textarea rows="1" placeholder="글 제목" class="post-title"></textarea>
      <div class="category" hidden>
        <div>(필수)카테고리를 선택해주세요.</div>
        <ul id="category-list"></ul>
      </div>
    </div>
    `;
  }

  mounted() {
    const categoryList = [
      { id: 1, title: '디지털기기' },
      { id: 2, title: '생활가전' },
      { id: 3, title: '가구/인테리어' },
      { id: 4, title: '게임/취미' },
      { id: 5, title: '생활/가공식품' },
      { id: 6, title: '스포츠/레저' },
      { id: 7, title: '여성패션/잡화' },
      { id: 8, title: '남성패션/잡화' },
      { id: 9, title: '유아동' },
      { id: 10, title: '뷰티/미용' },
      { id: 11, title: '반려동물' },
      { id: 12, title: '도서/티켓/음반' },
      { id: 13, title: '식물' },
      { id: 14, title: '기타 중고물품' },
    ];
    const $categoryUl = this.$target.querySelector('.category>ul');
    categoryList.sort(_ => Math.random() - 0.5); // shuffle
    categoryList.forEach((category: { id: number; title: string }) => {
      const $li = document.createElement('li');
      $li.innerText = category.title;
      $li.setAttribute('category-id', String(category.id));
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
        this.$target.dispatchEvent(new Event('disableTitle', { bubbles: true }));
      }
    });

    this.addEvent('click', '.category>ul', (e: any) => {
      const categoryId = e.target.getAttribute('category-id');
      if (!categoryId) return;

      const $activeCategory = this.$target.querySelector(`li[active]`) as HTMLElement;
      const $clickedCategory = e.target.closest('li');
      if ($activeCategory.innerText === $clickedCategory.innerText) {
        // 이미 active된 카테고리 클릭
        this.categoryId = -1;
        e.target.removeAttribute('active');
      } else {
        // 활성화되지 않은 카테고리 클릭
        if ($activeCategory) {
          $activeCategory.removeAttribute('active');
        }
        this.categoryId = categoryId;
        $clickedCategory.setAttribute('active', '');
      }

      // 제목 입력 기준 충족 event
      if (this.categoryId === -1) {
        this.$target.dispatchEvent(new Event('disableTitle', { bubbles: true }));
      } else {
        this.$target.dispatchEvent(new Event('ableTitle', { bubbles: true }));
      }
    });
  }
}
