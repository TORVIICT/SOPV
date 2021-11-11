
import Layout from 'layouts/layout'
import React, {useEffect, useState, useRef} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@mui/material';
import { obtenerventas, crearVenta, editarVenta, eliminarVenta } from 'utils/api.js';

const Ventas = () => {

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [ventas, setVentas] = useState([]);
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

    useEffect(() =>{
    if (ejecutarConsulta){
      obtenerventas(

            (response) => {
              setVentas(response.data)
            },

            (error) => {
              console.error(error);
            }

          );
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
        <button onClick={()=> {setMostrarTabla(!mostrarTabla)}}  type="button" class="btn btn-success m-6 w-40 ">AGREGAR VENTA</button>
        {mostrarTabla ? ( 
        <TablaVentas listaVentas={ventas} setEjecutarConsulta={setEjecutarConsulta} />
        ) : ( 
        <FormularioVentas setMostrarTabla={setMostrarTabla} listaVentas={ventas} setVentas={setVentas} />

        )}

        <ToastContainer position="bottom-center" autoClose={5000} />
            
    </div>
    );
};

const TablaVentas = ({listaVentas,setEjecutarConsulta}) => {
    const [busqueda, setBusqueda] = useState("");
    const [ventasFiltrados, setVentasFiltrados] = useState(listaVentas);

    useEffect(() => {
      console.log('busqueda', busqueda)
      console.log('lista original', listaVentas)
      setVentasFiltrados(
        listaVentas.filter((elemento) => {
          console.log('elemento', elemento)
          return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
        })
      );
    }, [busqueda, listaVentas]);

   
    return (<div>
      <div className=" absolute right-56 top-44">
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder='Buscar'
        className=' border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500'
      />
     </div> 
            <table class="table">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">PRODUCTO</th>
                <th scope="col">CANTIDAD</th>
                <th scope="col">ESTADO</th>
                <th scope="col" className="flex w-full justify-center">ACCIONES</th>
                </tr>
            </thead>
            <tbody>
                {ventasFiltrados.map((venta)=>{
                    return ( <FilaVenta  key={nanoid()} venta={venta} setEjecutarConsulta={setEjecutarConsulta}/>
                    )
                })}
            </tbody>
            </table>
    </div>

    )
};


const FilaVenta = ({venta, setEjecutarConsulta}) =>{
    const [edit, setEdit] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [infoNuevaVenta, setInfoNuevaVenta] = useState({
        _id: venta._id,
        producto:venta.producto,
        cantidad:venta.cantidad,
        estado:venta.estado
    })
    const actualizarVenta = async (id) =>{

      await editarVenta (venta._id, 
        {
        producto:infoNuevaVenta.producto,
        cantidad:infoNuevaVenta.cantidad,
        estado:infoNuevaVenta.estado
        }, 
        
        (response) => {
          toast.success("Se actualizo la venta");
          setEdit(false)
          setEjecutarConsulta(true);
        },

        (error) => {
          console.error(error);
          toast.error("Error actualizando la venta");
        }

        )
        // const options = {
        //     method: 'PATCH',
        //     url: 'http://localhost:5000/ventas/${id}/',
        //     headers: {'Content-Type': 'application/json'},
        //     data: { ...infoNuevaVenta}
        //   };
          
        //   await axios.request(options).then(function (response) {
        //     console.log(response.data);
        //     toast.success("Se actualizo la venta");
        //     setEdit(false)
        //     setEjecutarConsulta(true);
        //   })
        //   .catch(function (error) {
        //     console.error(error);
        //     toast.error("Error actualizando la venta");
        //   });

    };

    const eliminacionVenta = async (id) =>{

      await eliminarVenta(
        venta._id,

        (response) => {
         console.log(response.data);
         toast.success("Venta eliminada con exito");
         setEjecutarConsulta(true);
        },

        (error) => {
          console.error(error);
          toast.error("Error eliminando venta");
        }
      )
    
       setOpenDialog(false);
    };
    return(
        <tr>
         {edit?(
            
             <>
            <td>{infoNuevaVenta._id}</td>
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
        <td>{venta._id.slice(20)}</td>
        <td>{venta.producto}</td>
        <td>{venta.cantidad}</td>
        <td>{venta.estado}</td>
        </>
        )}
        <td>
            <div className="flex w-full justify-evenly">
                {edit? (
                  <div className="flex w-full justify-evenly">

                <Tooltip title="CONFIRMAR">
                <i 
                onClick={()=> actualizarVenta()} 
                className="fas fa-check-circle text-green-600 hover:text-green-900"
                />
                </Tooltip>

                <Tooltip title='CANCELAR' arrow>
                <i 
                onClick={() => setEdit(!edit)} 
                className='fas fa-ban text-yellow-700 hover:text-yellow-500'
                />
                </Tooltip>
            
                </div>
                
                ) : (
                  
              
                <div className="flex w-full justify-evenly">
                    <Tooltip title='Editar venta' arrow>
                    <i 
                    onClick={()=> setEdit(!edit)}
                    className="fas fa-edit text-blue-500 hover:text-blue-800"></i>
                    </Tooltip>

                    <Tooltip title='Eliminar Venta' arrow>
                  <i
                    onClick={() => setOpenDialog(true)}
                    className='fas fa-trash text-red-700 hover:text-red-500'
                  />
                </Tooltip>
              </div>
            )}
          </div>

          <Dialog open={openDialog}>
            <div className='p-8 flex flex-col'>
              <h1 className='text-gray-900 text-2xl font-bold'>
                ¿Está seguro de querer eliminar la venta?
              </h1>
              <div className='flex w-full items-center justify-center my-4'>
                <button
                  onClick={() => eliminacionVenta()}
                  className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
                >
                  Sí
                </button>
                <button
                  onClick={() => setOpenDialog(false)}
                  className='mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
                >
                  No
                </button>
              </div>
            </div>
          </Dialog>
          
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

        await crearVenta(
          {
            producto: nuevaVenta.producto, 
            cantidad: nuevaVenta.cantidad, 
            estado: nuevaVenta.estado
          },

          (response) => {
            console.log(response.data);
            toast.success("venta agregada correctamente");
          },

          (error) => {
            console.error(error);
            toast.error("Error al agregar venta");
          }
        );

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
