import {ProviderType} from "../../../utils/sso";

export default interface ISsoRequest {
  username: string,
  email: string,
  firstname: string,
  lastname: string,
  middlename: string,
  providerMetadata: object,
  provider: ProviderType
}
