import TextField from '@mui/material/TextField';
import classNames from 'classnames';

export default function GeneralForm() {
  return (
    <div className="flex flex-col w-full h-full gap-10">
      <div
        className={classNames(
          'flex lg:flex-row md:flex-row sm:flex-col items-center justify-between w-full text-[#CACED8] font-bold',
          'lg:py-0 md:py-0 sm:py-4'
        )}
      >
        <h5 className="text-h6">Modifier le profil</h5>
        <p className="text-caption">Dernière mise à jour le 1er août</p>
      </div>

      <div className="flex lg:flex-row md:flex-col sm:flex-col gap-16 w-full">
        <div className="flex flex-col w-full gap-6">
          <p className="text-caption text-[#CACED8] font-bold">Personnel</p>
          <TextField
            name="id"
            variant="outlined"
            size="small"
            label="Identifiant"
            fullWidth
            disabled
          />
          <TextField
            name="firstName"
            variant="outlined"
            size="small"
            label="Nom"
            fullWidth
          />
          <TextField
            name="lastName"
            variant="outlined"
            size="small"
            label="Prénom"
            fullWidth
          />
        </div>
        <div className="flex flex-col w-full gap-6">
          <p className="text-caption text-[#CACED8] font-bold">Contact</p>
          <TextField
            name="email"
            variant="outlined"
            size="small"
            label="Email"
            fullWidth
          />
          <TextField
            name="phone"
            variant="outlined"
            size="small"
            label="Téléphone"
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}
