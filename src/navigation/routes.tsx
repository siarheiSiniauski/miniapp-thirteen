import { Rooms, Round, Start } from '@/screens';
import { Error } from '@/screens/Error';
import type { ComponentType, JSX } from 'react';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: Start },
  { path: '/rooms', Component: Rooms },
  { path: '/games/:gameId/round/:roundId', Component: Round },
  { path: '*', Component: Error },
];
