import HistoricalDTO from 'data/dto/Historical.dto';

export interface HistoricalInitialState {
  historicaList: HistoricalDTO[];
  historical: HistoricalDTO;
  isEditing: boolean;
  loading: boolean;
  reloadHistorical: string;
  [key: string]: any;
}
