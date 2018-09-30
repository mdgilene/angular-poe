import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, Observable, forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { UniqueData } from "../models/UniqueItemData";

export interface ItemFilter {
  type?: string | string[];
  search?: string;
}

@Injectable({
  providedIn: "root"
})
export class ItemService {
  constructor(private $http: HttpClient) {}

  public getUniques(): Observable<UniqueData> {
    return this.$http.get<UniqueData>("http://localhost:4300/item-api/uniques");
  }

  // #region
  /*
  // getItems(): Observable<Item[]> {
  //   if (this.items.length === 0) {
  //     this.fetchItems().subscribe(
  //       items => {
  //         this.loading = false;
  //         this.items = items;
  //         this.error = '';
  //       },
  //       err => {
  //         this.error =
  //           'Could not fetch items from server, please refresh the page and try again.';
  //         this.loading = false;
  //       }
  //     );
  //   }

  //   return of(this.items);
  // }

  // getGems(): Observable<Gem[]> {
  //   if (this.gems.length === 0) {
  //     this.fetchGems().subscribe(
  //       gems => {
  //         this.loading = false;
  //         this.gems = gems;
  //         this.error = '';
  //       },
  //       err => {
  //         this.error =
  //           'Could not fetch gems from server, please refresh the page and try again.';
  //         this.loading = false;
  //       }
  //     );
  //   }

  //   return of(this.gems);
  // }

  // getFilteredItems(itemFilter: ItemFilter): Observable<Item[]> | null {
  //   if (Array.isArray(itemFilter.type)) {
  //     itemFilter.type = itemFilter.type.join();
  //   }

  //   let filteredItems = this.getItems();

  //   if (itemFilter.type) {
  //     filteredItems = filteredItems.pipe(
  //       map(items =>
  //         items.filter(item => itemFilter.type.includes(item.itemType))
  //       )
  //     );
  //   }

  //   if (itemFilter.search) {
  //     filteredItems = filteredItems.pipe(
  //       map(items =>
  //         items.filter(item =>
  //           item.name.match(new RegExp(itemFilter.search, 'i'))
  //         )
  //       )
  //     );
  //   }

  //   return filteredItems;
  // }

  // get isLoading() {
  //   return this.loading;
  // }

  // fetchItems(): Observable<Item[]> {
  //   this.loading = true;

  //   const getArmour = this.$http
  //     .get<ApiRespones>('http://localhost:4300/armour')
  //     .pipe(map(res => res.lines));
  //   const getWeapons = this.$http
  //     .get<ApiRespones>('http://localhost:4300/weapons')
  //     .pipe(map(res => res.lines));
  //   const getAccessories = this.$http
  //     .get<ApiRespones>('http://localhost:4300/accessories')
  //     .pipe(map(res => res.lines));
  //   const getFlasks = this.$http
  //     .get<ApiRespones>('http://localhost:4300/flasks')
  //     .pipe(map(res => res.lines));
  //   const getJewels = this.$http
  //     .get<ApiRespones>('http://localhost:4300/jewels')
  //     .pipe(map(res => res.lines));
  //   const getGems = this.$http
  //     .get<ApiRespones>('http://localhost:4300/gems')
  //     .pipe(map(res => res.lines));

  //   return forkJoin<Item[]>([
  //     getArmour,
  //     getWeapons,
  //     getAccessories,
  //     getFlasks,
  //     getJewels,
  //     getGems
  //   ]).pipe(map(responses => [].concat(...responses)));
  // }

  // fetchGems(): Observable<Gem[]> {
  //   this.loading = true;

  //   const getGems = this.$http
  //     .get<ApiRespones>('http://localhost:4300/gems')
  //     .pipe(map(res => res.lines));

  //   return forkJoin<Gem[]>([getGems]).pipe(
  //     map(responses => [].concat(...responses))
  //   );
  // }
  */
  // #endregion
}
