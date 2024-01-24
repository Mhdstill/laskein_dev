export interface FileItem {
  files?: any;
  [key: string]: any;
}

export interface FileInitialState {
  fileList: FileItem[];
  file: FileItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
