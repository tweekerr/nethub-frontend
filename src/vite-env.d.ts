/// <reference types="vite/client" />

export type ILanguage = 'uk' | 'en';

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
