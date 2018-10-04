import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { filter } from 'lodash';
import { Item, ItemFilter } from '../models/ItemNew';

@Injectable({
  providedIn: 'root'
})
export class UniqueItemService {
  loading = false;
  _uniques: Item[];

  constructor(private $http: HttpClient) {}

  private get uniques(): Observable<Item[]> {
    if (!this._uniques) {
      const request = this.$http.get<Item[]>(
        'http://localhost:4300/item-api/uniques'
      );
      request.subscribe(items => (this._uniques = items));
      return request;
    }
    return of(this._uniques);
  }

  public filter(itemFilter: ItemFilter): Observable<Item[]> {
    return this.uniques.pipe(map(items => this.filterItems(items, itemFilter)));
  }

  private filterItems(items: Item[], itemFilter: ItemFilter): Item[] {
    const { name, ...rest } = itemFilter;

    // Generic exact match filters
    const filteredItems: Item[] = filter(items, rest) as Item[];

    // Apply RegExp filters
    return filteredItems.filter((item: Item) =>
      // Name
      item.name.match(new RegExp(name, 'gi'))
    );
  }
}
