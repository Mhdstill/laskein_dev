import { useNotification } from '../../../services/redux/notification/useNotification';

const NotificationProvider = () => {
  useNotification();
  return null;
};

export default NotificationProvider;
