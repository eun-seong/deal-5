import Component from '@/src/interfaces/Component';
import MyAccount from '../MyAccount';
import LogIn from '../LogIn';
import { api_isLogined } from '@/src/apis/user';

export default class CheckAccount extends Component {
  mounted() {
    api_isLogined({}).then((res: any) => {
      if (res.ok && res.user) {
        window.location.replace(`#/myaccount?nickname=${res.user.nick_name}`);
        new MyAccount(this.$target);
      } else {
        window.location.replace('#/login');
        new LogIn(this.$target);
      }
    });
  }
}
