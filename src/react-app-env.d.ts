/// <reference types="react-scripts" />
import { UserCredential } from 'firebase/auth';

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
declare module '*.module.sass';

export type ILanguage = 'uk' | 'en';

export type IGeneral = {
  theme: 'light' | 'dark';
};

export type APIError = {
  message: string;
  status: number;
  type: string;
}

export interface TinyConfig {
  plugins: string[];
  key: string;
  toolbar: string;
}
