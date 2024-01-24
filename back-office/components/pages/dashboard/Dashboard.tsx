import GroupIcon from '@mui/icons-material/Group';
import GroupIconAdd from '@mui/icons-material/GroupAdd';
import GroupIconRemove from '@mui/icons-material/GroupRemove';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Unsubscribe from '@mui/icons-material/Unsubscribe';
import { useEffect } from 'react';
import { useAppSelector } from 'services/redux/hooks';
import useFetchDashboardList from './hooks/useFetchDashboardList';

const Dashboard = () => {
  const fetchDashboardList = useFetchDashboardList();
  const { dashboard } = useAppSelector((state) => state.dashboard);
  useEffect(() => {
    fetchDashboardList();
  }, []);

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-[#344a68]">
        <div className="p-4 flex items-center">
          <div className="p-3 rounded-full text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 mr-4">
            <GroupIcon />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Total membre
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {dashboard?.member}
            </p>
          </div>
        </div>
      </div>
      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-[#344a68]">
        <div className="p-4 flex items-center">
          <div className="p-3 rounded-full text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4">
            <GroupIconAdd />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Total membre activé
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {dashboard?.memberActive}
            </p>
          </div>
        </div>
      </div>
      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-[#344a68]">
        <div className="p-4 flex items-center">
          <div className="p-3 rounded-full text-red-500 dark:text-red-100 bg-red-100 dark:bg-red-500 mr-4">
            <GroupIconRemove />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Total membre desactivé
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {dashboard?.memberNotActive}
            </p>
          </div>
        </div>
      </div>
      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-[#344a68]">
        <div className="p-4 flex items-center">
          <div className="p-3 rounded-full text-teal-500 dark:text-teal-100 bg-teal-100 dark:bg-teal-500 mr-4">
            <MarkEmailReadIcon />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Total membre avec email vérifié
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {dashboard?.memberEmailVerified}
            </p>
          </div>
        </div>
      </div>
      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-[#344a68]">
        <div className="p-4 flex items-center">
          <div className="p-3 rounded-full text-red-500 dark:text-red-100 bg-red-100 dark:bg-red-500 mr-4">
            <Unsubscribe />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Total membre avec email non vérifié
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {dashboard?.memberEmailNotVerified}
            </p>
          </div>
        </div>
      </div>
      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-[#344a68]">
        <div className="p-4 flex items-center">
          <div className="p-3 rounded-full text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500 mr-4">
            <Inventory2Icon />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Total box
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {dashboard?.box}
            </p>
          </div>
        </div>
      </div>
      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-[#344a68]">
        <div className="p-4 flex items-center">
          <div className="p-3 rounded-full text-yellow-500 dark:text-yellow-100 bg-yellow-100 dark:bg-yellow-500 mr-4">
            <ShoppingCartIcon />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Total article
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {dashboard?.article}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
