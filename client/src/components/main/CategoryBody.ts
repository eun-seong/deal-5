import Component from '@/src/interfaces/Component';

//상품명 테이블로 뺴고
const CategoryContents = [
  ['디지털기기', 'digital'],
  ['생활가전', 'electro'],
  ['가구/인테리어', 'interior'],
  ['게임/취미', 'game'],
  ['생활/가공식품', 'living'],
  ['스포츠/레저', 'sport'],
  ['여성패션/잡화', 'wFashion'],
  ['남성패션/잡화', 'mFastion'],
  ['유아동', 'child'],
  ['뷰티/미용', 'beauty'],
  ['반려동물', 'animal'],
  ['도서/티켓/음반', 'books'],
  ['식물', 'plants'],
  ['기타 중고물품', 'etc'],
];

export default class CategoryBody extends Component {
  template() {
    return `
      <ul class="category-body-wrap">
        ${CategoryContents.map(
          (a: string[]) =>
            `<ul class='category-item' data-key='${a[1]}'>
                <div class='category-icon'></div>
                <div class='category-title typo xsmall'>${a[0]}</div>
            </ul>`
        ).join('')}
      </ul>
    `;
  }
}
