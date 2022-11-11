/// <reference types="react-scripts" />

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
declare module '*.module.sass';

export type ILanguage = 'uk' | 'en';

export type APIError = {
  message: string;
  status: number;
  type: string;
};

export interface TinyConfig {
  plugins: string[];
  key: string;
  toolbar: string;
}

declare global {
  interface Window {
    Telegram: {
      Login: {
        auth: (config: any, callback: (data: any) => void) => void;
      }
    };
  }
}
