export interface columnTypes {
  COL_1: string;
  COL_2: string;
  COL_3: string;
}

export interface inputTypes {
  TEXT: string;
  DATE: string;
  TIME: string;
  SELECT: string;
  RADIO: string;
  CHECKBOX: string;
  TEL: string;
  NUMBER: string;
  EMAIL: string;
  COLOR: string;
  FILE: string;
  IMAGE: string;
  MONTH: string;
  PASSWORD: string;
  RANGE: string;
  URL: string;
  WEEK: string;
}

export interface itemTypes {
  id: string;
  content: string;
  name: string;
  type: string;
  objectName: string;
  css: string;
  column: number;
  placeholder: string;
  required: boolean;
}

export interface formInitialType extends itemTypes {
  list: string;
}



export interface formValuesTypes{
  id: string;
  col: number;
  fields: itemTypes[],
}