
export enum PageSize {
  A4 = 'a4',
  LETTER = 'letter',
  AUTO = 'auto'
}

export enum Orientation {
  PORTRAIT = 'p',
  LANDSCAPE = 'l'
}

export enum Margin {
  NONE = 0,
  SMALL = 10,
  LARGE = 20
}

export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  name: string;
}

export interface PDFSettings {
  pageSize: PageSize;
  orientation: Orientation;
  margin: Margin;
  filename: string;
}
