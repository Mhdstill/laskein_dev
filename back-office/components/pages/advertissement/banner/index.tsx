import Typography from '@mui/material/Typography';

import BannerImageDTO from 'data/dto/BannerImage.dto';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import BannerImageForm from './BannerImageForm';
import useFetchBannerImageList from './hooks/useFetchBannerImageList';

export function filterBannerImg(bannerImgList: BannerImageDTO[], type: string) {
  return bannerImgList
    .filter((bannerImg: BannerImageDTO) => bannerImg.type === type)
    .at(0);
}

export default function Banner() {
  const dispatch = useAppDispatch();

  const { bannerImageList, reloadBanner } = useAppSelector(
    (state) => state.bannerImage
  );

  let [welcomeBI, setWelcomeBI] = React.useState<BannerImageDTO>(
    {} as BannerImageDTO
  );
  let [subscriptionBI, setSubscriptionBI] = React.useState<BannerImageDTO>(
    {} as BannerImageDTO
  );
  let [sponsorshipBI, setSponsorshipBI] = React.useState<BannerImageDTO>(
    {} as BannerImageDTO
  );
  let [advertisementBI, setAdvertusementBI] = React.useState<BannerImageDTO>(
    {} as BannerImageDTO
  );

  const fetchBannerImageList = useFetchBannerImageList();

  React.useEffect(() => {
    fetchBannerImageList();
  }, [dispatch, reloadBanner]);

  React.useEffect(() => {
    if (bannerImageList) {
      setWelcomeBI(
        filterBannerImg(bannerImageList, 'WELCOME') as BannerImageDTO
      );
      setSubscriptionBI(
        filterBannerImg(bannerImageList, 'SUBSCRIPTION') as BannerImageDTO
      );
      setSponsorshipBI(
        filterBannerImg(bannerImageList, 'SPONSORSHIP') as BannerImageDTO
      );
      setAdvertusementBI(
        filterBannerImg(bannerImageList, 'ADVERTISEMENT') as BannerImageDTO
      );
    }
  }, [bannerImageList]);

  return (
    <div className="px-2.5 pt-2.5 py-10 bg-white h-full w-full flex flex-col">
      <Typography variant="h6">Diaporama</Typography>
      <div className="flex w-1/2 h-full flex-col">
        <div className="flex gap-8 pb-8">
          <BannerImageForm
            status="WELCOME"
            bannerImage={welcomeBI}
            title="Offre de bienvenue"
          />
          <BannerImageForm
            status="SUBSCRIPTION"
            bannerImage={subscriptionBI}
            title="Offre d'abonnement"
          />
          <BannerImageForm
            status="SPONSORSHIP"
            bannerImage={sponsorshipBI}
            title="Info parrainage"
          />
        </div>
      </div>
      <div className="flex flex-col w-1/3 h-full">
        <Typography variant="h6">Image au dessous du diaporama</Typography>
        <div className="flex gap-8 pb-8">
          <BannerImageForm
            status="ADVERTISEMENT"
            bannerImage={advertisementBI}
            title="Publicité"
          />
        </div>
      </div>
    </div>
  );
}
