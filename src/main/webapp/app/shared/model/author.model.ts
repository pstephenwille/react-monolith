import { Moment } from 'moment';

export interface IAuthor {
  id?: string;
  name?: string;
  birthDate?: Moment;
}

export const defaultValue: Readonly<IAuthor> = {};
