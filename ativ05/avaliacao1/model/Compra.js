const Servidor = require('./Servidor');
const Material = require('./Material');

module.exports = class Compra { 
  constructor() {
	this.urgencia = "";
	this.quantidade = 0;
	this.prazoEntrega = 0;
	this.valorCompra = 0.0;
    this.serv = new Servidor();
	this.mat = new Material();
  }

  calcularValorCompra() {
	this.valorCompra = this.quantidade * this.mat.preco;
  }

  calcularPrazoEntrega() {
	if (this.urgencia == 'Imediata') {
		this.prazoEntrega = 2;
	} else {
		if (this.urgencia == 'Urgente') {
			this.prazoEntrega = 10;
		} else {
			this.prazoEntrega = 30;
		}
	}
  }
 
}