import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/config/data.service';
import { PostDTO } from 'src/app/store/post/post.interface';
import { PostQuery } from 'src/app/utils/Query/post.query';

const SUB_BASE_URL = 'post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private dataService: DataService) {}

  getAllPost(params: PostQuery): Observable<PostDTO[]> {
    return this.dataService.getAll(SUB_BASE_URL, params);
  }
}
