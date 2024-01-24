export default interface BoxImageDTO {
  id?: string;
  boxId?: string;
  photoUrl?: string;
  status: 'OPENED' | 'CLOSED' | 'PLAYING' | 'OTHER' | string | undefined;
}
