import GameDTO from 'data/dto/Game.dto';

export interface GameInitialState {
  gameList: GameDTO[];
  game: GameDTO;
  isEditing: boolean;
  loading: boolean;
  reloadGame: string;
  [key: string]: any;
}
