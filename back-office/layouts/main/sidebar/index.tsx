import classNames from 'classnames';
import { useRouter } from 'next/router';
import { Scrollbars } from 'react-custom-scrollbars-2';

import AddBoxIcon from '../../../components/icons/svg/AddBoxIcon';
import CasinoIcon from '../../../components/icons/svg/CasinoIcon';
import CreditCardIcon from '../../../components/icons/svg/CreditCardIcon';
import { DashboardIcon } from '../../../components/icons/svg/DashboardIcon';
import GroupIcon from '../../../components/icons/svg/GroupIcon';
import GroupsIcon from '../../../components/icons/svg/GroupsIcon';
import HistoryIcon from '../../../components/icons/svg/HistoryIcon';
import InventoryIcon from '../../../components/icons/svg/InventoryIcon';
import KeyIcon from '../../../components/icons/svg/KeyIcon';
import ListAltIcon from '../../../components/icons/svg/ListAltIcon';
import LogoutIcon from '../../../components/icons/svg/LogoutIcon';
import MailIcon from '../../../components/icons/svg/MailIcon';
import PaidIcon from '../../../components/icons/svg/PaidIcon';
import SettingsIcon from '../../../components/icons/svg/SettingsIcon';
import WorkspacePremiumIcon from '../../../components/icons/svg/WorkspacePremiumIcon';
import { logout } from '../../../services/redux/auth';
import { useAppDispatch, useAppSelector } from '../../../services/redux/hooks';
import SidebarItem from './SidebarItem';

export default function SidebarLeft() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { showSidebarLeft } = useAppSelector((state) => state.ui);

  return (
    <div
      className={classNames(
        'w-[230px] h-screen bg-[#2F435E] transition-all z-[2]',
        showSidebarLeft
          ? 'absolute lg:block md:block sm:block'
          : 'lg:block md:hidden sm:hidden'
      )}
    >
      {/* head */}
      <div className="p-[10px] w-full">
        <div className="w-full">
          <h5 className="leading-8 text-[23px] text-white py-[11.5px] px-[63px] border border-[#4B5E65]">
            LasKein
          </h5>
        </div>
      </div>

      <div className="h-[calc(100%_-_77px)] pb-2">
        <Scrollbars autoHide>
          <div className="py-[10px] gap-[2px] flex flex-col">
            <p className="text-[#98A2B2] text-[14px] leading-[22px] px-5">
              Dashboard
            </p>
            <div>
              <SidebarItem
                title="Tableau de bord"
                icon={<DashboardIcon />}
                route="/"
              />
            </div>
          </div>

          {/* divider */}
          <div className="h-[1px] w-[calc(100%_-_20px)] bg-[#4B5E65] mx-2.5"></div>

          <div className="py-[10px] gap-[2px] flex flex-col">
            <p className="text-[#98A2B2] text-[14px] leading-[22px] px-5">
              Général
            </p>
            <div>
              <SidebarItem
                title="Membre"
                icon={<GroupsIcon />}
                route="/member"
              />
              {/* <SidebarItem title="Chat" icon={<ChatIcon />} route="/chat" /> */}
              <SidebarItem
                title="Transaction"
                icon={<PaidIcon />}
                route="/transaction"
              />
              <SidebarItem
                title="Article"
                icon={<InventoryIcon />}
                route="/article"
              />
              <SidebarItem
                title="Box"
                icon={<AddBoxIcon />}
                route="/box"
                routerPrefix="box"
              />
              <SidebarItem
                title="Commande"
                icon={<ListAltIcon />}
                route="/order"
              />
              <SidebarItem title="Email" icon={<MailIcon />} route="/email" />
              {/* <SidebarItem
                title="Temoignage"
                icon={<AdsClickIcon />}
                route="/testimonial"
              /> */}
              <SidebarItem
                title="Publicité"
                icon={<CreditCardIcon />}
                route="/advertisement"
              />
            </div>
          </div>

          {/* divider */}
          <div className="h-[1px] w-[calc(100%_-_20px)] bg-[#4B5E65] mx-2.5"></div>

          <div className="py-[10px] gap-[2px] flex flex-col">
            <p className="text-[#98A2B2] text-[14px] leading-[22px] px-5">
              Autre
            </p>
            <div>
              <SidebarItem
                title="Abonnement"
                icon={<CreditCardIcon />}
                route="/subscription"
              />
              <SidebarItem
                title="Recompense"
                icon={<WorkspacePremiumIcon />}
                route="/reward"
              />
              <SidebarItem title="Jeux" icon={<CasinoIcon />} route="/game" />
              <SidebarItem
                title="Utilisateurs"
                icon={<GroupIcon />}
                route="/user"
              />
              <SidebarItem
                title="Roles / Permission"
                icon={<KeyIcon />}
                route="/rule-permission"
              />
              <SidebarItem
                title="Historique"
                icon={<HistoryIcon />}
                route="/historical"
              />
              <SidebarItem
                title="Paramètres"
                icon={<SettingsIcon />}
                route="/setting"
              />
            </div>
          </div>

          <SidebarItem
            title="Déconnexion"
            icon={<LogoutIcon />}
            onClick={() => {
              dispatch(logout()).unwrap();
              router.push('/auth/login');
            }}
          />
        </Scrollbars>
      </div>
    </div>
  );
}
