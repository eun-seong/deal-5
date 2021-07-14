import { isClass, isFunction, isPromise } from '../../utils';
/**
 * **DO NOT MODIFY THIS FILE**
 */

export interface RouterType {
  $app: HTMLElement;
  routes: Route[];
  fallback?: string;
}

export interface Route {
  path: string;
  redirect?: string;
  component?: any;
  middlewares?: any;
}

class Router {
  $app: HTMLElement;
  fallback: string = '';
  routes: {
    [key: string]: Route;
  } = {};

  constructor({ $app, routes, fallback }: RouterType) {
    this.$app = $app;
    this.fallback = fallback ?? '/';
    this.generateRoutes(routes);
    this.initEvent();
  }
  generateRoutes(routes: Route[]) {
    this.routes = {};
    routes.forEach(route => {
      this.routes[route.path] = route;
    });
  }
  initEvent() {
    window.addEventListener('hashchange', () => this.onHashChangeHandler());
  }
  getRoute(path: string) {
    const route = this.routes[path];
    if (!route) throw new Error(`Not found route: ${path}`);
    return route;
  }
  hasRoute(path: string) {
    return typeof this.routes[path] !== 'undefined';
  }
  async getComponent(route: Route) {
    const component = isFunction(route.component) && !isClass(route.component) ? route.component() : route.component;
    if (isPromise(component)) {
      const res = await component;
      return res.default ? res.default : res;
    } else {
      return component;
    }
  }
  async onHashChangeHandler() {
    this.$app.innerHTML = '';
    const hash = window.location.hash;
    const path = hash.substr(1);
    const route = this.hasRoute(path) ? this.getRoute(path) : this.getRoute(this.fallback);
    if (route.redirect) {
      this.push(route.redirect);
      return;
    }
    if (route.middlewares) {
      for (const middleware of route.middlewares) {
        if (!(await middleware())) {
          return;
        }
      }
    }
    const component = await this.getComponent(route);
    if (typeof component === 'string') {
      this.$app.innerHTML = component;
    } else if (component instanceof HTMLElement) {
      this.$app.appendChild(component);
    } else if (isClass(component)) {
      new component(this.$app);
    } else {
      throw new Error('invalid component');
    }
  }
  push(path: string) {
    window.location.hash = path;
  }
}
/**
 * - push(path: string): void - navigate
 */
export let $router: any;
/**
 * @param {{$app: HTMLElement, routes: Route[], fallback?: string}} options
 */
export function initRouter(options: RouterType) {
  const router = new Router(options);
  $router = {
    push: (path: string) => router.push(path),
  };
  router.onHashChangeHandler();
}

/*
import Component from '@/src/interfaces/Component';

export interface RouterType {
  $app: HTMLElement;
  _routes: Route[];
}

export interface Route {
  path: string;
  component: any;
}

const routes: {
  [key: string]: Route;
} = {};

// entry point
export function initialRoutes({ $app, _routes }: RouterType) {
  _routes.forEach((route: Route) => {
    routes[route.path] = route;
  });
  renderHTML($app, routes['/signin']);
  const path: string = window.location.pathname;
  window.onpopstate = () => {
    renderHTML($app, routes[path]);
  };

  document.addEventListener('click', (e: any) => {
    e.preventDefault();
    historyRouterPush(e.target.href, $app);
  });
}

// set browser history
export function historyRouterPush(path: string, $app: HTMLElement) {
  console.log(routes);
  window.history.pushState({}, path, window.location.origin + path);
  renderHTML($app, routes[path]);
}

// render
function renderHTML($app: HTMLElement, route: Route) {
  console.log(routes);
  $app.innerHTML = '';
  new route.component($app);
}
*/
