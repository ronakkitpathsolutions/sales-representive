import { AUTH_ROUTES, DASHBOARD_ROUTES } from '@/routing/routes';
import {
  LOCAL_STORAGE_KEY,
  CACHED_URL_LOCAL_STORAGE_KEY,
} from '@/utils/constants';
import {
  decodeToken,
  getLocalStorage,
  isTokenActive,
  setLocalStorage,
} from '@/utils/helper';

export const getAuth = options => {
  const { isCacheRedirection } = options || {};

  const token = getLocalStorage(LOCAL_STORAGE_KEY);
  const cachedRedirectUrl = getLocalStorage(CACHED_URL_LOCAL_STORAGE_KEY);
  const isAuthenticated = isTokenActive(token);

  let redirectUrl = AUTH_ROUTES.login.url;
  let user = {};

  if (isAuthenticated) {
    const user = decodeToken(token);
    redirectUrl = user.role
      ? cachedRedirectUrl || DASHBOARD_ROUTES.dashboard.url
      : AUTH_ROUTES.login.url;
  }

  if (isCacheRedirection && !isAuthenticated) {
    const { pathname, search } = window?.location || {};
    const cachedRedirectUrl = pathname + search;
    setLocalStorage(CACHED_URL_LOCAL_STORAGE_KEY, cachedRedirectUrl);
  }

  return {
    isAuthenticated,
    role: user.role,
    redirectUrl,
  };
};
