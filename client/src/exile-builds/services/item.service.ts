import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemAPIResponse, Item } from '../models/ItemApiResponse';

export interface ItemFilter {
  type?: string | string[];
  search?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private $http: HttpClient) {}

  fetchItems(): Observable<ItemAPIResponse> {
    return this.$http.get<ItemAPIResponse>(
      'http://localhost:4300/item-api/uniques'
    );
  }
}
