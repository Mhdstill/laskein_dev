import React, { useEffect } from 'react';

import Add from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';

import { Dialog } from '@mui/material';
import { useAppSelector } from 'services/redux/hooks';
import OfferDTO from '../../../../data/dto/Offer.dto';
import OfferForm from './OfferForm';
import OfferItem from './OfferItem';
import useFetchOfferListe from './hooks/useFetchOfferList';
import { MuiIconButton } from './styles';

export default function Offer() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const { offerList, reloadOffer } = useAppSelector((state) => state.offer);

  const fetchOfferList = useFetchOfferListe();

  useEffect(() => {
    fetchOfferList();
  }, [reloadOffer]);

  return (
    <div className="flex w-full p-2.5">
      <Grid
        container
        spacing={2}
        sx={{
          marginLeft: 0,
          marginTop: 0,
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <Grid
          item
          xs="auto"
          sx={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            paddingLeft: 2,
            paddingTop: 2,
          }}
        >
          <MuiIconButton
            onClick={() => {
              setOpen(true);
            }}
          >
            <Add />
          </MuiIconButton>
        </Grid>
        {offerList.map((offer: OfferDTO) => (
          <Grid item key={offer.id} xs="auto">
            <OfferItem offerData={offer} handleOpen={handleOpen} />
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        fullWidth
      >
        <OfferForm handleClose={handleClose} />
      </Dialog>
    </div>
  );
}
