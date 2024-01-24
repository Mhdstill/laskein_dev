export default interface AddressDTO {
  id: string;
  firstAdress: string;
  secondAdress?: string;
  zipCode: string;
  city: string;
  region: string;
  country?: string;
  additionnalInformation?: string;
  userId: string;
}
