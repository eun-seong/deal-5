import Component from '@/src/interfaces/Component';

interface InputPopupProps {
  text: string;
}

export default class InputPopup extends Component {
  template() {
    const { text }: InputPopupProps = this.$props;

    return `
      <div class="modal">
        <div class="popup">
          <div data-text="">${text}</div>
          <input class="inputpopup-input">
          <div class="buttons">
            <div class="cancel">취소</div>
            <div class="okay" disabled>확인</div>
          </div>
        </div>
      </div>
    `;
  }

  setEvent() {
    const { getLocation } = this.$props;

    this.addEvent('input', '.inputpopup-input', (e: any) => {
      if (!!e.target.value) {
        this.$target.querySelector('.okay')?.removeAttribute('disabled');
      }
    });

    this.addEvent('click', '.cancel', (e: any) => {
      this.$target.remove();
    });

    this.addEvent('click', '.okay', (e: any) => {
      const location: string = e.target.parentNode.previousElementSibling.value;
      if (!location) return;
      getLocation(location);
    });
  }
}
