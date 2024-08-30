import axiosInstance from './axios';
import {getEncryptStorage} from '@/utils';
import {User} from '@/types/domain';

type RequestUser = {
  email: string;
  nickname?: string;
  password: string;
  passwordForCheck?: string;
};

const postSignup = async ({
  email,
  nickname,
  password,
  passwordForCheck,
}: RequestUser): Promise<void> => {
  const {data} = await axiosInstance.post('/users/sign-up', {
    email,
    nickname,
    password,
    passwordForCheck,
  });

  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/users/sign-in', {email, password});

  return data;
};

const logout = async () => {
  await axiosInstance.delete('/users/logout');
};

const kakaoLogin = async (token: string): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/oauth/kakao', {token});

  return data;
};

type RequestAppleIdentity = {
  identityToken: string;
  appId: string;
  nickname: string | null;
};

const appleLogin = async (
  body: RequestAppleIdentity,
): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/oauth/apple', body);

  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');
  const {data} = await axiosInstance.get('/users/refresh-token', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

type ResponseUser = User;

const getUser = async (): Promise<ResponseUser> => {
  const {data} = await axiosInstance.get('/users/me');

  return data;
};

const deleteAccount = async (userId: string) => {
  await axiosInstance.delete(`/users/${userId}`);
};

export {
  postSignup,
  postLogin,
  getUser,
  getAccessToken,
  logout,
  kakaoLogin,
  appleLogin,
  deleteAccount,
};
export type {ResponseUser, RequestUser, ResponseToken, RequestAppleIdentity};
