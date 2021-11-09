import React from 'react';



function Ventas (){


const ventas = [
    {
        producto:"netflix",
        cantidad:1,
        estado:"activo"
    },
    {
        producto:"netflix",
        cantidad:4,
        estado:"cancelado"
    },
    {
        producto:"HBO",
        cantidad:2,
        estado:"activo"
    },
    {
        producto:"Dysney +",
        cantidad:5,
        estado:"activo"
    },
    {
        producto:"Amazon prime",
        cantidad:1,
        estado:"activo"
    },

]

const Ventas = () => {

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [ventas, setVentas] = useState([]);

    useEffect(() =>{
        //obtener lista de ventas desde el frontend
        
    }, []);

    return (
    <div className="h-full ml-14">
        <Layout/>
        <div  className="bg-blue-400 flex  items-center pl-4 border-4 border-light-gray-500 border-opacity-50 h-20 " >
             <h2 className="font-bold font-serif text-5xl text-white ">Administracion de Ventas</h2>
        </div>
        <button onClick={()=> {setMostrarTabla(!mostrarTabla)}}  type="button" class="btn btn-success m-6 ">AGREGAR VENTA</button>
        {mostrarTabla ? <TablaVentas listaVentas={ventas} /> : <FormularioVentas />}

        
    </div>


    );
} 


export default Ventas;