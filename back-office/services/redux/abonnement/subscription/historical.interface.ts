import SubscriptionDTO from 'data/dto/subscription.dto';

export interface SubscriptionInitialState {
  subscriptionList: SubscriptionDTO[];
  subscription: SubscriptionDTO;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
  reloadSubscription: string;
}
