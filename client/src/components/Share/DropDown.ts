import Component from '@/src/interfaces/Component';

export interface DropDownProps {
  labels: string[];
  onClickItem: () => {};
  specialItems?: specialItem[];
}

interface specialItem {
  name: string;
  type: string;
}

export default class DropDown extends Component {
  template() {
    return ``;
  }

  mounted() {
    const { labels, specialItems } = this.$props;
    const $dropdownBackground = document.createElement('div');
    const $dropdown = document.createElement('div');
    $dropdownBackground.className = 'dropdown-background';
    $dropdown.className = 'dropdown';
    $dropdownBackground.appendChild($dropdown);
    this.$target.appendChild($dropdownBackground);

    labels.forEach((label: string) => {
      const $div = document.createElement('div');
      $div.innerText = label;
      $div.className = 'dropdown-item';
      $dropdown?.appendChild($div);
    });

    specialItems.forEach((item: specialItem) => {
      const $div = document.createElement('div');
      $div.innerText = item.name;
      $div.className = 'dropdown-item';
      $div.setAttribute('type', item.type);
      $dropdown?.appendChild($div);
    });
  }

  setEvent() {
    const { onClickItem } = this.$props;
    this.addEvent('click', '.dropdown', onClickItem);
    this.addEvent('click', '.dropdown-background', (e: any) => {
      const $dropdown = this.$target.querySelector('.dropdown');
      
      $dropdown?.setAttribute('clicked', '');
      setTimeout(() => {
        this.$target.outerHTML = '';
      }, 200);
    });
  }
}
