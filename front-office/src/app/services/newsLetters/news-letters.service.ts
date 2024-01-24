import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/config/data.service';

const SUB_BASE_URL = 'news-letter';

@Injectable({
  providedIn: 'root',
})
export class NewsLettersService {
  constructor(private dataService: DataService) {}

  createUserAddress(news: NewsLettersDTO): Observable<NewsLettersDTO> {
    return this.dataService.postOne(SUB_BASE_URL, news);
  }
}

export interface NewsLettersDTO {
  id?: string;
  email: string;
}
