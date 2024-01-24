import CategoryDTO from './Category.dto';

export default interface SubCategoryDTO {
  id?: string;
  reference: string;
  name: string;
  categoryId: CategoryDTO;
  category?: any;
}
