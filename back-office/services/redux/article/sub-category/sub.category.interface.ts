import SubCategoryDTO from '../../../../data/dto/SubCategory.dto';

export interface SubCategoryInitialState {
  subCategoryList: SubCategoryDTO[];
  subCategory: SubCategoryDTO;
  isEditing: boolean;
  loading: boolean;
  reloadSubCategory: string;
  [key: string]: any;
}
