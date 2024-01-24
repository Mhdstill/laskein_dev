export default interface OfferDTO {
  id?: string;
  name: string;
  price: number;
  color: string;
  priceThreeMonth: number;
  numberMysteryBoxBronze: number;
  numberMysteryBoxSylver: number;
  numberMysteryBoxGold: number;
  // silverChestCount?: number;
  // goldChestCount?: number;
  isAwardLevelActive?: boolean;
  isWeeklyAwardActive?: boolean;
  isStandardSupportActive?: boolean;
  isVIPSupportActive?: boolean;
  // isStandardSupport?: boolean;
  duration: number;
}
