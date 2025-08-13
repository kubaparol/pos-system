import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorHandler } from './components/base/error-handler.tsx';
import { AuthProvider } from './components/providers/auth/auth-provider.tsx';
import { Toaster } from './components/ui/sonner.tsx';
import { queryClient } from './lib/query-client.ts';
import { Routes } from './router/index.tsx';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallbackRender={ErrorHandler}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes />

          <Toaster position="top-right" richColors />
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
