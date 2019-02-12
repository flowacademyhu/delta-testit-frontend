import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubjectModel } from '../models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/subjects');
  }

  getSubject(id: number) {
    return this.httpClient.get('http://localhost:8080/subjects/' + id);
  }

  createSubject(subject: SubjectModel): Observable<any> {
    return this.httpClient.post('http://localhost:8080/subjects', subject);
  }

  editSubject(subject: SubjectModel): Observable<any> {
    return this.httpClient.put('http://localhost:8080/subjects/' + subject.id, subject);
  }

  deleteSubject(id: number) {
    return this.httpClient.delete('http://localhost:8080/subjects/' + id);
  }
}
