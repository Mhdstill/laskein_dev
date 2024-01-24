type KeyValueProps = {
  title?: string;
  value?: string | any;
};

export default function KeyValue({ title, value }: KeyValueProps) {
  return (
    <div>
      <span className="font-bold text-[#2F435E] text-body2">{title} : </span>
      <span className="text-[#2F435E] text-body2">{value}</span>
    </div>
  );
}
