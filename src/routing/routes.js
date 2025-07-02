export const LANDING_ROUTES = {
  layout: { path: '/' },
  root: {
    index: true,
    url: '/',
    title: 'Landing',
  },
};

const DASHBOARD_PATH = '/dashboard';
export const DASHBOARD_ROUTES = {
  layout: { path: DASHBOARD_PATH },
  dashboard: {
    index: true,
    url: DASHBOARD_PATH,
    title: 'Dashboard',
  },
};
