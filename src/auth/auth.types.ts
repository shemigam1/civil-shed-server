export interface ILogin {
  username: string;
  password: string;
}

export type LoginData = {
  userId: number;
  username: string;
  //   accessToken: string;
};

export type LoginResponse = {
  userId: number;
  username: string;
  token: string;
};
