import TextField from '@mui/material/TextField';
import classNames from 'classnames';

export default function PasswordForm() {
  return (
    <div className="flex flex-col w-full h-full gap-10">
      {' '}
      <div
        className={classNames(
          'flex lg:flex-row md:flex-row sm:flex-col items-center justify-between w-full text-[#CACED8] font-bold',
          'lg:py-0 md:py-0 sm:py-4'
        )}
      >
        <h5 className="text-h6">Modifier le mot de passe</h5>
        <p className="text-caption">Dernière mise à jour le 1er août</p>
      </div>
      <div className="flex gap-16 w-full">
        <div className="flex flex-col w-full gap-6">
          <p className="text-caption text-[#CACED8] font-bold">Sécurité</p>
          <TextField
            name="lastPwd"
            variant="outlined"
            size="small"
            label="Ancien mot de passe"
            fullWidth
          />
          <TextField
            name="newPwd"
            variant="outlined"
            size="small"
            label="Nouveau mot de passe"
            fullWidth
          />
          <TextField
            name="confirmPwd"
            variant="outlined"
            size="small"
            label="Confirmer mot de passe"
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}
