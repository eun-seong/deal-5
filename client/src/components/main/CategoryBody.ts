import { GetCategory } from '@/src/apis/main';
import Component from '@/src/interfaces/Component';

export default class CategoryBody extends Component {
  template() {
    return `
      <ul class="category-body-wrap"></ul>
    `;
  }
  mounted() {
    const categoryBody = this.$target.querySelector('.category-body-wrap') as HTMLElement;
    //카테고리 목록 생성
    GetCategory().then(res => {
      if (res.ok) {
        const data = res.data;

        categoryBody.innerHTML = data
          .map(
            (a: { id: string; kor: string }) => `
          <li class='category-item' data-id='${a.id}'>
            <div class='category-icon'><img src="http://ec2-13-125-215-98.ap-northeast-2.compute.amazonaws.com:81/uploads/icons/${a.id}.png"></div>
            <div class='category-title typo xsmall'>${a.kor}</div>
          </li>`
          )
          .join('');
      }
    });
  }
}
