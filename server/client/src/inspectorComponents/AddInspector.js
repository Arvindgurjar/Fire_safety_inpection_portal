import React, { useState } from 'react'
import "../App.css"
import { useForm } from "react-hook-form"
import FormFields from './FormFields'


function AddInspector() {

  const { register, unregister, handleSubmit, formState: { errors } } = useForm()
  const [inspector, setinspector] = useState({
    inspector_name: "",
    inspector_email: "",
    inspector_password: "",
    inspector_city: "",
    inspector_state: "",
    inspector_address: "",
    inspector_phone: "",
    inspector_other_info: "",
    inspector_consultant_id: "1234567890",
  })
  let name, value
  const setFieldData = (e) => {
    name = e.target.name
    value = e.target.value
   // console.log(value)
    setinspector({ ...inspector, [name]: value })
    unregister(name)
  }
  const submitInspectorData = async () => {
    const { inspector_name, inspector_email, inspector_password, inspector_city, inspector_state, inspector_address, inspector_phone, inspector_other_info, inspector_consultant_id } = inspector
    try {
      const res = await fetch("api/inspector/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inspector_name, inspector_email, inspector_password, inspector_city, inspector_state, inspector_address, inspector_phone, inspector_other_info, inspector_consultant_id
        })
      })
      if (res.status === 201) {
        alert("Data Saved Successfully");
        setinspector({
          inspector_name: "",
          inspector_email: "",
          inspector_password: "",
          inspector_city: "",
          inspector_state: "",
          inspector_address: "",
          inspector_phone: "",
          inspector_other_info: "",
          inspector_consultant_id: ""
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
      <p style={{ fontSize: 13, fontWeight: 'bolder' }} className="mt-2">Add New inspector</p>
      <hr style={{ marginTop: -10 }} />
      <form onSubmit={handleSubmit(submitInspectorData)} method="POST">
        <FormFields inspector={inspector} setFieldData={setFieldData} errors={errors} register={register} />
        <div style={{ width: "100%", textAlign: "center" }}>
          <button type='submit' className='btn btn-primary my-3' >Save Data</button>
        </div>
      </form>
    </div>
  )
}

export default AddInspector
