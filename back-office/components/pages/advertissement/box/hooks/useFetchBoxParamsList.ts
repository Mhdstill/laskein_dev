import { getBoxParamsList } from '../../../../../services/redux/boxParams/useCase/getList';
import { useAppDispatch } from '../../../../../services/redux/hooks';

const useFetchBoxParamsList = (where: any, include?: { img?: boolean }) => {
  const dispatch = useAppDispatch();
  return () => {
    dispatch(
      getBoxParamsList({
        args: {
          include: {
            box: {
              include: {
                boxType: true,
                boxImage: include?.img,
              },
            },
          },
          where: where,
        },
      })
    );
  };
};

export default useFetchBoxParamsList;
