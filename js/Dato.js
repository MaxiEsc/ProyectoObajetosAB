class Dato{
    constructor(descripcion , valor){
        this._descripcion = descripcion;
        this._valor = valor;
    }

    get obtDescricion(){
        return this._descripcion
    }
    set camDescripcion(descripcion){
        this._descripcion = descripcion
    }

    get obtValor(){
        return this._valor
    }
    set camValor(valor){
        this._valor = valor
    }
}