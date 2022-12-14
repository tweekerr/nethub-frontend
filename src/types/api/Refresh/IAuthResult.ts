export default interface IAuthResult {
  id: string,
  token: string,
  refreshToken: string,
  username: string,
  firstName: string,
  profilePhotoLink: string | null
  tokenExpires: string,
  refreshTokenExpires: string
}
