import Component from '@/src/interfaces/Component';

export default class PostTitle extends Component {
  template() {
    return `
    <div>
      <textarea rows="1" placeholder="글 제목"></textarea>
      <div class="category" >
        <div>(필수)카테고리를 선택해주세요.</div>
        <ul>
          <li>여성패션/잡화</li>
          <li>기타 중고물품</li>
          <li>가구/인테리어</li>
        </ul>
      </div>
    </div>
    `;
  }

  mounted() {}
}
