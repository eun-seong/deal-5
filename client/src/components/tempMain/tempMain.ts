import Component from '@/src/interfaces/Component';
import CommonHeader from '../Share/CommonHeader';
import LocationButton from '../Share/LocationButton';

class tempMain extends Component {
  template() {
    return `
    <header data-component="header"></header>
    <div class="content">
        <div id="tmpBtn"></div>
    </div>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector('[data-component="header"]');
    const $tmpBtn = this.$target.querySelector('#tmpBtn');

    new CommonHeader($header as HTMLElement, { title: '임시 메인' });

    new (LocationButton as any)($tmpBtn, { locationType: 'active', locationText: 'hihi' });
  }

  setEvent() {
    this.addEvent('click', '#tmpBtn', () => {
      console.log('click');
    });
  }
}

export default tempMain;
