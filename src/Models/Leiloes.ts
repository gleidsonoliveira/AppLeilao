import { DateTime } from "ionic-angular";
export class Leiloes 
{
    // LeilaoId: number;
    // DataAbertura:DateTime;
    // DataFechamento:DateTime;
    // Titulo:string;

    constructor(public LeilaoId: string, 
        public DataAbertura: DateTime, 
        public DataFechamento: DateTime, 
        public Titulo: string) { }
}