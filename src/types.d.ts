export type ILanguage = 'uk' | 'de';

export type IGeneral = {
  theme: 'light' | 'dark';
};

export type APIError = {
  message: string;
  status: number;
  type: string;
};
