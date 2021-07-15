import Component from '@/src/interfaces/Component';

export default class MenuBody extends Component {
  template() {
    return `
    <div>
      <ul class="menu-tabs-list">
        <li class='type-link small active'>판매목록</li>
        <li class='type-link small'>채팅목록</li>
        <li class='type-link small'>관심목록</li>
        <hr class="underline" />
      </ul>
      <div class="tabpanal" data-component="tabpanal"></div>
    </div>
    `;
  }
}
