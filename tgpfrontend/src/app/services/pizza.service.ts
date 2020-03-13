import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  private endPoint = environment.endPoint;
  private pizzasPath = '/pizza';

  constructor(private http: HttpClient) { }

  
  getPizza(_id:String): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.http.get(`${this.endPoint}${this.pizzasPath}/getPizza/${_id}`).subscribe((res:any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getPizzas(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.http.get(`${this.endPoint}${this.pizzasPath}/getPizzas`).subscribe((res:any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  addPizza(pizza:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.http.post(`${this.endPoint}${this.pizzasPath}/addPizza`,pizza).subscribe((res:any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  editPizza(_id:String,pizza:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.http.put(`${this.endPoint}${this.pizzasPath}/editPizza/${_id}`,pizza).subscribe((res:any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  deletePizza(_id:String): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.http.delete(`${this.endPoint}${this.pizzasPath}/deletePizza/${_id}`).subscribe((res:any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
}
