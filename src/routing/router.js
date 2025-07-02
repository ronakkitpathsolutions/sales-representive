import { createBrowserRouter } from 'react-router';

// Routes
import { DASHBOARD_ROUTES, LANDING_ROUTES } from './routes';

// Pages

// Layouts
import LandingLayout from '@/layouts/landing-layout';
import DashboardLayout from '@/layouts/dashboard-layout';

// Landing pages
import LandingRoot from '@/pages/landing/root';

// Dashboard pages
import DashboardRoot from '@/pages/dashboard/root';
import PageNotFound from '@/components/page-not-found';

export const router = createBrowserRouter([
  {
    ...LANDING_ROUTES.layout,
    Component: LandingLayout,
    children: [
      {
        ...LANDING_ROUTES.root,
        Component: LandingRoot,
      },
    ],
  },
  {
    ...DASHBOARD_ROUTES.layout,
    Component: DashboardLayout,
    children: [
      {
        ...DASHBOARD_ROUTES.dashboard,
        Component: DashboardRoot,
      },
    ],
  },
  { path: '*', Component: PageNotFound },
]);
