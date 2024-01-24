import TestimonialDTO from 'data/dto/Tesimonial.dto';

export interface TemoignageInitialState {
  temoignageList: TestimonialDTO[];
  temoignage: TestimonialDTO;
  isEditing: boolean;
  loading: boolean;
  reloadTemoignage: string;
  [key: string]: any;
}
