
import Layout from 'layouts/layout'
import React, {useEffect, useState, useRef} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@mui/material';
import { obtenerproductos, crearProducto, editarProducto, eliminarProducto } from 'utils/api.js';

const Productos = () => {

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [productos, setProductos] = useState([]);
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

    useEffect(() =>{
    if (ejecutarConsulta){
      obtenerproductos(

            (response) => {
              setProductos(response.data)
            },

            (error) => {
              console.error(error);
            }

          );
          setEjecutarConsulta(false);
        }
      },[ejecutarConsulta]);


    useEffect(() =>{
       //obtener lista de productos desde el frontend
       if (mostrarTabla){
        setEjecutarConsulta(true);
       }
    }, [mostrarTabla]);

    return (
    <div className="h-full ml-14">
        <Layout/>
        <div  className="bg-blue-400 flex  items-center pl-4 border-4 border-light-gray-500 border-opacity-50 h-20 " >
             <h2 className="font-bold font-serif text-5xl text-white ">Administracion de Productos</h2>
        </div>
        <button onClick={()=> {setMostrarTabla(!mostrarTabla)}}  type="button" class="btn btn-success m-6 w-40 ">AGREGAR PRODUCTO</button>
        {mostrarTabla ? ( 
        <TablaProductos listaProductos={productos} setEjecutarConsulta={setEjecutarConsulta} />
        ) : ( 
        <FormularioProductos setMostrarTabla={setMostrarTabla} listaProductos={productos} setProductos={setProductos} />

        )}

        <ToastContainer position="bottom-center" autoClose={5000} />
            
    </div>
    );
};

const TablaProductos = ({listaProductos,setEjecutarConsulta}) => {
    const [busqueda, setBusqueda] = useState("");
    const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);

    useEffect(() => {
      console.log('busqueda', busqueda)
      console.log('lista original', listaProductos)
      setProductosFiltrados(
        listaProductos.filter((elemento) => {
          console.log('elemento', elemento)
          return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
        })
      );
    }, [busqueda, listaProductos]);

   
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
                <th scope="col">PRECIO</th>
                <th scope="col">ESTADO</th>
                <th scope="col" className="flex w-full justify-center">ACCIONES</th>
                </tr>
            </thead>
            <tbody>
                {productosFiltrados.map((producto)=>{
                    return ( <FilaProducto  key={nanoid()} producto={producto} setEjecutarConsulta={setEjecutarConsulta}/>
                    )
                })}
            </tbody>
            </table>
    </div>

    )
};


const FilaProducto = ({producto, setEjecutarConsulta}) =>{
    const [edit, setEdit] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [infoNuevaProducto, setInfoNuevaProducto] = useState({
        _id: producto._id,
        producto:producto.producto,
        cantidad:producto.cantidad,
        estado:producto.estado
    })
    const actualizarProducto = async (id) =>{

      await editarProducto (producto._id, 
        {
        producto:infoNuevaProducto.producto,
        cantidad:infoNuevaProducto.cantidad,
        estado:infoNuevaProducto.estado
        }, 
        
        (response) => {
          toast.success("Se actualizo la producto");
          setEdit(false)
          setEjecutarConsulta(true);
        },

        (error) => {
          console.error(error);
          toast.error("Error actualizando la producto");
        }

        )
        // const options = {
        //     method: 'PATCH',
        //     url: 'http://localhost:5000/productos/${id}/',
        //     headers: {'Content-Type': 'application/json'},
        //     data: { ...infoNuevaProducto}
        //   };
          
        //   await axios.request(options).then(function (response) {
        //     console.log(response.data);
        //     toast.success("Se actualizo la producto");
        //     setEdit(false)
        //     setEjecutarConsulta(true);
        //   })
        //   .catch(function (error) {
        //     console.error(error);
        //     toast.error("Error actualizando la producto");
        //   });

    };

    const eliminacionProducto = async (id) =>{

      await eliminarProducto(
        producto._id,

        (response) => {
         console.log(response.data);
         toast.success("Producto eliminada con exito");
         setEjecutarConsulta(true);
        },

        (error) => {
          console.error(error);
          toast.error("Error eliminando producto");
        }
      )
    
       setOpenDialog(false);
    };
    return(
        <tr>
         {edit?(
            
             <>
            <td>{infoNuevaProducto._id}</td>
            <td>
                <input onChange={(e)=> setInfoNuevaProducto({...infoNuevaProducto,producto: e.target.value})} value={infoNuevaProducto.producto} className='bg-gray-50 border border-gray-600 p-1 rounded-lg m-1' type="text" defaultValue={producto.producto}/>
            </td>
             <td>
                <input onChange={(e)=> setInfoNuevaProducto({...infoNuevaProducto,cantidad: e.target.value})} value={infoNuevaProducto.cantidad} className='bg-gray-50 border border-gray-600 p-1 rounded-lg m-1' type="text" defaultValue={producto.cantidad}/>
            </td>
            <td>
                <input onChange={(e)=> setInfoNuevaProducto({...infoNuevaProducto,estado: e.target.value})} value={infoNuevaProducto.estado} className='bg-gray-50 border border-gray-600 p-1 rounded-lg m-1' type="text" defaultValue={producto.estado}/>
            </td>
            </>
         ) : (
         <>
        <td>{producto._id.slice(20)}</td>
        <td>{producto.producto}</td>
        <td>{producto.cantidad}</td>
        <td>{producto.estado}</td>
        </>
        )}
        <td>
            <div className="flex w-full justify-evenly">
                {edit? (
                  <div className="flex w-full justify-evenly">

                <Tooltip title="CONFIRMAR">
                <i 
                onClick={()=> actualizarProducto()} 
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
                    <Tooltip title='Editar producto' arrow>
                    <i 
                    onClick={()=> setEdit(!edit)}
                    className="fas fa-edit text-blue-500 hover:text-blue-800"></i>
                    </Tooltip>

                    <Tooltip title='Eliminar Producto' arrow>
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
                ¿Está seguro de querer eliminar la producto?
              </h1>
              <div className='flex w-full items-center justify-center my-4'>
                <button
                  onClick={() => eliminacionProducto()}
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

const FormularioProductos = ({setMostrarTabla, listaProductos, setProductos}) => {
    const form = useRef(null);
    
    const SubmitForm = async (e) =>{
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevaProducto = {};
        fd.forEach((value, key)=>{
            nuevaProducto[key]=value;
        });

        await crearProducto(
          {
            producto: nuevaProducto.producto, 
            cantidad: nuevaProducto.cantidad, 
            estado: nuevaProducto.estado
          },

          (response) => {
            console.log(response.data);
            toast.success("producto agregada correctamente");
          },

          (error) => {
            console.error(error);
            toast.error("Error al agregar producto");
          }
        );

    setMostrarTabla(true);

    };

    return <div className='flex flex-col items-center justify-center'>

                <form ref={form} onSubmit={SubmitForm} className="flex flex-col ">
                    <h2 className="text 2x1 font-extrabold mb-2">AGREGAR UN PRODUCTO</h2>

        
                    <label className='flex flex-col' htmlFor='producto'>
                    Producto
                    <select
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        name='producto'
                        required
                        defaultValue={''}
                    >
                        <option disabled value={''}>
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
                    Precio Unitario 
                    <input
                    name='cantidad'
                    type="number" 
                    className="bg-gray-50 border-gray-600 p-2 rounded-lg m-2" 
                    min={0}
                    max={1000000}
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
                        defaultValue={''}
                    >
                        <option disabled value={''}>
                        Seleccione una opción
                        </option>
                        <option>Disponible</option>
                        <option>No Disponible</option>
                    </select>
                    </label>

                    <div className="flex-auto">
                    <button type='submit' class="btn btn-primary mt-4 mb-1 ml-60 ">Guardar Producto</button>
                    </div>
                    
                
                </form>
    </div>;
};

export default Productos;
