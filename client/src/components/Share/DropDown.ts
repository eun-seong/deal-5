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
  key?: string;
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
    this.disableScrolling()

    //마우스 클릭한 위치에 Dropdown이 생성되도록 추가 pos가 없으면 가운데 고정(root.scss)
    if (pos) {
      let transformOrigin = '';
      //왼쪽화면을 넘어가는 것 방지.
      if (pos.left - 40 < 90) {
        pos.left = 90;
        transformOrigin = `transform-origin: -${pos.left}px 0;`;
      } else {
        pos.left -= 40;
      }

      $dropdown.setAttribute('style', `left: ${pos.left}px; top: ${pos.top + 20}px; ${transformOrigin}`);
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
      item.key ? $div.setAttribute('data-key', item.key) : null;
      $dropdown?.appendChild($div);
    });
  }

  //현재 스크롤된 위치 고정 시키기 위한 함수
  disableScrolling() {
    const x = window.scrollX;
    const y = window.scrollY;
    window.onscroll = function () {
      window.scrollTo(x, y);
    };
  }

  setEvent() {
    const { onClickItem } = this.$props;
    this.addEvent('click', '.dropdown', onClickItem);
    this.addEvent('click', '.dropdown-background', (e: any) => {
      const $dropdown = this.$target.querySelector('.dropdown');
      const root = document.getElementById('root') as HTMLElement;
      root.removeAttribute('style');

      $dropdown?.setAttribute('clicked', '');
      setTimeout(() => {
        this.$target.remove();
        //현재 스크롤된 위치 고정 해제
        window.onscroll = function () {};
      }, 200);
    });
  }
}
