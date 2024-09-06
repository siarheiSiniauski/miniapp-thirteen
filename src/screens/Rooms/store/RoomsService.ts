import { http } from '@/utils/http';
import { IRoom } from './RoomsInterface';

class RoomsService {
  async getRooms(): Promise<IRoom[]> {
    const res = await http.get(`/rooms`);

    return res.data;
  }
}

export default new RoomsService();
