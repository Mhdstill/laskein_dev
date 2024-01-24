import { IAbonnement } from './abonnement.interface';

export interface IAbonnementState {
  allAbonnement: IAbonnement[];
  isLoading: boolean;
}
