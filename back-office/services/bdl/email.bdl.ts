import EmailDTO from 'data/dto/Email.dto';
import axiosInstance from 'utils/hooks/axios-ex';
import { email } from 'utils/urls';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const { getAxios } = axiosInstance();

export const getEmailList = (page: number, size: number) =>
  new Promise<EmailDTO[]>((success, error) => {
    const url = `${BASE_URL}${email.baseApi}?page=${page}&pageSize=${size}`;
    getAxios(url)
      .then((clusterList) => success(clusterList))
      .catch((exception) => error(exception));
  });
