// import OSTextField from 'components/shared/input/OSTextField';
// import OSSelectField from 'components/shared/select/OSSelectField';
import OSTextField from '../../../shared/input/OSTextField';
import OSSelectField from '../../../shared/select/OSSelectField';

export default function PermissionForm() {
  const actionsList = [
    { id: 'READ', name: 'READ', desc: 'Lire' },
    { id: 'CREATE', name: 'CREATE', desc: 'Créer' },
    { id: 'UPDATE', name: 'UPDATE', desc: 'mettre a jour' },
    { id: 'DELETE', name: 'DELETE', desc: 'Supprimer' },
  ];
  return (
    <div className="flex w-full">
      <div className="h-full p-2.5 w-full flex gap-2.5">
        <OSTextField name="keyword" size="small" label="Référence" />
        <OSSelectField
          id="action"
          name="name"
          label="Action"
          options={actionsList}
          dataKey="desc"
          valueKey="name"
        />
      </div>
    </div>
  );
}
