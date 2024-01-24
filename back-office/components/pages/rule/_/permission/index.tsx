import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeft from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import Undo from '@mui/icons-material/Undo';

import { useAppDispatch } from '../../../../../services/redux/hooks';
import { togglePermissionInsideRule } from '../../../../../services/redux/rule/ruleSlice';
import PageTitle from '../../../../shared/PageTitle';
import AvalaiblePermissionTable from './AvalaiblePermissionTable';
import SelectedPermissionTable from './SelectedPermissionTable';
import { MuiContainedButton, MuiIconButton } from './styles';

export default function PermissionInRuleComponent() {
  const dispatch = useAppDispatch();
  return (
    <div className="bg-white h-full pb-2.5 w-full">
      <div className="flex items-center justify-between border-b border-b-gray-100 pr-2.5">
        <PageTitle
          title1="Gestion rôle"
          hideBorder
          title2="Liste des permissions"
        />
        <MuiContainedButton
          variant="contained"
          color="primary"
          startIcon={<Undo />}
          className="!normal-case bg-[#376F70] text-white"
          sx={{
            background: '#376F70',
          }}
          onClick={() => dispatch(togglePermissionInsideRule(false))}
        >
          Retour
        </MuiContainedButton>
      </div>

      <div className="flex bg-gray-100 gap-3 w-full h-full pt-2.5">
        <AvalaiblePermissionTable />

        <div className="flex flex-col items-center justify-center gap-2.5 h-auto">
          <MuiIconButton size="small">
            <KeyboardDoubleArrowRight />
          </MuiIconButton>
          <MuiIconButton size="small">
            <KeyboardArrowRight />
          </MuiIconButton>
          <MuiIconButton size="small">
            <KeyboardArrowLeft />
          </MuiIconButton>
          <MuiIconButton size="small">
            <KeyboardDoubleArrowLeft />
          </MuiIconButton>
        </div>

        <SelectedPermissionTable />
      </div>
    </div>
  );
}
