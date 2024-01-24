import classNames from 'classnames';

type PageTitleProps = {
  title1?: string;
  title2?: string;
  hideBorder?: boolean;
};

export default function PageTitle({
  title1,
  title2,
  hideBorder,
}: PageTitleProps) {
  return (
    <div
      className={classNames(
        'flex w-full px-[10px] py-2 justify-between',
        hideBorder ? '' : 'border-b border-b-gray-100'
      )}
    >
      <h5 className="text-h5 text-[#2F435E]">{title1}</h5>
      <h5 className="text-h5 text-[#2F435E]">{title2}</h5>
    </div>
  );
}
