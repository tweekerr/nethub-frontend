export default interface IAuthResult {
  token: string,
  refreshToken: string,
  username: string,
  firstName: string,
  profilePhotoLink: string | null
  tokenExpires: string,
  refreshTokenExpires: string
}
