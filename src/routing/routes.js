export const LANDING_ROUTES = {
  layout: { path: '/' },
  root: {
    index: true,
    url: '/',
    title: 'Landing',
  },
};

export const AUTH_ROUTES = {
  login: { path: '/login', url: '/login', title: 'Login' },
  register: { path: '/register', url: '/register', title: 'Registration' },
  forgotPassword: {
    path: '/forgot-password',
    url: '/forgot-password',
    title: 'Forgot Password',
  },
  resetPassword: {
    path: '/reset-password',
    url: '/reset-password',
    title: 'Reset Password',
  },
  createPassword: {
    path: '/create-password',
    url: '/create-password',
    title: 'Create Password',
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
