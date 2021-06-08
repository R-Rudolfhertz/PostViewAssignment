import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostDataService {
  constructor(
    private http: HttpClient
  ) { }

  GetAllPosts() {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/posts');
  }

  GetAllPostById(id) {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/posts/' + id + '/comments');
  }
}
