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
  id: string;
  gameId: string;
  participants: Participant[];
  game: Game;
}
