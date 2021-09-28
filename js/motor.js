const ingresos = [
    new Ingreso('Cobro-Haberes',4100.00),
    new Ingreso('Venta', 4100.00),
    new Ingreso('Datos',3000.00),
    new Ingreso('ventas por mayor',7000.00)
];

const egresos = [
    new Egreso('Pago Banco', 2000.00),
    new Egreso('Pago alquiler', 2500.00)
];

let cargarMotor = ()=>{
    cargarCabecero();   
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = ()=>{
    let totalingreso = 0;
    for(let iterar of ingresos){
        totalingreso += iterar.obtValor;
    }
    return totalingreso;
}

let totalEgresos = ()=>{
    let totalegreso = 0;
    for(let iterar of egresos){
        totalegreso += iterar.obtValor;
    }
    return totalegreso;
}

let cargarCabecero = ()=>{
    let presupuesto_total = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    
    document.getElementById('porcentajes').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto_total);
    document.getElementById('ingresos_totales').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos_totales').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor)=>{
    return valor.toLocaleString('en-US', {style:'currency' , currency: 'USD', minimumFractionDigits:2});
}

const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('en-US',{style:'percent',minimumFractionDigits:2});
}

const cargarIngresos = ()=>{
    let ingresosHTML = '';
    for(let iterar of ingresos){
        ingresosHTML += crearIngresoHTML(iterar);
    }  
    document.getElementById('listaIngresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (a)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">[${a.obtDescricion}]</div>
    <div class="derecha limpiarEstilos">
    <div class="elemento_valor">+ ${formatoMoneda(a.obtValor)}</div>
    <div class="elemento_eliminar">
    <button class="elemento_eliminar--btn">
    <ion-icon name="backspace" onclick='eliminarIngreso(${a.obtIdIngresos})'></ion-icon>
    </button>
    </div>
    </div>
    </div>
    `;
    return ingresoHTML;   
}

const eliminarIngreso = (id)=>{
    let indiceAeliminar = ingresos.findIndex(iterar=>{iterar.obtIdIngresos === id});
    ingresos.splice(indiceAeliminar,1);
    cargarCabecero();
    cargarIngresos();
}

const cargarEgresos = ()=>{
    let egresosHTML = '';
    for(let iterar of egresos){
        egresosHTML += crearEgresoHTML(iterar);
    }
    document.getElementById('listaEgresos').innerHTML = egresosHTML;
}
const crearEgresoHTML = (a)=>{
    let egresosHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">[${a.obtDescricion}]</div>
    <div class="derecha limpiarEstilos">
    <div class="elemento_valor">- ${formatoMoneda(a.obtValor)}</div>
    <div class="elemento_porcentaje">${formatoPorcentaje(a.obtValor/totalEgresos())}</div>
    <div class="elemento_eliminar">
    <button class="elemento_eliminar--btn">
    <ion-icon name="backspace" onclick='eliminarEgreso(${a.obtIdEgresos})'></ion-icon>
    </button>
    </div>
    </div>
    </div>
    `;
    return egresosHTML;
}

const eliminarEgreso = (id) =>{

    let indiceAeliminar = egresos.findIndex(iterar => iterar.obtIdEgresos === id);
    egresos.splice(indiceAeliminar,1);
    cargarCabecero();
    cargarEgresos();
}

let agregarDato = ()=>{
    let form = document.forms['formulario'];
    let tipo = form['tipo'];
    let descripcion = form['descripcion'];
    let valor = form['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value,Number(valor.value)));
            cargarCabecero();
            cargarIngresos();
        }else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value,Number(valor.value)));
            cargarCabecero();
            cargarEgresos();
        }
    }
}