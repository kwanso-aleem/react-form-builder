import { v4 as uuid } from 'uuid';

import { columnTypes, inputTypes, itemTypes } from './interfaces';

export const COL_TYPES: columnTypes = {
  COL_1: 'col-1',
  COL_2: 'col-2',
  COL_3: 'col-3',
};

export const INPUT_TYPES: inputTypes = {
  TEXT: 'text',
  DATE: 'date',
  TIME: 'time',
  SELECT: 'select',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  TEL: 'tel',
  NUMBER: 'number',
  EMAIL: 'email',
  COLOR: 'color',
  FILE: 'file',
  IMAGE: 'image',
  MONTH: 'month',
  PASSWORD: 'password',
  RANGE: 'range',
  URL: 'url',
  WEEK: 'week',
};

export const ITEMS: itemTypes[] = [
  {
    id: uuid(),
    content: 'Text Input',
    name: 'input',
    type: INPUT_TYPES.TEXT,
    objectName: uuid(),
    css: '',
    column: 12,
    placeholder: '',
    required: false,
  },
  {
    id: uuid(),
    content: 'Date Input',
    name: 'input',
    type: INPUT_TYPES.DATE,
    objectName: uuid(),
    css: '',
    column: 12,
    placeholder: '',
    required: false,
  },
  {
    id: uuid(),
    content: 'Number Input',
    name: 'input',
    type: INPUT_TYPES.NUMBER,
    objectName: uuid(),
    css: '',
    column: 12,
    placeholder: '',
    required: false,
  },
  {
    id: uuid(),
    content: 'Time Field',
    name: 'input',
    type: INPUT_TYPES.TIME,
    objectName: uuid(),
    css: '',
    column: 12,
    placeholder: '',
    required: false,
  },
];

export const COLUMN_LENGTH: number[] = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MENU_PROPS = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const COL_TYPES_ARRAY = [
  { text: 'Col 1', value: COL_TYPES.COL_1 },
  { text: 'Col 2', value: COL_TYPES.COL_2 },
  { text: 'Col 3', value: COL_TYPES.COL_3 },
];
