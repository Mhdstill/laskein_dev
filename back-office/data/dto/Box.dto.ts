import { BoxEnum } from 'data/enum/Box.enum';
import ArticleDTO from './Article.dto';
import BoxImageDTO from './BoxImage.dto';
import BoxTypeDTO from './BoxType.dto';

export default interface BoxDTO {
  id?: string;
  reference: string;
  name: string;
  price?: number;
  number?: number;
  description?: string;
  badge?: BoxEnum;
  boxTypeId?: string;
  boxType?: BoxTypeDTO;
  boxImage?: BoxImageDTO[];
  article?: ArticleDTO[];
}
