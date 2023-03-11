import React, { useEffect, useState } from 'react'
import "../App.css"
import { useForm } from "react-hook-form"
import FormFields from './FormFields'


function AddProduct() {

  const { register, unregister, handleSubmit, formState: { errors } } = useForm()
  const [clients, setclients] = useState([]);
  const [product, setproduct] = useState({
    product_name: "",
    product_extinguisher_type: "",
    product_extinguisher_capacity: "",
    product_manufactured_date: "",
    product_due_date: "",
    product_remarks: "",
    product_client_id: "",
    product_consultant_id: "3456789"
  })
  let name, value
  const setFieldData = (e) => {
    name = e.target.name
    value = e.target.value
    //console.log(value+" "+name)
    setproduct({ ...product,[name]:value })
    //console.log(product)
    unregister(name)
  }
  const submitProductData = async () => {
    //console.log(product)
    const { product_name, product_extinguisher_type, product_extinguisher_capacity, product_manufactured_date, product_due_date, product_remarks, product_client_id, product_consultant_id } = product
    try {
      const res = await fetch("api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_name, product_extinguisher_type, product_extinguisher_capacity, product_manufactured_date, product_due_date, product_remarks, product_client_id, product_consultant_id
        })
      })
      if (res.status === 201) {
        alert("Data Saved Successfully");
        setproduct({
          product_name: "",
          product_extinguisher_type: "",
          product_extinguisher_capacity: "",
          product_manufactured_date: "",
          product_due_date: "",
          product_remarks: "",
          product_client_id: "",
          product_consultant_id: "i876567890"
        })

      }
      else {
        alert("Data Not Saved ");
      }
      return true

    } catch (error) {
      console.log(error)
    }
  }
  const getClients = async () => {
    try {
      const res = await fetch("api/client/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const clients = await res.json();
      setclients([...clients])

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getClients();
  },[])
  //console.log(clients)
  return (
    <div className='m-3'>
      <p style={{ fontSize: 13, fontWeight: 'bolder' }} className="mt-2">Add New Product</p>
      <hr style={{ marginTop: -10 }} />
      <form onSubmit={handleSubmit(submitProductData)} method="POST">
        <label htmlFor="client_select" className='form-label'>Select client</label>
        <select name="product_client_id" id="client_select" className='form-control my-2' onChange={setFieldData} required>
          <option value="" select="true">none</option>
          
          {clients.map((val ,index)=>{
            return (<option value={val._id} key={index}>{val.client_name}</option>)
          })}
        </select>
        <FormFields product={product} setFieldData={setFieldData} errors={errors} register={register} />
        <div style={{ width: "100%", textAlign: "center" }}>
          <button type='submit' className='btn btn-primary my-3' >Save Data</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
