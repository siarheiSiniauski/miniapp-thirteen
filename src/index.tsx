import ReactDOM from 'react-dom/client';
// import {
//   BrowserView,
//   MobileView,
//   isBrowser,
//   isMobile,
// } from 'react-device-detect';
import '@telegram-apps/telegram-ui/dist/styles.css';

import './assets/styles/app.scss';

import { RootApp } from '@/components/App/RootApp';

// console.log(isBrowser, isMobile);

ReactDOM.createRoot(document.getElementById('root')!).render(<RootApp />);
