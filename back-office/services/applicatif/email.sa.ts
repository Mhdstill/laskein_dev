import EmailDTO from 'data/dto/Email.dto';
import { getEmailList } from 'services/bdl/email.bdl';

const emailSA = () => {
  return {
    getEmailList: (page: number, size: number) =>
      new Promise<EmailDTO[]>((success, error) => {
        getEmailList(page, size)
          .then((res) => {
            success(res);
          })
          .catch((exception) => error(exception));
      }),
  };
};

export default emailSA;
