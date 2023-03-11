
import React, { useState } from "react";
import { Link } from 'react-router-dom'




export default function Login() {

  const [data, setdata] = useState({
    Email: "",
    Password: ""
  })

  const Change = (e) => {
    let name = e.target.name, value = e.target.value

    setdata({ ...data, [name]: value })
  }


  const onSubmit2 = async (e) => {
    /*  let {Email,Password} = data
       const res = await fetch("/consultants/create",{
          method:"POST",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          credentials:"include",
          body:JSON.stringify({
            Email,Password
          })
        })
        if(res.status===201)
        {
          alert("login Successfully");
        }
       */
    e.preventDefault();

    console.log(data);


  }




  return (


    <div className="App container   p-5" id='container'>
      <div className="container mt-5  p-4" id='content'>
        <form onSubmit={onSubmit2} className='needs-validation'>

          <div>
            <div className="form-outline mb-4 was-validated ">
              <label className="form-label" htmlFor="email">Username or Email address</label>
              <input className="form-control alert alert-primary" type="email" name="Email" value={data.Email} id="email" required onChange={Change}
              /></div>


            <div className='invalid-feedback'>
              Enter your email

            </div>

          </div>

          <pre>
            <div className="form-outline mb-3 was-validated">
              <span className="form-label" htmlFor="form2Example2">Password</span>
              <input className="form-control alert alert-primary" name="Password" value={data.Password} type="text" required onChange={Change}></input> <br />

            </div>
            <div className='invalid-feedback'>
              Enter your email

            </div>
          </pre>


          <div className="row mb-3">
            <div className="col">

              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
              </div>
            </div>
            <div className="col">


              <Link to='/dashboard'><button type="submit" className="btn btn-primary btn-block mb-4 " >Sign in</button></Link>


            </div>
            <a href="/">Forgot password?</a>
          </div>



        </form>
      </div>
    </div>





  );
}




