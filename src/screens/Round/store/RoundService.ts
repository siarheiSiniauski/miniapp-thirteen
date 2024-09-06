import { http } from '@/utils/http';
import { IJoinGameData } from './RoundInterface';

class RoundService {
  async joinGame(data: IJoinGameData): Promise<any> {
    const res = await http.post(`/games/join`, data);

    return res.data;
  }
}

export default new RoundService();
