import './scss/index.scss';
import { initRouter } from './components/core/Router';
import Register from './components/Register';
import Main from './components/Main';
import SignIn from './components/SignIn';
import tempMain from './components/tempMain';
import Location from './components/Location';
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
  // { path: '/', component: Main },
  { path: '/', redirect: '/' },
  { path: '/', component: tempMain },
  { path: '/register', component: Register },
  { path: '/signin', component: SignIn },
  { path: '/location', component: Location },
];
const $app = document.querySelector('#root') as HTMLElement;

async function init() {
  initRouter({ $app, routes });
}
init();

/*
import './scss/index.scss';
import Register from './components/Register';
import SignIn from './components/SignIn';
import { initialRoutes, historyRouterPush, Route, RouterType } from '../src/components/core/Router';

const $app = document.querySelector('#root') as HTMLElement;
const _routes: Route[] = [
  { path: '/register', component: Register },
  { path: '/signin', component: SignIn },
];
*/
