export interface IRoom {
  id: string;
  name: string;
  slots: number;
  price: number;
  pool: number;
  isVisible: boolean;
  isSoon: boolean;
}
