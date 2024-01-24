import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  removeDuplicatesByProperty(arr: any[], prop: string) {
    const seen = new Set();
    return arr.filter(item => {
      const value = item[prop];
      if (seen.has(value)) {
        return false; // Duplicate, exclude it from the result
      }
      seen.add(value);
      return true; // Unique, include it in the result
    });
  }
}
