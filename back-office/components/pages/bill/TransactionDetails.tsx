import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import KeyValue from '../../shared/KeyValue';

type TransactionDetailsProps = {
  isEditing?: boolean;
};

export default function TransationDetails({
  isEditing,
}: TransactionDetailsProps) {
  return (
    <div className="lg:flex lg:flex-row md:flex-row md:flex sm:flex sm:flex-col-reverse sm:items-center w-full">
      <div className="h-full p-2.5 w-full flex flex-col gap-2.5 justify-between border-r border-r-gray-100">
        <KeyValue title="Identifiant" value="test2022" />
        <KeyValue title="Nom" value="Emmanuel Petit " />
        <KeyValue title="Email" value="emmanuel@gmail.com " />
        <KeyValue title="Téléphone" value="+261 34 05 624 78 " />
        <KeyValue title="Adresse" value="7 rue des Fleurs 37000 Tours " />
      </div>
      <div className="h-full p-2.5 w-full flex flex-col gap-2.5 justify-between border-r border-r-gray-100">
        <KeyValue title="N° transaction" value="448b0702-dbf2-4f13-8111" />
        <KeyValue title="Date" value="21/05/2024 " />
        <KeyValue title="Banque" value="Paypal" />
        <KeyValue title="Montant" value="1000 €" />
        <KeyValue title="Type" value="Depot" />
      </div>
      <div className="p-2.5 w-full h-full items-start flex">
        {isEditing && (
          <FormControl fullWidth>
            <InputLabel className="-mt-2" id="demo-simple-select-label">
              Statut
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="category"
              size="small"
            >
              <MenuItem selected value={'PENDING'}>
                En attente
              </MenuItem>
              <MenuItem value={'VALIDATED'}>Valider</MenuItem>
              <MenuItem value={'RESETED'}>Annuler</MenuItem>
            </Select>
          </FormControl>
        )}
      </div>
    </div>
  );
}
