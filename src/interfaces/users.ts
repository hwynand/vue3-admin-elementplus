export interface ILogInData {
  username: string,
  password: string,
}

export interface ILogInResponse {
  access_token: string,
  token_type: string,
}

export interface IUser {
  id: number,
  firstname?: string,
  lastname?: string,
  email: string,
  phone_number?: string,
  address?: string,
  gender: number,
  is_admin: boolean,
  is_staff: boolean,
}