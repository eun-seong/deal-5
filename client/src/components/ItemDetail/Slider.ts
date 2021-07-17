import { svgIcons } from '@/src/assets/svgIcons';
import testimg from '@/src/assets/imgs/item.jpeg';
// import testimg2 from '@/src/assets/imgs/item3.png';
import testimg2 from '@/src/assets/imgs/item2.jpeg';
import Component from '@/src/interfaces/Component';
import DropDown from '../Share/DropDown';

export default class ItemDetailSlider extends Component {
  setup() {
    this.$state = {
      isSeller: true,
    };
  }
  template() {
    return `
      <div class="icons-wrap">
        <div class="left-arrow">${svgIcons.chevronLeft}</div>
        ${
          this.$state.isSeller
            ? `
        <div class="setting-wrap">
          <div class="setting">${svgIcons.moreVertical}</div>
        </div>
      </div>`
            : ''
        }
      <div id="slider" class="slider-wrap">
        <div class="slider-wrapper">
          <div id="slides" class="slides">
            <div class='slide'><img src="${testimg}"></div>
            <div class='slide'><img src="${testimg2}"></div>
            <div class='slide'><img src="${testimg}"></div>
          </div>
          <div id="slider-pagenation" class="pagenation">
              <div class="page active" data-index=0></div>
              <div class="page" data-index=1></div>
              <div class="page" data-index=2></div>
          </div>
        </div>
      </div>
    `;
  }

  //?setTimeout을 해준 이유
  /*아래 함수는 innerHTML 이후 실행 되는함수인데
  innerHTML은 즉각적으로 렌더링을 실행 해주는 것이 아님. call stack이 비어있지 않으면 렌더링이 안됨
  offsetWidth는 DOMTree에 있는 width값이 아닌 RenderTree에 있는 width값을 가져옴
  즉 sliderSize의 offsetWidth 값을 제대로 가져오지 못함

  따라서 callstack다 비워지고 렌더링이 될수 있도록 하고 
  settimeout 받아온 콜백함수로 slider 실행
  */
  setEvent() {
    const slider = document.getElementById('slider') as HTMLElement,
      sliderItems = document.getElementById('slides') as HTMLElement,
      pagenation = document.getElementById('slider-pagenation') as HTMLElement;
    setTimeout(() => {
      this.slide(slider, sliderItems, pagenation);
    }, 50);

    if (this.$state.isSeller) {
      const dropdownTarget = document.querySelector('body') as HTMLElement;
      const dropdown = dropdownTarget.querySelector('.setting') as HTMLElement;

      dropdown.addEventListener('click', (e: any) => {
        const $dropDownDiv = document.createElement('div');
        $dropDownDiv.className = 'dropdown-container';
        dropdownTarget.appendChild($dropDownDiv);

        new DropDown($dropDownDiv, {
          onClickItem: this.dropdownClickEvent,
          specialItems: [
            {
              name: '수정하기',
              type: 'edit',
            },
            {
              name: '삭제하기',
              type: 'delete',
            },
          ],
          pos: {
            left: e.clientX,
            top: e.clientY,
          },
        });
      });
    }
  }

  dropdownClickEvent(e: any) {
    const type = e.target!.getAttribute('type');

    console.log(type);
  }

  slide(wrapper: HTMLElement, items: any, pagenation: HTMLElement) {
    let posX1 = 0,
      posX2 = 0,
      posInitial: any,
      posFinal,
      threshold = 100,
      slides = items.getElementsByClassName('slide'),
      slidesLength = slides.length,
      //사이즈 못가져오는 오류
      slideSize = slides[0].offsetWidth,
      firstSlide = slides[0],
      lastSlide = slides[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      index = 0,
      allowShift = true,
      pagenations = [...pagenation.getElementsByClassName('page')];
    cloneFirst.classList.add('cloneFirst');
    cloneLast.classList.add('cloneLast');

    const changePagenation = () => {
      pagenations.forEach((a, i) => {
        if (i == index) a.classList.add('active');
        else a.classList.remove('active');
      });
    };

    //이미지 클릭
    const dragStart = (e: any) => {
      e = e || window.event;
      e.preventDefault();
      posInitial = items.offsetLeft;
      if (e.type == 'touchstart') {
        posX1 = e.touches[0].clientX;
      } else {
        posX1 = e.clientX;
        document.onmouseup = dragEnd;
        document.onmousemove = dragAction;
      }
    };

    const dragAction = (e: any) => {
      e = e || window.event;

      if (e.type == 'touchmove') {
        posX2 = posX1 - e.touches[0].clientX;
        posX1 = e.touches[0].clientX;
      } else {
        posX2 = posX1 - e.clientX;
        posX1 = e.clientX;
      }
      items.style.left = items.offsetLeft - posX2 + 'px';
    };

    //끝났을 경우의 마우스 위치를 이용하여 기본 이동거리에 따른 슬라이드 위치변경
    const dragEnd = (e: any) => {
      posFinal = items.offsetLeft;
      if (posFinal - posInitial < -threshold) {
        shiftSlide(1, 'drag');
      } else if (posFinal - posInitial > threshold) {
        shiftSlide(-1, 'drag');
      } else {
        items.style.left = posInitial + 'px';
      }

      document.onmouseup = null;
      document.onmousemove = null;
    };

    //슬라이드 이용
    const shiftSlide = (dir: Number, action: any) => {
      items.classList.add('shifting');

      if (allowShift) {
        if (!action) posInitial = items.offsetLeft;

        if (dir == 1) {
          items.style.left = posInitial - slideSize + 'px';
          index++;
          changePagenation();
        } else if (dir == -1) {
          items.style.left = posInitial + slideSize + 'px';
          index--;
          changePagenation();
        }
      }
      allowShift = false;
    };

    //현재 인덱스 확인하고 인덱스가 첫번째보다 이전 또는 마지막이미지 이후면
    //인덱스 위치 초기화
    //무한슬라이드가 되도록해주는 함수
    const checkIndex = () => {
      items.classList.remove('shifting');
      if (index == -1) {
        items.style.left = -(slidesLength * slideSize) + 'px';
        index = slidesLength - 1;
        changePagenation();
      }
      if (index == slidesLength) {
        items.style.left = -(1 * slideSize) + 'px';
        index = 0;
        changePagenation();
      }
      allowShift = true;
    };

    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);

    //화면크기가 변경될경우 이미지 크기 변경
    const resize = () => {
      let resize = window.innerWidth < 1050 ? window.innerWidth : 1050;
      let heightResize = resize < 700 ? resize : 700;
      slideSize = resize;
      [...wrapper.getElementsByTagName('img')].forEach(el => {
        el.style.width = resize + 'px';
        el.style.height = heightResize + 'px';
      });
      items.style.left = -(1 * resize) + 'px';
    };

    resize();
    window.onresize = resize;

    wrapper.classList.add('loaded');

    items.onmousedown = dragStart;

    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);

    items.addEventListener('transitionend', checkIndex);
  }
}
