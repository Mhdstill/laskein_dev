export interface IAbonnement {
  id: string;
  name: string;
  price: number;
  priceThreeMonth: number;
  color: string;
  numberMysteryBoxBronze: number;
  numberMysteryBoxSylver: number;
  numberMysteryBoxGold: number;
  isAwardLevelActive: boolean;
  isWeeklyAwardActive: boolean;
  isStandardSupportActive: boolean;
  isVIPSupportActive: boolean;
  duration: number;
}
