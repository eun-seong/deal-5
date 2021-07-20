import './scss/index.scss';
import { initRouter } from './components/core/Router';
import Register from './components/Register';
import Main from './components/Main';
import LogIn from './components/LogIn';
import Location from './components/Location';
import ChatDetail from './components/ChatDetail';
import NewPost from './components/NewPost';
import ItemDetail from './components/ItemDetail';
import MyAccount from './components/MyAccount';

/**
 * route
 * - path: string
 * - component: string | class | HTMLElement | () => types | () => Promise<types>
 *   - string: $app.innerHTML에 대입됩니다.
 *   - class: new로 생성하면서 생성자 파라메터로 $app을 넘겨줍니다.
 *   - HTMLElement: $app.appendChild로 추가됩니다.
 * - middlewares: [() => boolean | () => Promise<boolean>]
 *   - 함수 호출 결과가 true이면, 페이지를 이동하고 false 이면, 페이지를 이동하지 않습니다.
 * - redirect: string
 *   - redirect로 바로 이동합니다.
 */
const routes = [
  { path: '/', redirect: '/' },
  { path: '/', component: Main },
  { path: '/item-detail', component: ItemDetail },
  { path: '/register', component: Register },
  { path: '/login', component: LogIn },
  { path: '/location', component: Location },
  { path: '/chat', component: ChatDetail },
  { path: '/newpost', component: NewPost },
  { path: '/myaccount', component: MyAccount },
];
const $app = document.querySelector('#root') as HTMLElement;

async function init() {
  initRouter({ $app, routes });
}
init();
