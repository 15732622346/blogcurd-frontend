import { httpClient } from '../utils/http-client';

export const worksApi = {
  // 获取当前用户的所有作品
  getMyWorks: async () => {
    return httpClient.get('/works/my');
  },
  // 创建作品
  createWork: async (data: any) => {
    return httpClient.post('/works', data);
  },
  // 更新作品
  updateWork: async (id: number, data: any) => {
    return httpClient.patch(`/works/${id}`, data);
  },
  // 删除作品
  deleteWork: async (id: number) => {
    return httpClient.delete(`/works/${id}`);
  },
  // 获取指定用户的作品（前台展示用）
  getWorksByUsername: async (username: string) => {
    return httpClient.get(`/works/by-username/${username}`);
  },
  // 获取作品详情
  getWorkById: async (id: number) => {
    return httpClient.get(`/works/${id}`);
  },
};
