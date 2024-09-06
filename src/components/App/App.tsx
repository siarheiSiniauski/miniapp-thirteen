import { useIntegration } from '@telegram-apps/react-router-integration';
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initNavigator,
  initSwipeBehavior,
  useMiniApp,
  useThemeParams,
  useViewport,
} from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { type FC, useEffect, useMemo } from 'react';
import { Route, Router, Routes } from 'react-router-dom';

import { routes } from '@/navigation/routes.tsx';

import { Error } from '@/screens/Error';

export const App: FC = () => {
  // const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();
  const [swipeBehavior] = initSwipeBehavior();

  useEffect(() => {
    if (swipeBehavior) {
      swipeBehavior.disableVerticalSwipe();
    }
  }, [swipeBehavior]);

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    if (viewport) {
      viewport.expand();
    }

    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);

  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  // console.log(lp.platform);

  return (
    <>
      <AppRoot
      // appearance={miniApp.isDark ? 'dark' : 'light'}
      // platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
      >
        <Router location={location} navigator={reactNavigator}>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </AppRoot>
    </>
  );
};
