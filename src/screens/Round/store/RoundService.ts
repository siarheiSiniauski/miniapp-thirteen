import { http } from '@/utils/http';
import { IRound } from './RoundInterface';
import { AxiosResponse } from 'axios';

class RoundService {
  async getRound(roundId: string): Promise<IRound> {
    const res = await http.get<IRound>(`/rounds/${roundId}`);
    return res.data;
  }

  async countByGameId(gameId: string): Promise<number> {
    const res = await http.get<string, AxiosResponse<{ count: number }>>(
      `/rounds/count/${gameId}`
    );
    return res.data.count;
  }
}

export default new RoundService();
