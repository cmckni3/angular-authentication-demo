import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { catchError as observableCatchError, concatMap, map, tap } from 'rxjs/operators';

import { Config } from './config';

@Injectable()
export class ConfigService {
  private _config: Config;

  constructor(private http: Http) {}

  loadConfiguration(): Observable<Config> {
    return this.http.get('assets/config/env.json').pipe(
      map(res => res.json() as Config),
      tap(config => {
        this._config = config;
      }),
      observableCatchError((error: any) => {
        return Observable.throw(error.json().error || 'Server error');
      })
    );
  }

  getConfig(): Config | null {
    if (!this._config) {
      return null;
    }
    return Object.assign({}, this._config);
  }
}
