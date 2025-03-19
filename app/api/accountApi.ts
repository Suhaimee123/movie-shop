// /app/api/accountApi.ts
import axiosApi from '@/utils/Api';

export const getAccountDetails = (accountId: number) => {
  return axiosApi.get(`/account/${accountId}`, {
    headers: {
      // ใช้ Bearer จาก env หรือ session
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
    },
  });
};
