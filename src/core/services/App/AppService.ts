import { http } from '@/utils/http';

class AppService {
  async getUserData(telegramId: number): Promise<any> {
    const res = await http.get(`/users/${telegramId}`);
    return res.data;
  }

  async verifyUser(query: string): Promise<any> {
    const res = await http.get(`/users/verify?${query}`);

    return res.data;
  }
}

export default new AppService();
