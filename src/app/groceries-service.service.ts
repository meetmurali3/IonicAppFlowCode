import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GroceriesServiceService {

  constructor(public httpClient: HttpClient) {
    console.log('Hello GroceriesService');
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();  
   }
  items: any= [];
  dataChanged$ : Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;
  baseURL = 'http://afternoon-sierra-93656.herokuapp.com';
   
  
  getItems(): Observable<any> {
    return this.httpClient.get(this.baseURL + '/api/groceries').pipe(
      map(this.extractData), 
      catchError(this.handleError));
  }

  private extractData(res: Response){
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any){
    let errMsg: string;
    if (error instanceof Response){
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  } 
// remove items
removeItem(item) {
  console.log("Remove Item - id = ", item._id);
  this.httpClient.delete(this.baseURL + '/api/groceries/remove/' + item._id).subscribe(res =>{
    this.items = res;
    this.dataChangeSubject.next(true);
  });
}

editItem(item, id) {
  console.log("updating item ", item._id);
  this.httpClient.put(this.baseURL + '/api/groceries/' + item._id, item).subscribe(res => {
    this.items = res;
    this.dataChangeSubject.next(true);
   }
  );
}

addItem(item) {
  this.httpClient.post(this.baseURL + '/api/groceries', item).subscribe(res => {
    this.items = res;
    this.dataChangeSubject.next(true);
   }
  ); 
}
}
