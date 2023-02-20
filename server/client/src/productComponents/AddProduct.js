import React, { useState } from 'react'
import "../App.css"
import { useForm } from "react-hook-form"
import FormFields from './FormFields'


function AddProduct() {

  const { register, unregister, handleSubmit, formState: { errors } } = useForm()
  const [product, setproduct] = useState({
    product_name:"",
    product_extinguisher_type:"",
    product_extinguisher_capacity:"",
    product_manufactured_date:"",
    product_due_date:"",
    product_remarks:"",
    product_client_id:"oiuytr5678",
    product_consultant_id:"3456789"
  })
  let name, value
  const setFieldData = (e) => {
    name = e.target.name
    value = e.target.value
    //console.log(value)
    setproduct({ ...product, [name]: value })
    unregister(name)
  }
  const submitProductData = async () => {
    //console.log(product)
    const { product_name,product_extinguisher_type,product_extinguisher_capacity,product_manufactured_date,product_due_date,product_remarks,product_client_id,product_consultant_id } = product
    try {
      const res = await fetch("api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_name,product_extinguisher_type,product_extinguisher_capacity,product_manufactured_date,product_due_date,product_remarks,product_client_id,product_consultant_id
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
          product_client_id: "456787654",
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
  return (
    <div className='m-3'>
      <p style={{ fontSize: 13, fontWeight: 'bolder' }} className="mt-2">Add New Product</p>
      <hr style={{ marginTop: -10 }} />
      <form onSubmit={handleSubmit(submitProductData)} method="POST">
        <FormFields product={product} setFieldData={setFieldData} errors={errors} register={register} />
        <div style={{ width: "100%", textAlign: "center" }}>
          <button type='submit' className='btn btn-primary my-3' >Save Data</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
