import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CreateInvitationWizard from './pages/CreateInvitationWizard';
import InvitationEditor from './pages/InvitationEditor';
import GuestInvitation from './pages/GuestInvitation';
import NotFound from './pages/NotFound';
import Header from './components/layout/Header';
import AuthGuard from './components/auth/AuthGuard';
import { InvitationFormProvider } from './context/InvitationFormContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Outlet />
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
  component: () => (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  ),
});

const createRoute_ = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create',
  component: () => (
    <AuthGuard>
      <InvitationFormProvider>
        <CreateInvitationWizard />
      </InvitationFormProvider>
    </AuthGuard>
  ),
});

const editRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/edit/$slug',
  component: () => (
    <AuthGuard>
      <InvitationFormProvider>
        <InvitationEditor />
      </InvitationFormProvider>
    </AuthGuard>
  ),
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
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
