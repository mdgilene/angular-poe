import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { filter } from 'lodash';
import { Gem, GemFilter } from '../models/Gem';

@Injectable({
  providedIn: 'root'
})
export class GemServiceService {
  loading = false;
  _gems: Gem[];

  constructor(private $http: HttpClient) {}

  private get gems(): Observable<Gem[]> {
    if (!this._gems) {
      this.loading = true;
      const request = this.$http.get<Gem[]>(
        'http://localhost:4300/item-api/gems'
      );
      request.subscribe(gems => {
        this._gems = gems;
        this.loading = false;
      });
      return request;
    }
    return of(this._gems);
  }

  public filter(gemFilter: GemFilter): Observable<Gem[]> {
    return this.gems.pipe(map(gems => this.filterGems(gems, gemFilter)));
  }

  private filterGems(gems: Gem[], gemFilter: GemFilter): Gem[] {
    const { name, partial } = gemFilter;

    // Generic exact match filters
    const filteredGems: Gem[] = filter(gems, partial) as Gem[];

    // Apply RegExp filters
    return filteredGems.filter((gem: Gem) =>
      // Name
      gem.active_skill.display_name.match(new RegExp(name, 'gi'))
    );
  }
}
