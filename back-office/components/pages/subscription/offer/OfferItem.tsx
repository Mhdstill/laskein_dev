import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import classNames from 'classnames';
import { useConfirm } from 'material-ui-confirm';
import React, { useEffect } from 'react';
import { deleteOffer, editOffer } from 'services/redux/abonnement/offer';
import { useAppDispatch } from 'services/redux/hooks';
import OfferDTO from '../../../../data/dto/Offer.dto';
import CheckItem from './CheckItem';
import useFetchOfferListe from './hooks/useFetchOfferList';

type OfferItemProps = {
  offerData: OfferDTO;
  handleOpen: any;
};

export default function OfferItem({ offerData, handleOpen }: OfferItemProps) {
  const {
    id,
    name,
    price,
    color,
    numberMysteryBoxBronze,
    numberMysteryBoxSylver,
    numberMysteryBoxGold,
    isAwardLevelActive,
    isWeeklyAwardActive,
    isStandardSupportActive,
    isVIPSupportActive,
    duration,
    priceThreeMonth,
  } = offerData;

  const [background, setBackground] = React.useState('bg-black');

  useEffect(() => {
    if (color) {
      setBackground('bg-[' + color + ']');
    }
  }, [color]);

  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const fetchOfferList = useFetchOfferListe();

  const handleclickDelete = async (id: any) => {
    confirm({
      title: 'Supprimer cet Offre',
      description: 'Voulez-vous vraiment supprimer cet Offre ?',
      cancellationText: 'Annuler',
      confirmationText: 'Supprimer',
      cancellationButtonProps: {
        color: 'warning',
      },
      confirmationButtonProps: {
        color: 'error',
      },
    })
      .then(async () => {
        await dispatch(deleteOffer({ id }));
        fetchOfferList();
      })
      .catch(() => {});
  };

  const handleClickEdit = async (id: any) => {
    await dispatch(editOffer({ id }));
    handleOpen();
  };

  return (
    <div className="border-[2px] border-gray-50 rounded-3xl w-[285px] bg-[#2F435E] flex flex-col justify-between h-full">
      {/* title */}
      <div
        className={classNames(
          background ? 'bg-[#F3EA6F]' : background,
          'rounded-t-2xl py-5 flex justify-center'
        )}
      >
        <h6 className="text-h6 text-[#5C0097]">{name}</h6>
      </div>
      {/* price */}
      <div className="flex w-full py-4 items-end justify-center text-white">
        <h5 className="text-h5">{price} €</h5>
        <p className="text-subtitle1">/mois</p>
      </div>
      {/* {} */}
      <div className="flex w-full pb-4 items-end justify-center text-white">
        <h5 className="text-h5">{priceThreeMonth} €</h5>
        <p className="text-subtitle1">/mois</p>
      </div>
      {/* {cost2 && (
        <div className="flex w-full py-4 items-end justify-center text-white">
          <h5 className="text-h5">{cost2}$</h5>
          <p className="text-subtitle1">/mois</p>
        </div>
      )} */}
      {/* items */}
      <div className="flex flex-col gap-4 items-center justify-center">
        <CheckItem
          count={numberMysteryBoxBronze}
          text="Coffres mystère Bronze offert x"
        />
        <CheckItem
          count={numberMysteryBoxSylver}
          text="Coffres mystère Argent offert x"
        />
        <CheckItem
          count={numberMysteryBoxGold}
          text="Coffres mystère Or offert x"
        />
        <CheckItem isOffer={isAwardLevelActive} text="Palier de récompense" />
        {/* <CheckItem isOffer={isShippingCostOffer} text="Frais de livraison" /> */}
        {/* {isPriorityDelivery && (
          <CheckItem
          isOffer={isPriorityDelivery}
          text="Livraison prioritaire"
          />
        )} */}
        <CheckItem
          isOffer={isStandardSupportActive}
          text="Support standard 24/7"
        />
        <CheckItem isOffer={isVIPSupportActive} text="Support VIP 24/7" />
        <CheckItem
          isOffer={isWeeklyAwardActive}
          text="Récompense hebdomadaire"
        />
        {/* Ajout */}
        <div className="flex py-4 items-end justify-center text-white  ">
          <p className="text-subtitle1">{duration} mois</p>
        </div>
      </div>
      <div className="flex justify-end gap-1 p-4">
        <IconButton
          className="text-white"
          size="small"
          onClick={() => handleClickEdit(id)}
        >
          <Edit />
        </IconButton>
        <IconButton
          className="text-white"
          size="small"
          onClick={() => {
            handleclickDelete(id);
          }}
        >
          <Delete />
        </IconButton>
      </div>
    </div>
  );
}
