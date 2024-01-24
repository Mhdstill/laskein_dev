import BoxDTO from './Box.dto';
import PriceDTO from './Price.dto';
import ProviderDTO from './Provider.dto';
import SubCategoryDTO from './SubCategory.dto';
import UnitySizeDTO from './UnitySize.dto';
import ArticlePhotoDTO from './articlePhoto.dto';

export default interface ArticleDTO {
  id?: string;
  reference: string;
  designation: string;
  type?: string;
  size?: string;
  color?: string;
  productUrl?: string;
  observation?: string;
  providerId?: string;
  provider?: ProviderDTO;
  unitySizeId?: string;
  unitySize?: UnitySizeDTO;
  winningChance?: number;
  subCategoryId?: string;
  subCategory?: SubCategoryDTO;
  articlePhoto?: ArticlePhotoDTO[];
  boxId?: string;
  box?: BoxDTO;
  price?: PriceDTO;
}
