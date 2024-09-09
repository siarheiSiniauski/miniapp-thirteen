import { IJoinGameData } from '@/screens/Round/store/RoundInterface';
import { http } from '@/utils/http';
import { AxiosResponse } from 'axios';
import { Game } from './GameInterface';

class AppService {
  async joinGame(data: IJoinGameData): Promise<Game> {
    const res = await http.post<IJoinGameData, AxiosResponse<Game>>(
      `/games/join`,
      data
    );
    return res.data;
  }

  async getGame(id: string): Promise<Game> {
    const res = await http.get<string, AxiosResponse<Game>>(`/games/${id}`);

    return res.data;
  }
}

export default new AppService();
