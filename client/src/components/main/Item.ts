import Component from '@/src/interfaces/Component';
import testimg from '@/src/assets/imgs/item.jpeg';
import { svgIcons } from '@/src/assets/svgIcons';

export default class ItemComponent extends Component {
  setup() {
    this.$state = this.$props.state;
  }

  template() {
    const { imgPath } = this.$props;

    return `
    <div class='item-img-wrap'>
      <img src='${!!imgPath ? `http://${location.hostname}:81/${imgPath}` : testimg}'/>
    </div>
    <div class='item-info'>
      <div class='type-link medium item-name'>${this.$state.title}</div>
      <div class='typo small item-location'>${this.$state.location_1} • ${this.$state.created}</div>
      <div class='type-link small item-price'>${this.$state.price}</div>
    </div>
  <div class='item-icons'>
    <div class='bookmark ${this.$state.bookmarked ? 'check' : ''}'>${svgIcons.heart}</div>
    <div class='item-status'>
      ${
        this.$state.comments
          ? `<div class='comments'>${svgIcons.messageSqare}<span class='comments-count'>&nbsp;${this.$state.comments}</span></div>`
          : ''
      }
      ${
        this.$state.bookmarks
          ? `<div class='bookmarks'>${svgIcons.heart}<span class='bookmarks-count'>&nbsp;${this.$state.bookmarks}</span></div>`
          : ''
      }
      </div>
    </div>`;
  }
}
