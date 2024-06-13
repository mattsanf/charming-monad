import { ref, reactive, type Component } from "vue";

export interface Route {
  name: string;
  component: Component<unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>;
}

export interface Config {
  routes: Route[];
  defaultRouteName?: string;
}

export interface Router {
  routes: Route[];
  activeRoute: Route;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigate: (routeName: string, props?: Record<string, any>) => void;
}

export function createRouter(config: Config): Router {
  function getRouteByName(routeName: string) {
    const currentRoute = routes?.find((route) => route.name === routeName);

    if (currentRoute == null) {
      throw new Error("Invalid route name");
    }

    return currentRoute;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function navigate(routeName: string, props?: Record<string, any>) {
    const route = getRouteByName(routeName);

    if (route == null) {
      throw new Error("Invalid route name");
    }

    const payload = route;
    if (props) {
      payload.props = props;
    } else {
      payload.props = undefined;
    }

    activeRoute.value = payload;
  }

  const routes = config.routes;

  // const defaultActiveRoute = config.defaultRouteName
  //   ? getRouteByName(config.defaultRouteName)
  //   : config.routes[0];

  const activeRoute = ref();

  return reactive({
    routes,
    activeRoute,
    navigate,
  });
}

let router: Router | null = null;

export function useRouter() {
  if (router == null) {
    router = createRouter({
      routes,
      defaultRouteName: "summary",
    });
  }

  return router;
}
