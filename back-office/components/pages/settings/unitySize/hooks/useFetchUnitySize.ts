import { getUnitySizeList } from 'services/redux/unitySize';
import { useAppDispatch } from '../../../../../services/redux/hooks';

const useFetchUnitySizeListe = () => {
  const dispatch = useAppDispatch();
  return () => {
    let args: any = {};
    dispatch(getUnitySizeList({ args }));
  };
};

export default useFetchUnitySizeListe;
