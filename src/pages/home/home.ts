import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { ServicoProvider } from '../../providers/servico/servico';
import * as moment from 'moment';
import { Leiloes } from '../../Models/Leiloes';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public leiloes: any;
  public ObjLeilao: Leiloes;

  constructor(public navCtrl: NavController,
    public servico: ServicoProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    let loader = this.loadingCtrl.create({
      content: 'Aguarde, Consultando os leilões em aberto.'
    });
    loader.present();

    this.servico.getLeiloesAgenda().then(data => 
    {
      for (var i = 0; i <= data.length - 1; i++) {
        
        // A specific datetime according to a specific timezone ('Africa/Cairo' in this example) other than the default one (UTC as determined above)

        data[i].DataAbertura = moment(data[i].DataAbertura).format('DD/MM/YYYY ') + " às " + moment(data[i].DataAbertura).format('hh:mm');
        this.leiloes = data;
      }

      //      this.leiloes = data;
      loader.dismiss();
    }).catch(err => {
      console.log(err);
      loader.dismiss();
      this.alertCtrl.create({ title: 'Falha na conexão', buttons: [{ text: 'OK' }], subTitle: "Não foi possível obter os leilões abertos. Tente mais tarde." }).present();
    });
  }

  dataAtualFormatada(dataAber): string {
    var data = new Date(dataAber),
      dia = data.getDate().toString(),
      diaF = (dia.length == 1) ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = (mes.length == 1) ? '0' + mes : mes,
      anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
  }

}
