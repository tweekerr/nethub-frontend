import {ProviderType} from "../../ProviderType";

export default interface ISsoRequest {
  username: string | null,
  email: string | null,
  firstName: string | null,
  lastName: string | null,
  middleName?: string,
  profilePhotoUrl: string | null,
  providerMetadata: object,
  provider: ProviderType,
  providerKey: string,
  type?: "register" | "login"
}
