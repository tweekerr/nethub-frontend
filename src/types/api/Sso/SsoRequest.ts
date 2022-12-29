import {ProviderType} from "../../ProviderType";
import {z as u} from "zod";
import {userApi} from "../../../api/api";
import {onlyLettersRegex} from "../../../utils/regex";

export type SsoRequest = u.infer<typeof SsoRequestSchema>;

export const SsoRequestSchema = u.object({
  username: u.string()
    .min(5, 'Довжина імені користувача повинна бути від 5 до 30')
    .max(30, 'Довжина імені користувача повинна бути від 2 до 30')
    .refine(async (username) => {
      return await userApi.checkUsername(username);
    }, 'Ім\'я користувача вже використовується'),
  email: u.string()
    .email()
    .min(7, 'Невірна поштова скринька'),
  firstName: u.string().min(2, 'Занадто коротке')
    .regex(onlyLettersRegex, 'Невірно введене ім\'я'),
  lastName: u.string().min(2, 'Занадто коротке')
    .regex(onlyLettersRegex, 'Невірно введене прізвище'),
  middleName: u.string().min(5, 'Занадто коротке')
    .regex(onlyLettersRegex, 'Невірно введено по-батькові')
    .optional(),
  profilePhotoUrl: u.string()
    .nullable(),
  providerMetadata: u.any(),
  provider: u.nativeEnum(ProviderType),
  providerKey: u.string(),
  type: u.enum(['register', 'login']).optional()
})