export default interface IRefreshResponse {
  token: string,
  refreshToken: string,
  username: string,
  profilePhotoLink: string
  tokenExpires: Date,
  refreshTokenExpires: Date
}
