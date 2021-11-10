
import Layout from 'layouts/layout'
import React, {useEffect, useState, useRef} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import axios from "axios";
import { Dialog, Tooltip } from '@material-ui/core';



const Ventas = () => {

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [ventas, setVentas] = useState([]);
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

    useEffect(() =>{
      const obtenerVentas = async () => {
       
        const options = {method: 'GET', url: 'http://localhost:5000/ventas'};

        await axios.request(options).then(function (response) {
        setVentas(response.data)
        setEjecutarConsulta(false);
        })
        .catch(function (error) {
        console.error(error);
        });
    };
    if (ejecutarConsulta){
          obtenerVentas();
          setEjecutarConsulta(false);
        }
      },[ejecutarConsulta]);
    useEffect(() =>{
       //obtener lista de ventas desde el frontend
       if (mostrarTabla){
        setEjecutarConsulta(true);
       }
    }, [mostrarTabla]);

    return (
    <div className="h-full ml-14">
        <Layout/>
        <div  className="bg-blue-400 flex  items-center pl-4 border-4 border-light-gray-500 border-opacity-50 h-20 " >
             <h2 className="font-bold font-serif text-5xl text-white ">Administracion de Ventas</h2>
        </div>
        <button onClick={()=> {setMostrarTabla(!mostrarTabla)}}  type="button" class="btn btn-success m-6 ">AGREGAR VENTA</button>
        {mostrarTabla ? ( 
        <TablaVentas listaVentas={ventas} setEjecutarConsulta={setEjecutarConsulta} />
        ) : ( 
        <FormularioVentas setMostrarTabla={setMostrarTabla} listaVentas={ventas} setVentas={setVentas} />

        )}

        <ToastContainer position="bottom-center" autoClose={5000}/>
            
    </div>
    );
};

const TablaVentas = ({listaVentas, setEjecutarConsulta}) => {

    const form = useRef(null);

    useEffect(() =>{
        console.log("este es el listado de las ventas", listaVentas)
    }, [listaVentas]);

   
    return <div>
            <table class="table">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">PRODUCTO</th>
                <th scope="col">CANTIDAD</th>
                <th scope="col">ESTADO</th>
                <th scope="col">ACCIONES</th>
                </tr>
            </thead>
            <tbody>
                {listaVentas.map((venta)=>{
                    return ( <FilaVenta  key={nanoid()} venta={venta} setEjecutarConsulta={setEjecutarConsulta}/>
                    )
                })};
               
            </tbody>
            </table>
    </div>
};

const FilaVenta = ({venta, setEjecutarConsulta}) =>{
    const [edit, setEdit] = useState(false);
    const [infoNuevaVenta, setInfoNuevaVenta] = useState({
        producto:venta.producto,
        cantidad:venta.cantidad,
        estado:venta.estado
    })
    const actualizarVenta = async (id) =>{
        const options = {
            method: 'PATCH',
            url: 'http://localhost:5000/ventas/${id}/',
            headers: {'Content-Type': 'application/json'},
            data: { ...infoNuevaVenta}
          };
          
          await axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success("Se actualizo la venta");
            setEdit(false)
            setEjecutarConsulta(true);
          })
          .catch(function (error) {
            console.error(error);
            toast.error("Error actualizando la venta");
          });

    };

    const eliminarVenta = async () =>{
    const options = {method: 'DELETE', url: 'http://localhost:5000/ventas/6188083b800dd4a853ee3c70'};

      await axios.request(options).then(function (response) {
        console.log(response.data);
        toast.success("Venta eliminada con exito");
        setEjecutarConsulta(true);
      }).catch(function (error) {
        console.error(error);
        toast.error("Error eliminando venta");
      });

    };
    return(
        <tr>
         {edit?(
            
             <>
             <td>
                <input className='bg-gray-300 border border-gray-600 p-1 rounded-lg m-1'  disabled type="text" defaultValue="ID"/>
            </td>
            <td>
                <input onChange={(e)=> setInfoNuevaVenta({...infoNuevaVenta,producto: e.target.value})} value={infoNuevaVenta.producto} className='bg-gray-50 border border-gray-600 p-1 rounded-lg m-1' type="text" defaultValue={venta.producto}/>
            </td>
             <td>
                <input onChange={(e)=> setInfoNuevaVenta({...infoNuevaVenta,cantidad: e.target.value})} value={infoNuevaVenta.cantidad} className='bg-gray-50 border border-gray-600 p-1 rounded-lg m-1' type="text" defaultValue={venta.cantidad}/>
            </td>
            <td>
                <input onChange={(e)=> setInfoNuevaVenta({...infoNuevaVenta,estado: e.target.value})} value={infoNuevaVenta.estado} className='bg-gray-50 border border-gray-600 p-1 rounded-lg m-1' type="text" defaultValue={venta.estado}/>
            </td>
            </>
         ) : (
         <>
        <th>ID</th>
        <td>{venta.producto}</td>
        <td>{venta.cantidad}</td>
        <td>{venta.estado}</td>
        </>
        )}
        <td>
            <div className="flex w-full justify-evenly">
                {edit? (

                    <>
                    <Tooltip title='Confirmar Edición' arrow>
                    <i onClick={()=> actualizarVenta()} class="fas fa-check-circle text-green-600 hover:text-green-900"/>
                    </Tooltip>

                    <Tooltip title='Cancelar edición' arrow>
                    <i onClick={() => setEdit(!edit)} className='fas fa-ban text-yellow-700 hover:text-yellow-500'/>
                    </Tooltip>
                    </>
                
                
                ) : (

                <>

                <Tooltip title='Editar venta' arrow>
                <i onClick={()=> setEdit(!edit)}class="fas fa-edit text-blue-500 hover:text-blue-800"></i>
                </Tooltip>

                <Tooltip title='Eliminar venta' arrow>
                <i onClick={()=> eliminarVenta()} class="fas fa-trash text-red-500 hover:text-red-700"></i>
                </Tooltip>

                </>

                )};

            </div>

            

        </td>
        </tr>
        
    );
};

const FormularioVentas = ({setMostrarTabla, listaVentas, setVentas}) => {
    const form = useRef(null);
    
    const SubmitForm = async (e) =>{
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevaVenta = {};
        fd.forEach((value, key)=>{
            nuevaVenta[key]=value;
        });

        const options = {
            method: 'POST',
            url: 'http://localhost:5000/ventas',
            headers: {'Content-Type': 'application/json'},
            data: {producto: nuevaVenta.producto, cantidad: nuevaVenta.cantidad, estado: nuevaVenta.estado},
          };
          
          await axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success("venta agregada correctamente");
          })
          .catch(function (error) {
            console.error(error);
            toast.error("Error al agregar venta");
          });

    setMostrarTabla(true);

    };

    return <div className='flex flex-col items-center justify-center'>

                <form ref={form} onSubmit={SubmitForm} className="flex flex-col ">
                    <h2 className="text 2x1 font-extrabold mb-2">AGREGAR UNA VENTA</h2>

        
                    <label className='flex flex-col' htmlFor='producto'>
                    Producto
                    <select
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        name='producto'
                        required
                        defaultValue={0}
                    >
                        <option disabled value={0}>
                        Seleccione una opción
                        </option>
                        <option>NETFLIX</option>
                        <option>HBO</option>
                        <option>DISNEY plus</option>
                        <option>AMAZON PRIME</option>
                        <option>CLARO VIDEO</option>
                    </select>
                    </label>
            

                    <label  className="flex flex-col" htmlFor='cantidad'>
                    Meses de suscripcion 
                    <input
                    name='cantidad'
                    type="number" 
                    className="bg-gray-50 border-gray-600 p-2 rounded-lg m-2" 
                    min={0}
                    max={100}
                    placeholder="ingrese la cantidad"
                    required
                    />
                    </label>

                    <label className='flex flex-col' htmlFor='estado'>
                    Estado
                    <select
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        name='estado'
                        required
                        defaultValue={0}
                    >
                        <option disabled value={0}>
                        Seleccione una opción
                        </option>
                        <option>Activo</option>
                        <option>Cancelado</option>
                    </select>
                    </label>

                    <div className="flex-auto">
                    <button type='submit' class="btn btn-primary mt-4 mb-1 ml-60 ">Guardar Venta</button>
                    </div>
                    
                
                </form>
    </div>;
};

export default Ventas;
