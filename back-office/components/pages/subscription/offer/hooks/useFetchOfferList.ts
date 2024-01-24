import { getOfferList } from 'services/redux/abonnement/offer';
import { useAppDispatch } from 'services/redux/hooks';

const useFetchOfferListe = () => {
  const dispatch = useAppDispatch();
  return () => {
    let args: any = {};
    dispatch(getOfferList({ args }));
  };
};

export default useFetchOfferListe;
