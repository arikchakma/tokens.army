import '@fontsource/silkscreen';
import '@fontsource/ibm-plex-mono';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NextNProgress from 'nextjs-progressbar';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextNProgress
        color="#111827"
        height={2}
        options={{
          showSpinner: false,
        }}
      />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
