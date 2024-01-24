export default interface EmailDTO {
  sender?: string;
  emails?: EmailContentDTO[];
}

export interface EmailContentDTO {
  attachments?: [];
  headers?: {};
  headerLines?: {
    key?: string;
    line?: string;
  }[];
  html?: string;
  text?: string;
  textAsHtml?: string;
  subject?: string;
  date?: string;
  to?: EmailUserDTO;
  from?: EmailUserDTO;
  messageId?: string;
}

export interface EmailUserDTO {
  value?: {
    adress?: string;
    name?: string;
  }[];
  html?: string;
  text?: string;
}
