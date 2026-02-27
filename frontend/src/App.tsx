import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CreateInvitationWizard from './pages/CreateInvitationWizard';
import InvitationEditor from './pages/InvitationEditor';
import GuestInvitation from './pages/GuestInvitation';
import NotFound from './pages/NotFound';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.98 0.005 80)', color: 'oklch(0.18 0.02 60)' }}>
      <Outlet />
      <Toaster richColors position="top-right" />
    </div>
  ),
  notFoundComponent: () => <NotFound />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
});

const createRoute_ = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create',
  component: CreateInvitationWizard,
});

const editRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/edit/$slug',
  component: InvitationEditor,
});

const invitationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/invitation/$slug',
  component: GuestInvitation,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  createRoute_,
  editRoute,
  invitationRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
