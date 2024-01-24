import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';

import KeyboardDoubleArrowLeft from '@mui/icons-material/KeyboardDoubleArrowLeft';
import useFetchProviderListe from 'components/pages/article/providers/hooks/useFetchProviderList';
import ProviderDTO from 'data/dto/Provider.dto';
import React from 'react';
import {
  getPinnedProviders,
  getProvider,
  updateProvider,
} from 'services/redux/article/provider';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import { MuiIconButton } from '../box/styles';
import ProviderTable from './ProviderTable';

export default function HomeProviderList() {
  const [selectedProvider, setSelectedProvider] = React.useState<
    readonly string[]
  >([]);
  const [selectedPinnedProvider, setSelectedPinnedProvider] = React.useState<
    readonly string[]
  >([]);

  const { providerList, pinnedProviders } = useAppSelector(
    (state) => state.provider
  );

  const dispatch = useAppDispatch();

  const fetchProviderList = useFetchProviderListe();

  React.useEffect(() => {
    fetchProviderList();
  }, [dispatch]);

  function fetchPinnedProvider() {
    dispatch(
      getPinnedProviders({
        args: {
          where: {
            isPinned: true,
          },
        },
      })
    );
  }

  React.useEffect(() => {
    fetchPinnedProvider();
  }, [dispatch]);

  async function pinProvider() {
    for (const providerId of selectedProvider) {
      const existingProvider = await dispatch(
        getProvider({
          id: providerId,
        })
      );
      if (existingProvider?.payload) {
        let ep: ProviderDTO = existingProvider?.payload;
        if (ep?.isPinned == true) {
          dispatch(
            enqueueSnackbar({
              message: `Le fournisseur sélectionné est déjà épinglé sur la page d'accueil "${ep.companyName}"`,
              options: {
                variant: 'warning',
              },
            })
          );
        } else {
          await dispatch(
            updateProvider({
              id: ep.id as string,
              provider: {
                companyName: ep.companyName,
                reference: ep.reference,
                address: ep.address,
                webSite: ep.webSite,
                phone: ep.phone,
                logo: ep.logo,
                isPinned: true,
              },
            })
          );
          setSelectedProvider([]);
          fetchPinnedProvider();
        }
      }
    }
  }

  async function unpinProvider() {
    for (const providerId of selectedPinnedProvider) {
      const existingProvider = await dispatch(
        getProvider({
          id: providerId,
        })
      );
      if (existingProvider?.payload) {
        let ep: ProviderDTO = existingProvider?.payload;
        await dispatch(
          updateProvider({
            id: ep.id as string,
            provider: {
              companyName: ep.companyName,
              reference: ep.reference,
              address: ep.address,
              webSite: ep.webSite,
              phone: ep.phone,
              logo: ep.logo,
              isPinned: false,
            },
          })
        );
        setSelectedPinnedProvider([]);
        fetchPinnedProvider();
      }
    }
  }

  return (
    <div className="bg-white h-full pb-2.5 w-full">
      <div className="flex bg-gray-100 gap-3 w-full h-full pt-2.5">
        <ProviderTable
          title="Liste des fournisseurs"
          selected={selectedProvider}
          setSelected={setSelectedProvider}
          providerList={providerList}
        />

        <div className="flex flex-col items-center justify-center gap-2.5 h-auto">
          <MuiIconButton
            size="small"
            onClick={() => pinProvider()}
            disabled={selectedProvider.length == 0}
          >
            <KeyboardDoubleArrowRight />
          </MuiIconButton>
          <MuiIconButton
            size="small"
            onClick={() => unpinProvider()}
            disabled={selectedPinnedProvider.length == 0}
          >
            <KeyboardDoubleArrowLeft />
          </MuiIconButton>
        </div>

        <ProviderTable
          title="Liste des fournisseurs à afficher sur la page d'accueil"
          selected={selectedPinnedProvider}
          setSelected={setSelectedPinnedProvider}
          providerList={pinnedProviders}
        />
      </div>
    </div>
  );
}
