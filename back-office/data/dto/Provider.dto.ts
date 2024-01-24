export default interface ProviderDTO {
  id?: string;
  reference: string;
  companyName: string;
  address?: string;
  phone?: string;
  webSite?: string;
  logo?: string;
  isPinned?: boolean;
}
