import { nanoid } from 'nanoid';
import React, { useState, useEffect, useRef } from 'react';
import { crearVenta } from 'utils/api';
import { obtenerproductos } from 'utils/api';
import { obtenerUsuarios } from 'utils/api';
import Layout from 'layouts/layout'



const Ventas = () => {
    const form = useRef(null);
    const [vendedores, setVendedores] = useState([]);
    const [productos, setProductos] = useState([]);
    const [productosTabla, setProductosTabla] = useState([]);
  
    useEffect(() => {
      const fetchVendores = async () => {
        await obtenerUsuarios(
          (response) => {
            setVendedores(response.data);
          },
          (error) => {
            console.error(error);
          }
        );
      };
      const fetchProductos = async () => {
        await obtenerproductos(
          (response) => {
            setProductos(response.data);
          },
          (error) => {
            console.error(error);
          }
        );
      };
  
      fetchVendores();
      fetchProductos();
    }, []);
  
    const submitForm = async (e) => {
      e.preventDefault();
      const fd = new FormData(form.current);
  
      const formData = {};
      fd.forEach((value, key) => {
        formData[key] = value;
      });
  
      console.log('form data', formData);
  
      const listaProductos = Object.keys(formData)
        .map((k) => {
          if (k.includes('producto')) {
            return productosTabla.filter((v) => v._id === formData[k])[0];
          }
          return null;
        })
        .filter((v) => v);
  
      const datosVenta = {
        vendedor: vendedores.filter((v) => v._id === formData.vendedor)[0],
        proporcion: formData.valor,
        productos: listaProductos,
      };
  
      await crearVenta(
        datosVenta,
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    };
  
    return (
       
      <div class='flex h-full w-full items-center justify-center'>
          <Layout/>
        
        <form ref={form} onSubmit={submitForm} className='flex flex-col h-full'>
          <h1 className='text-3xl font-extrabold text-gray-900 my-3'>Crear una nueva venta</h1>
          <label className='flex flex-col' htmlFor='vendedor'>
            <span className='text-2xl font-gray-900'>Vendedor</span>
            <select name='vendedor' className='p-2' defaultValue='' required>
              <option disabled value=''>
                Seleccione un Vendedor
              </option>
              {vendedores.map((el) => {
                return <option key={nanoid()} value={el._id}>{`${el.email}`}</option>;
              })}
            </select>
          </label>
  
          <TablaProductos
            productos={productos}
            setProductos={setProductos}
            setProductosTabla={setProductosTabla}
          />
  
          <label className='flex flex-col'>
            <span className='text-2xl font-gray-900'>Valor Total Venta</span>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='number'
              name='valor'
              required
            />
          </label>
          <button
            type='submit'
            className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
          >
            Crear Venta
          </button>
        </form>
        
      </div>
      
    );
  };
  
  const TablaProductos = ({ productos, setProductos, setProductosTabla }) => {
    const [productoAAgregar, setProductoAAgregar] = useState({});
    const [filasTabla, setFilasTabla] = useState([]);
  
    useEffect(() => {
      setProductosTabla(filasTabla);
    }, [filasTabla, setProductosTabla]);
  
    const agregarNuevoProducto = () => {
      setFilasTabla([...filasTabla, productoAAgregar]);
      setProductos(productos.filter((v) => v._id !== productoAAgregar._id));
      setProductoAAgregar({});
    };
  
    const eliminarProducto = (productoAEliminar) => {
      setFilasTabla(filasTabla.filter((v) => v._id !== productoAEliminar._id));
      setProductos([...productos, productoAEliminar]);
    };
  
    const modificarProducto = (producto, proporcion) => {
      setFilasTabla(
        filasTabla.map((ft) => {
          if (ft._id === producto.id) {
            ft.proporcion = proporcion;
            ft.total = producto.valor * proporcion;
          }
          return ft;
        })
      );
    };
  
    return (
      <div>
        <div className='flex '>
          <label className='flex flex-col' htmlFor='producto'>
            <select
              className='p-2'
              value={productoAAgregar._id ?? ''}
              onChange={(e) =>
                setProductoAAgregar(productos.filter((v) => v._id === e.target.value)[0])
              }
            >
              <option disabled value=''>
                Seleccione un Producto
              </option>
              {productos.map((el) => {
                return (
                  <option
                    key={nanoid()}
                    value={el._id}
                  >{`${el.producto} ${el.cantidad} ${el.estado}`}</option>
                );
              })}
            </select>
          </label>
          <button
            type='button'
            onClick={() => agregarNuevoProducto()}
            className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
          >
            Agregar Venta
          </button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Producto</th>
              <th>precio</th>
              <th>Estado</th>
              <th>Cantidad</th>
              <th>Valor Unitario</th>
              <th>Total</th>
              <th>Eliminar</th>
              <th className='hidden'>Input</th>
            </tr>
          </thead>
          <tbody>
            {filasTabla.map((el, index) => {
              return (
                <FilaProducto
                  key={el._id}
                  veh={el}
                  index={index}
                  eliminarProducto={eliminarProducto}
                  modificarProducto={modificarProducto}
                />
              );
            })}
          </tbody>
        </table>
        
      </div>
    );
  };
  
  const FilaProducto = ({ veh, index, eliminarProducto, modificarProducto }) => {
    const [producto, setProducto] = useState(veh);
    useEffect(() => {
      console.log('veh', producto);
    }, [producto]);
    return (
      <tr>
        <td>{producto._id}</td>
        <td>{producto.producto}</td>
        <td>{producto.cantidad}</td>
        <td>{producto.estado}</td>
        <td>
          <label htmlFor={`valor_${index}`}>
            <input
              type='number'
              name={`proporcion_${index}`}
              value={producto.proporcion}
              onChange={(e) => {
                modificarProducto(producto, e.target.value === '' ? '0' : e.target.value);
                setProducto({
                  ...producto,
                  proporcion: e.target.value === '' ? '0' : e.target.value,
                  total:
                    parseFloat(producto.valor) *
                    parseFloat(e.target.value === '' ? '0' : e.target.value),
                });
              }}
            />
          </label>
        </td>
        <td>{producto.valor}</td>
        <td>{parseFloat(producto.total ?? 0)}</td>
        <td>
          <i
            onClick={() => eliminarProducto(producto)}
            className='fas fa-minus text-red-500 cursor-pointer'
          />
        </td>
        <td className='hidden'>
          <input hidden defaultValue={producto._id} name={`producto_${index}`} />
        </td>
      </tr>
    );
  };
  
  export default Ventas;
