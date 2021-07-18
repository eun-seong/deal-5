import Component from '@/src/interfaces/Component';

interface AlertProps {
  text: string;
  handleOkay: () => {};
}

export default class Alert extends Component {
  template() {
    const { text }: AlertProps = this.$props;

    return `
      <div class="modal">
        <div class="popup">
          <div data-text="">${text}</div>
          <div class="buttons">
            <div class="cancel">취소</div>
            <div class="leave">나가기</div>
          </div>
        </div>
      </div>
    `;
  }

  mounted() {
    this.disableScrolling();
  }

  setEvent() {
    const { handleOkay } = this.$props;
    this.addEvent('click', '.cancel', () => {
      this.$target.remove(); //현재 스크롤된 위치 고정 해제
      window.onscroll = function () {};
    });
    this.addEvent('click', '.leave', (e: any) => {
      this.$target.remove();
      window.onscroll = function () {};
      handleOkay(e);
    });
  }

  disableScrolling() {
    const x = window.scrollX;
    const y = window.scrollY;
    window.onscroll = function () {
      window.scrollTo(x, y);
    };
  }
}
