class Ingreso extends Dato{

    static contadorIngresos = 0;

    constructor(descripcion,valor){
        super(descripcion,valor);
        this._IdIngresos = ++Ingreso.contadorIngresos;
    }

    get obtIdIngresos(){
        return this._IdIngresos;
    }
}