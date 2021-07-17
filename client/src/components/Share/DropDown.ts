import Component from '@/src/interfaces/Component';

export interface DropDownProps {
  labels: string[];
  onClickItem: () => {};
  specialItems?: specialItem[];
  //pos추가 position fix는 relative 되어있는 element에 영향을 받음.
  pos: {
    left: number;
    top: number;
  };
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
    const { labels, specialItems, pos } = this.$props;
    const $dropdownBackground = document.createElement('div');
    const $dropdown = document.createElement('div');
    $dropdownBackground.className = 'dropdown-background';
    $dropdown.className = 'dropdown';
    $dropdownBackground.appendChild($dropdown);
    this.$target.appendChild($dropdownBackground);

    //마우스 클릭한 위치에 Dropdown이 생성되도록 추가 pos가 없으면 가운데 고정(root.scss)
    if (pos) {
      $dropdown.setAttribute('style', `left: ${pos.left - 40}px; top: ${pos.top + 15}px;`);
    }

    labels?.forEach((label: string) => {
      const $div = document.createElement('div');
      $div.innerText = label;
      $div.className = 'dropdown-item';
      $dropdown?.appendChild($div);
    });

    specialItems?.forEach((item: specialItem) => {
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
