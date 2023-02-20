import React, { useState } from 'react'
import "../App.css"
import { useForm } from "react-hook-form"
import FormFields from './FormFields'


function AddClient() {

  const { register, unregister, handleSubmit, formState: { errors } } = useForm()
  const [client, setclient] = useState({
    client_name: "",
    client_email: "",
    client_password: "",
    client_city: "",
    client_state: "",
    client_address: "",
    client_phone: "",
    client_other_info: "",
    client_consultant_id: "1234567890",
  })
  let name, value
  const setFieldData = (e) => {
    name = e.target.name
    value = e.target.value
    //console.log(value)
    setclient({ ...client, [name]: value })
    unregister(name)
  }
  const submitClientData = async () => {
    const { client_name, client_email, client_password, client_city, client_state, client_address, client_phone, client_other_info, client_consultant_id } = client
    try {
      const res = await fetch("api/client/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_name, client_email, client_password, client_city, client_state, client_address, client_phone, client_other_info, client_consultant_id
        })
      })
      if (res.status === 201) {
        alert("Data Saved Successfully");
        setclient({
          client_name: "",
          client_email: "",
          client_password: "",
          client_city: "",
          client_state: "",
          client_address: "",
          client_phone: "",
          client_other_info: "",
          client_consultant_id: "1234567890",
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
      <p style={{ fontSize: 13, fontWeight: 'bolder' }} className="mt-2">Add New Client</p>
      <hr style={{ marginTop: -10 }} />
      <form onSubmit={handleSubmit(submitClientData)} method="POST">
        <FormFields client={client} setFieldData={setFieldData} errors={errors} register={register} />
        <div style={{ width: "100%", textAlign: "center" }}>
          <button type='submit' className='btn btn-primary my-3' >Save Data</button>
        </div>
      </form>
    </div>
  )
}

export default AddClient
