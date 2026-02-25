import { createRouter, RouterProvider, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import InvitationEditor from './pages/InvitationEditor';
import CreateInvitationWizard from './pages/CreateInvitationWizard';
import GuestInvitation from './pages/GuestInvitation';
import NotFound from './pages/NotFound';
import { Toaster } from '@/components/ui/sonner';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  ),
  notFoundComponent: () => <NotFound />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const createRoute_ = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create',
  component: CreateInvitationWizard,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
});

const dashboardEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/$slug',
  component: InvitationEditor,
});

const guestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/$slug',
  component: GuestInvitation,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  createRoute_,
  dashboardRoute,
  dashboardEditorRoute,
  guestRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
