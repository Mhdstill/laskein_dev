import CategoryDTO from 'data/dto/Category.dto';

export interface CategoryInitialState {
  categoryList: CategoryDTO[];
  category: CategoryDTO;
  isEditing: boolean;
  loading: boolean;
  reloadCategory: string;
  [key: string]: any;
}
