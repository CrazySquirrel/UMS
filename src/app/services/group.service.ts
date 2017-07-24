import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Group} from '../models/group';

@Injectable()
export class GroupService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private groupUrl = 'api/groups';  // URL to web api

  constructor(private http: Http) {
  }

  getGroupes(): Promise<Group[]> {
    return this.http.get(this.groupUrl)
    .toPromise()
    .then(response => response.json().data as Group[])
    .catch(this.handleError);
  }


  getGroup(id: number): Promise<Group> {
    const url = `${this.groupUrl}/${id}`;
    return this.http.get(url)
    .toPromise()
    .then(response => response.json().data as Group)
    .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.groupUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }

  create(group: Group): Promise<Group> {
    return this.http
    .post(this.groupUrl, JSON.stringify(group), {headers: this.headers})
    .toPromise()
    .then(res => res.json().data as Group)
    .catch(this.handleError);
  }

  update(group: Group): Promise<Group> {
    const url = `${this.groupUrl}/${group.id}`;
    return this.http
    .put(url, JSON.stringify(group), {headers: this.headers})
    .toPromise()
    .then(() => group)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
