import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ServicoProvider {
  getApiUrl: string = "http://192.168.0.107/WebApiLeilao/";
  //getApiUrl: string = "http://localhost:56251/";
  //getApiUrl: string = "http://localhost:80/";
  data: any;
  constructor(public http: Http) {
    console.log('Hello ServicoProvider Provider');
  }

  //retorna a lista de Leilões aberto para lance

  getLeiloesAgenda() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => 
    {
      this.http.get(this.getApiUrl + 'api/Leilao/Get')
        .map(res => res.json())
        .toPromise()
            .then(data => {
               this.data = data;
               resolve(this.data);
            })
            .catch(err => {
              console.log(err);
            });
    });
  }
}
