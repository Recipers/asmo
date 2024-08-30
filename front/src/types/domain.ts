interface ImageUri {
  id?: number;
  uri: string;
}

interface User {
  id: number;
  email: string;
  nickname: string | null;
  loginType: 'email' | 'kakao' | 'apple';
}

export type {ImageUri, User};
