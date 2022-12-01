export default interface IUserInfoResponse {
  id: number,
  userName: string,
  firstName: string,
  lastName: string,
  middleName?: string,
  email: string,
  profilePhotoLink?: string,
  emailConfirmed: boolean,
  description: string,
  registered: string
}

export interface IPrivateUserInfoResponse {
  userName: string,
  profilePhotoLink?: string
}
