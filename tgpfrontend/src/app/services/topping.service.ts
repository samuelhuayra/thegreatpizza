import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToppingService {
  private endPoint = environment.endPoint;
  private toppingsPath = '/topping';

  constructor(private http: HttpClient) { }


  getTopping(_id: String): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.http.get(`${this.endPoint}${this.toppingsPath}/getTopping/${_id}`).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getToppings(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.http.get(`${this.endPoint}${this.toppingsPath}/getToppings`).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  addTopping(topping: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.http.post(`${this.endPoint}${this.toppingsPath}/addTopping`, topping).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  editTopping(_id: String, topping: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.http.put(`${this.endPoint}${this.toppingsPath}/editTopping/${_id}`, topping).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  deleteTopping(_id: String): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.http.delete(`${this.endPoint}${this.toppingsPath}/deleteTopping/${_id}`).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

}
