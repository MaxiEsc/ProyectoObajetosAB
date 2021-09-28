class Egreso extends Dato{

    static contadorEgresos = 0;

    constructor(descripcion,valor){
        super(descripcion,valor);
        this._IdEgresos = ++Egreso.contadorEgresos;
    }

    get obtIdEgresos(){
        return this._IdEgresos;
    }
}