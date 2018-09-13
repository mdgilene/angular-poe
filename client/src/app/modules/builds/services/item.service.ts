import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items = [];

  constructor(private $http: HttpClient) {}

  getData() {
    this.$http
      .get('http://poe.ninja/api/Data/GetUniqueArmourOverview?league=Delve')
      .subscribe(data => {
        console.log(data);
      });
  }
}
