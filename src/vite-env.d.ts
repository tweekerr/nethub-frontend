/// <reference types="vite/client" />


import {ZodError} from "zod";

export type ILanguage = 'uk' | 'en';

declare module "zod" {
  export interface ZodError {
    formatErrors: () => { field: string, message: string }[]
  }
}

ZodError.prototype.formatErrors = function (): { field: string, message: string }[] {
  return this.errors.map(e => {
    return {field: e.path.toString(), message: e.message}
  })
}