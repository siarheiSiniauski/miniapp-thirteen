export interface IJoinGameData {
  roomId: string;
  telegramId: number;
}

interface IPlayer {
  telegramId: number;
  avatar: string | null;
}

interface IParticipant {
  id: string;
  telegramId: number;
  position: number;
  name: string;
  avatar: string | null;
  isChamber: boolean;
  isShoot: boolean;
  isReady: boolean;
  shoot: string | null;
  created_at: string;
}

interface IRound {
  id: string;
  gameId: string;
  participants: IParticipant[];
}

export interface IGame {
  id: string;
  roomId: string;
  status: string;
  players: IPlayer[];
  created_at: string;
  updated_at: string;
  rounds: IRound[];
}
