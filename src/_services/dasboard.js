import { API } from '../_api';

export const DashboardService = { async getStats() {
    const [santriRes, mudarisRes, dormsRes, classroomsRes] = await Promise.all([
      API.get('/santri'),
      API.get('/mudaris'),
      API.get('/dorms'),
      API.get('/classrooms'),
    ]);

    return {
      totalSantri: santriRes.data.length,
      totalUstadz: mudarisRes.data.length,
      asrama: dormsRes.data.length,
      kelas: classroomsRes.data.length,
    };
  }
};
