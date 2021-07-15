import gopher from './item.jpeg';
import { svgIcons } from '@/src/assets/svgIcons';
import Component from '@/src/interfaces/Component';

export default class MainBody extends Component {
  items: Array<Number> = [];
  setup() {
    this.items = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  }
  template() {
    return `<ul data-component=items-wrap>
    ${this.items
      .map(
        _ =>
          `<li class='body-item content'>
        <div class='item-img-wrap'>
          <img src='${gopher}'/>
        </div>
        <div class='item-info'>
          <div class='type-link medium item-name'>에잇모르겟다에잇모르겟다에잇모르겟다에잇모르겟다에잇모르겟다에잇모르겟다에잇모르겟다에잇모르겟다에잇모르겟다에잇모르겟다에잇모르겟다</div>
          <div class='typo small item-location'>Earth • <span data-createtime=''>2시간전</span></div>
          <div class='type-link small item-price'>5,432원</div>
        </div>
        <div class='item-icons'>
          <div class='bookmark'>${svgIcons.heart}</div>
          <div class='item-status'>
            <div class='comments'>${svgIcons.messageSqare}<span class='comments-count'>&nbsp;2</span></div>
            <div class='bookmarks'>${svgIcons.heart}<span class='bookmarks-count'>&nbsp;2</span></div>
          </div>
        </div>
      </li>`
      )
      .join('')}
    </ul>`;
  }

  setEvent() {
    this.addEvent('click', '[data-component=items-wrap]', this.bookmarkToggle);
  }

  bookmarkToggle(e: any) {
    e.target.closest('.bookmark')?.classList.toggle('check');
  }
}
