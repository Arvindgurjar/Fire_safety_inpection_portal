import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit'
import { useIsAuthenticated } from 'react-auth-kit';
const Login = () => {
  const isAuthenticated = useIsAuthenticated()
  const signIn = useSignIn()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [showpass, setShowPass] = useState(false)
  const [logindetail, setLoginDetail] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  const fieldChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    setLoginDetail({ ...logindetail, [name]: value });
  }
  const showPassword = () => {
    setShowPass(!showpass);
  }
  const submit = async () => {
    const { email, password } = logindetail
    try {
      const res = await fetch("api/adminlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, password
        })
      })
      const token = await res.json()
      if (res.status === 200) {
        if (signIn(
          {
            token: token,
            expiresIn: (10 * 365 * 24 * 60 * 60),
            tokenType: "Bearer",
            authState: { email: email, password: password }
          }
        )) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }

      }

    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard")
    }
    else {
      navigate("/")
    }
  }, [])
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-md-6 col-lg-4 bg-white p-4" style={{ border: "2px solid gray" }}>
            <form onSubmit={handleSubmit(submit)}>
              <div>
                <label htmlFor="email" className='form-label'>Email Address</label>
                <input type="text" name="email" id="email" value={logindetail.email} className='form-control' {...register("email", {
                  required: "*",
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "*"
                  }
                })} onChange={fieldChange} />
                {errors.email && <div className='errors'>{errors.email.message}</div>}
              </div>
              <div className='mt-3'>
                <label htmlFor="password" className='form-label'>Password</label>
                <input type={showpass ? "text" : "password"} name="password" id="password" value={logindetail.password} className='form-control' {...register("password", {
                  required: "*",
                  pattern: {
                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    message: "*"
                  },
                  minLength: {
                    value: 8,
                    message: "*"
                  }
                })} onChange={fieldChange} />
                <div style={{ float: 'right', marginTop: "-33px", marginRight: "20px", cursor: 'pointer' }} onClick={showPassword}>{!showpass ? <AiFillEyeInvisible /> : <AiFillEye />}</div>
                {errors.password && <div className='errors' style={{ marginTop: "-38px" }}>{errors.password.message}</div>}

              </div>
              <button type="submit" className='btn btn-primary mt-3' style={{ float: "right" }}>Log In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login