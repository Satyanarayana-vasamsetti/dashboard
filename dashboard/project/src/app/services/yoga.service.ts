import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Yoga } from '../models/yoga';

@Injectable({
  providedIn: 'root'
})
export class YogaService {
  private baseurl = "https://sheetdb.io/api/v1/8lpw61hymb2pv";
  constructor(private http:HttpClient) { }
  
  getAll():Observable<any[]>{
    return this.http.get<any[]>(`${this.baseurl}`);
  }
  add(record : Yoga):Observable<any>{
    return this.http.post<any>(`${this.baseurl}`,record);
  }
  getById(id:number):Observable<any>{
    return this.http.get<any>(`${this.baseurl}/search?id=${id}`);
  }
  getByEmail(email:string):Observable<any>{
    return this.http.get<any>(`${this.baseurl}/search?email=${email}`);
  }
  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${this.baseurl}/id=${id}`);
  }
  update(id:number,record:Yoga):Observable<any>{
    return this.http.put<any>(`${this.baseurl}/id/${id}`,record);
  }
}
