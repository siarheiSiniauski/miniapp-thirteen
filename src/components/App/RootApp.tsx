import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { type FC, useEffect, useMemo } from 'react';
import { App } from './App';
import { ErrorBoundary } from './ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from '@/core/store';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/core/i18n';
import { Root } from '../Layout/Root';

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === 'string'
          ? error
          : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

const Inner: FC = () => {
  const debug = useLaunchParams().startParam === 'debug';
  const manifestUrl = useMemo(() => {
    return new URL('tonconnect-manifest.json', window.location.href).toString();
  }, []);

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (debug) {
      import('eruda').then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <SDKProvider acceptCustomStyles debug={debug}>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <Root>
              <App />
            </Root>
          </I18nextProvider>
        </Provider>
      </SDKProvider>
    </TonConnectUIProvider>
  );
};

export const RootApp: FC = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <Inner />
  </ErrorBoundary>
);
