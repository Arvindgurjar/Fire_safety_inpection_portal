import React, { useState } from 'react'
import "../App.css"
import { useForm } from "react-hook-form"

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
    setclient({ ...client, [name]: value })
    unregister(name)
  }
  const submitClientData = (e) => {

    console.log(client)
    return false
  }
  return (
    <div>
      <p style={{ fontSize: 13, fontWeight: 'bolder' }} className="mt-3">Add New Client</p>
      <hr style={{ marginTop: -10 }} />
      <form onSubmit={handleSubmit(submitClientData)} >
        <div className="row mx-3">
          <div className='col-md-6'>
            <div className="mb-3">
              <label htmlFor="client_name" className="form-label">Name:</label>
              <input type="text" className="form-control" id="client_name" name='client_name' value={client.client_name}
                {...register("client_name", {
                  required: "*",
                  pattern: {
                    value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                    message: "*"
                  },
                  minLength: {
                    value: 3,
                    message: "*"
                  },
                  maxLength: {
                    value: 20,
                    message: "*"
                  }
                }

                )} onChange={setFieldData} />
              {errors.client_name && <div className='errors'>{errors.client_name.message}</div>}
            </div>

            <div className="mb-3 col-12 ">
              <label htmlFor="client_email" className="form-label">Email:</label>
              <input type="email" className="form-control" id="client_email" name='client_email' value={client.client_email}

                {...register("client_email", {
                  required: "*",
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "*"
                  }
                }

                )} onChange={setFieldData} />
              {errors.client_email && <div className='errors'>{errors.client_email.message}</div>}
            </div>
            <div className="mb-3 col-12 ">
              <label htmlFor="client_password" className="form-label">Password:</label>
              <input type="password" className="form-control" id="client_password" name='client_password' value={client.client_password}
                {...register("client_password", {
                  required: "*",
                  pattern: {
                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    message: "*"
                  },
                  minLength: {
                    value: 8,
                    message: "*"
                  }
                }

                )} onChange={setFieldData} />
              {errors.client_password && <div className='errors'>{errors.client_password.message}</div>}
            </div>
            <div className="mb-3 col-12 ">
              <label htmlFor="client_city" className="form-label">City:</label>
              <input type="text" className="form-control" id="client_city" name='client_city' value={client.client_city}
                {...register("client_city", {
                  required: "*",
                  pattern: {
                    value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                    message: "*"
                  },
                  minLength: {
                    value: 3,
                    message: "*"
                  },
                  maxLength: {
                    value: 20,
                    message: "*"
                  }
                }

                )} onChange={setFieldData} />
              {errors.client_city && <div className='errors'>{errors.client_city.message}</div>}
            </div>
          </div>
          <div className='col-md-6'>
            <div className="mb-3 col-12 ">
              <label htmlFor="client_state" className="form-label">State:</label>
              <input type="text" className="form-control" id="client_state" name='client_state' value={client.client_state}
                {...register("client_state", {
                  required: "*",
                  pattern: {
                    value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                    message: "*"
                  },
                  minLength: {
                    value: 2,
                    message: "*"
                  },
                  maxLength: {
                    value: 20,
                    message: "*"
                  }
                }

                )} onChange={setFieldData} />
              {errors.client_state && <div className='errors'>{errors.client_state.message}</div>}
            </div>
            <div className="mb-3 col-12 ">
              <label htmlFor="client_address" className="form-label">Address:</label>
              <input type="text" className="form-control" id="client_address" name='client_address' value={client.client_address}
                {...register("client_address", {
                  required: "*",
                  pattern: {
                    value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                    message: "*"
                  },
                  minLength: {
                    value: 8,
                    message: "*"
                  }
                }

                )} onChange={setFieldData} />
              {errors.client_address && <div className='errors'>{errors.client_address.message}</div>}
            </div>
            <div className="mb-3 col-12 ">
              <label htmlFor="client_phone" className="form-label">Phone:</label>
              <input type="text" className="form-control" id="client_phone" name='client_phone' value={client.client_phone}
                {...register("client_phone", {
                  required: "*",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "*"
                  },
                  minLength: {
                    value: 10,
                    message: "*"
                  },
                  maxLength: {
                    value: 10,
                    message: "*"
                  }
                }

                )} onChange={setFieldData} />
              {errors.client_phone && <div className='errors'>{errors.client_phone.message}</div>}
            </div>
            <div className="mb-3 col-12 ">
              <label htmlFor="client_other_info" className="form-label">Other Info:</label>
              <input type="text" className="form-control" id="client_other_info" name='client_other_info' value={client.client_other_info}
                {...register("client_other_info", {
                  required: "*",
                }

                )} onChange={setFieldData} />
              {errors.client_other_info && <div className='errors'>{errors.client_other_info.message}</div>}
            </div>
          </div>
        </div>



        <div style={{ width: "100%", textAlign: "center" }}>
          <button type='submit' className='btn btn-primary my-3' >Save Data</button>
        </div>
      </form>
    </div>
  )
}

export default AddClient
