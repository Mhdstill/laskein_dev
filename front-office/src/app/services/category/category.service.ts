import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/config/data.service';
import { ICategory } from 'src/app/store/user/user.interface';
import { CategoryQuery } from 'src/app/utils/Query/category.query';

const CATEGORY_URL = 'category';
const SUB_CATEGORY_URL = 'sub-category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private dataService: DataService) {}

  getAllCategory(): Observable<ICategory[]> {
    const categQuery: CategoryQuery = {
      include: {
        subCategory: {
          include: {
            article: {
              include: {
                boxArticle: {
                  include: {
                    box: true,
                  },
                },
              },
            },
          },
        },
      },
    };
    return this.dataService.getAll(CATEGORY_URL, categQuery);
  }
}
