import Typography from '@mui/material/Typography';
import CheckIcon from '../../../icons/svg/CheckIcon';
import CloseIcon from '../../../icons/svg/CloseIcon';

type CheckItemProps = {
  isOffer?: boolean;
  text?: string;
  count?: number;
};

export default function CheckItem({ isOffer, text, count }: CheckItemProps) {
  return (
    <div className="flex gap-1 items-center max-w-[200px]">
      {isOffer || (count as number) > 0 ? <CheckIcon /> : <CloseIcon />}
      <Typography variant="body2" align="center" className="text-white">
        {text}
        {count}
      </Typography>
    </div>
  );
}
