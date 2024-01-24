import PatronageDTO from 'data/dto/Patronage.dto';

export interface PatronageInitialState {
  patronageList: PatronageDTO[];
  patronage: PatronageDTO;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
