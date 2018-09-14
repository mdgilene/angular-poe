import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item, ApiRespones } from '../models/item';
import { of, Observable, forkJoin } from 'rxjs';
import { map, filter, mergeMap } from 'rxjs/operators';

export interface ItemFilter {
  type?: string | string[];
  search?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: Item[] = [];

  loading: boolean;

  constructor(private $http: HttpClient) {
    this.loading = true;

    const getArmour = this.$http
      .get<ApiRespones>('http://localhost:4300/armour')
      .pipe(map(res => res.lines));
    const getWeapons = this.$http
      .get<ApiRespones>('http://localhost:4300/weapons')
      .pipe(map(res => res.lines));
    const getAccessories = this.$http
      .get<ApiRespones>('http://localhost:4300/accessories')
      .pipe(map(res => res.lines));
    const getFlasks = this.$http
      .get<ApiRespones>('http://localhost:4300/flasks')
      .pipe(map(res => res.lines));
    const getJewels = this.$http
      .get<ApiRespones>('http://localhost:4300/jewels')
      .pipe(map(res => res.lines));

    const request = forkJoin<Item[]>([
      getArmour,
      getWeapons,
      getAccessories,
      getFlasks,
      getJewels
    ]).pipe(map(responses => [].concat(...responses)));

    request.subscribe(items => {
      this.items = items;
      this.loading = false;
    });
  }

  getFilteredItems(itemFilter: ItemFilter): Observable<Item[]> | null {
    if (Array.isArray(itemFilter.type)) {
      itemFilter.type = itemFilter.type.join();
    }

    let filteredItems = of(this.items);

    if (itemFilter.type) {
      filteredItems = filteredItems.pipe(
        map(items =>
          items.filter(item => itemFilter.type.includes(item.itemType))
        )
      );
    }

    if (itemFilter.search) {
      filteredItems = filteredItems.pipe(
        map(items =>
          items.filter(item =>
            item.name.match(new RegExp(itemFilter.search, 'i'))
          )
        )
      );
    }

    return filteredItems;
  }

  get isLoading() {
    return this.loading;
  }
}
