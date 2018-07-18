export interface IPhotos {
  id?: string;
  name?: string;
  uri?: string;
  text?: string;
  album?: string;
}

export const defaultValue: Readonly<IPhotos> = {};
