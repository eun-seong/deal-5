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

  setEvent() {
    const { handleOkay } = this.$props;
    this.addEvent('click', '.cancel', () => {
      this.$target.remove();
    });
    this.addEvent('click', '.leave', (e: any) => {
      this.$target.remove();
      handleOkay(e);
    });
  }
}
