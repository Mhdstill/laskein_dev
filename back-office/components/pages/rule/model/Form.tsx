import OSTextField from 'components/shared/input/OSTextField';

export default function ModelForm() {
  return (
    <div className="flex w-full">
      <div className="h-full p-2.5 w-full flex gap-2.5">
        <OSTextField name="keyword" size="small" label="Référence" />
        <OSTextField name="name" size="small" label="Modèle" />
      </div>
    </div>
  );
}
