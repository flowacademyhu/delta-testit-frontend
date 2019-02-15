import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupModel } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/groups');
  }

  getGroup(id: number) {
    return this.httpClient.get('http://localhost:8080/groups/' + id);
  }

  createGroup(group: GroupModel): Observable<any> {
    return this.httpClient.post('http://localhost:8080/groups', group);
  }

  editGroup(group: GroupModel): Observable<any> {
    return this.httpClient.put('http://localhost:8080/groups/' + group.id, group);
  }

  deleteGroup(id: number) {
    return this.httpClient.delete('http://localhost:8080/groups/' + id);
  }
}


