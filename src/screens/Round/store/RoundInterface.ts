export type RoundStatus =
  | 'RECRUITMENT'
  | 'WAITING'
  | 'READY'
  | 'GAME'
  | 'GAME_OVER';

export type ParticipantStatus = 'DEAD' | 'ALIVE';

export interface Participant {
  id: string;
  telegramId: number;
  position: number;
  name: string;
  avatar: string | null;
  isChamber: boolean;
  isShoot: boolean;
  isReady: boolean;
  shoot: string | null;
  created_at: Date;
  status: ParticipantStatus;
}

export interface GamePlayer {
  telegramId: number;
  avatar: string | null;
}

export interface Game {
  id: string;
  roomId: string;
  slots: number;
  status: string;
  players: GamePlayer[];
  created_at: Date;
  updated_at: Date | null;
}

export interface IRound {
  game: Game;
  gameId: string;
  id: string;
  nextRound: string | null;
  participants: Participant[];
  status: RoundStatus;
}

export class ParticipantModel {
  id = '';
  telegramId = 0;
  position = 0;
  name = '';
  avatar = '';
  isChamber = false;
  isShoot = false;
  isReady = false;
  shoot = '';
  created_at: Date = new Date();
  status: ParticipantStatus = 'ALIVE';
}
