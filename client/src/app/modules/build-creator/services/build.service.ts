import { Injectable } from '@angular/core';
import { Build } from '../models/build';

@Injectable()
export class BuildService {
  private builds: { [id: string]: Build };

  constructor() {}

  addBuild(build: Build): boolean {
    if (!this.builds[build.name]) {
      this.builds[build.name] = build;
      return true;
    }
    return false;
  }

  listBuilds(): Build[] {
    return Object.values(this.builds);
  }
}
