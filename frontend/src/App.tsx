import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/layout/Header';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CreateInvitationWizard from './pages/CreateInvitationWizard';
import InvitationEditor from './pages/InvitationEditor';
import GuestInvitation from './pages/GuestInvitation';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
});

// Layout component with Header
function Layout() {
  return (
    <div className="min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
}

// Root route
const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: NotFound,
});

// Routes
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
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
