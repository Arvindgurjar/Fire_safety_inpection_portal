import React, { useEffect, useState, useRef } from 'react'
import _ from "lodash"
import { MdDelete, MdEdit } from "react-icons/md";
import FormFields from './FormFields';
import { useForm } from "react-hook-form"

const ClientTable = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [pagesize, setpagesize] = useState(2)
  const [seachclient, setsearchclient] = useState("")
  const [clients, setclients] = useState([])
  const [tclients, settclients] = useState([])
  const [totalcliends, settotalclients] = useState()
  const [paginatedclients, setpaginatedclients] = useState([])
  const [currentpage, setcurrentpage] = useState(1)
  const [pages, setpages] = useState([])
  const [sindex, setsindex] = useState()
  const [lindex, setlindex] = useState()
  const [ids, setids] = useState([])
  const [multiselect, setmultiselect] = useState(false)
  const [model, setmodel] = useState(false)
  const [editclient, seteditclient] = useState({
    client_name: "",
    client_email: "",
    client_password: "",
    client_city: "",
    client_state: "",
    client_address: "",
    client_phone: "",
    client_other_info: ""
  })
  const temp = useRef();
  // For Getting A Clients From Backend
  const getClients = async () => {
    try {
      const res = await fetch("api/client/list", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const client = await res.json();
      setclients([...client])
      settclients([...client]);
      setpaginatedclients(_([...client]).slice(0, pagesize).value())
    } catch (error) {
      console.log(error)
    }
  }
  //For Setting a Data In Particular Page
  const paginate = (page) => {
    setcurrentpage(page)
    //console.log(page)
    const startindex = (page - 1) * pagesize
    setpaginatedclients(_(clients).slice(startindex, page * pagesize).value())
    setsindex((page - 1) * pagesize + 1)
    setlindex(page * pagesize < clients.length ? page * pagesize : clients.length)

  }
  //For Setting a Data In Resultant Page
  const resultantClient = () => {
    setlindex(clients.length < (currentpage * pagesize) ? clients.length : (currentpage * pagesize))
    setsindex((currentpage - 1) * pagesize + 1)
    if (clients.length !== 0) {
      const pagecount = clients ? Math.ceil(clients.length / pagesize) : 0;
      const page = _.range(1, pagecount + 1)
      setpages(page)
      setpaginatedclients(_(clients).slice(0, pagesize).value())
      settotalclients(clients.length)
      setcurrentpage(1)
    }
  }

  //Request for deleting one client
  const deleteOne = async (_id) => {
    try {
      const res = await fetch(`api/client/delete/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      if (res.status === 201) { alert("Deleted Successfully"); getClients() }
      else
        alert("Failed Deletion");

    } catch (error) {
      console.log(error)
    }
  }
 /* For set ids for multiple deletion */
  const handleCheck = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setids([...ids, value]);
    } else {
      setids(() => ids.filter((e) => e !== value));
    }
  }
  //for multiple deletion
  const deleteMultiple = async () => {
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      try {
        const res = await fetch("api/client/multidelete", {
          method: "DELETE",
          headers: {
            // Accept:"application/json",
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({ _ids: ids })

        })
        if (res.status === 201) {
          alert("Deleted Successfully")
          getClients()
          setids([])
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  /* set form data into states */

  const setFieldData = (e) => {
    let { name, value } = e.target

    seteditclient({ ...editclient, [name]: value })


  }
  //for edit clients
  const submit = async () => {
    // console.log(editclient)
    const { client_name, client_email, client_password, client_city, client_state, client_address, client_phone, client_other_info } = editclient
    const res = await fetch(`api/client/edit/${editclient._id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        client_name, client_email, client_password, client_city, client_state, client_address, client_phone, client_other_info
      })
    })
    if (res.status === 201) {
      alert(`${editclient.client_name} Data Successfully Updated`)
      setmodel(false)
    }
    else {
      alert("Oh! Please Update User");
    }
  }
  /* For removing dependencied warning */
  temp.current = getClients
  useEffect(() => {

    temp.current()

  }, [props.state, model]);

const temp2 = useRef();
temp2.current = resultantClient;

  useEffect(() => {
    if (seachclient === "") {
      setclients(tclients)
      temp2.current();
    } else {

      let result = tclients.filter((val) => {
        return (val.client_name.toLowerCase().includes(seachclient.toLowerCase()) || val.client_city.toLowerCase().includes(seachclient.toLowerCase()) || val.client_state.toLowerCase().includes(seachclient.toLowerCase()) || val.client_address.toLowerCase().includes(seachclient.toLowerCase()) || val.client_email.toLowerCase().includes(seachclient.toLowerCase()))
      })
      // console.log(result)
      if (result.length === 0) {
        setpaginatedclients([]);
        setsindex(0)
        setlindex(0);
        settotalclients(0);
        setpages([1])
      }
      else {
        setclients(result)
        setcurrentpage(1);
        settotalclients(result.length)
        result.length < 6 && setpagesize(result.length)
      }
    }

  }, [seachclient,tclients])


  const temp1 = useRef()
  temp1.current = resultantClient
  useEffect(() => {
    temp1.current()
  }, [clients, pagesize])
  return (
    <div className="m-3">
      {/* Model box for edit */}
      {model && <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Detail Of {editclient.client_name.toUpperCase()}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { seteditclient([]); setmodel(false) }}></button>
            </div>

            <form className='mx-2' onSubmit={handleSubmit(submit)}>
              <FormFields className="modal-body" client={editclient} errors={errors} register={register} setFieldData={setFieldData} />
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { seteditclient([]); setmodel(false) }} >Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      }
      <div className='d-sm-flex  justify-content-between mx-4' style={{ fontSize: "14px" }}>
        <p >Show <input type="number" value={pagesize} style={{ width: "60px" }} name="pagesize" onChange={(e) => e.target.value <= 0 ? setpagesize(1) : e.target.value < clients.length ? setpagesize(e.target.value) : setpagesize(clients.length)} disabled={paginatedclients.length !== 0 ? false : true} /> entries</p>
        <p>Search: <input type="search" value={seachclient} onChange={(e) => setsearchclient(e.target.value)} /></p>
      </div>
      {ids.length <= 1 ? (multiselect ? <button className='btn btn-danger fw-bold ms-2' onClick={() => { setmultiselect(!multiselect); setids([]) }}>Diselect Multiple</button> : <button className='btn btn-danger fw-bold ms-2' onClick={() => { setmultiselect(!multiselect); setids([]) }}>Select Multiple</button>) : <button className='btn btn-danger fw-bold ms-2' onClick={deleteMultiple}>Delete All</button>}
      <div style={{ minWidth: "100px", height: "100%", overflow: "auto" }}>
        <table className='table table-striped'>
          <thead>
            <tr>
              {multiselect && <th className='text-center'>#</th>}
              <th>Name</th>
              <th>City State</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              paginatedclients.map((client) => {
                if (client != null)
                  return (
                    <tr key={client._id}>
                      {multiselect && <td style={{ height: "100%", verticalAlign: "middle" }}><div className='text-center'><input type="checkbox" value={client._id} checked={client.isChecked} onChange={(e) => handleCheck(e)} /></div></td>}
                      <td style={{ width: "20%", height: "100%", verticalAlign: "middle" }} >{client.client_name}</td>
                      <td style={{ width: "20%", height: "100%", verticalAlign: "middle" }}>{client.client_city}<br />{client.client_state}</td>
                      <td style={{ width: "30%", height: "100%", verticalAlign: "middle" }}>{client.client_address}</td>
                      <td style={{ width: "20%", height: "100%", verticalAlign: "middle" }}>{client.client_email}</td>
                      <td style={{ width: "20%", height: "100%", verticalAlign: "middle" }}>
                        <div className='d-flex' >
                          <div className='mx-1' style={{ height: "20px", width: "20px", backgroundColor: "blue", borderRadius: 2, textAlign: "center", }}><div style={{ color: "white", fontSize: "13px", margin: "auto" }} onClick={() => { seteditclient(client); setmodel(true) }}><MdEdit /></div></div>
                          <div className='mx-1' style={{ height: "20px", width: "20px", backgroundColor: "red", borderRadius: 2, textAlign: "center", }} onClick={() => deleteOne(client._id)}><div style={{ color: "white", fontSize: "13px", margin: "auto" }}><MdDelete /></div></div>
                        </div>
                      </td>
                    </tr>
                  )
                return null
              })
            }
          </tbody>

        </table>
        <div className='d-sm-flex justify-content-between mx-4'>
          <div>Showing {sindex} to {lindex} of {totalcliends} entries</div>
          <nav className='d-flex justify-content-end'>
            <ul className='pagination ' style={{ overflow: "auto", }}>
              <li className={currentpage === 1 ? "page-item disabled" : "page-item"} onClick={() => { setcurrentpage(1 === currentpage ? 1 : currentpage - 1); paginate(1 === currentpage ? 1 : currentpage - 1) }}>
                <p className="page-link">Previous</p>
              </li>
              {
                pages.map((val, index) => {
                  return <li className={val === currentpage ? "page-item active" : "page-item"} key={index}><p className="page-link" onClick={() => { paginate(val) }} >{val}</p></li>
                })
              }


              <li className={currentpage === pages.length ? "page-item disabled" : "page-item"} onClick={() => { setcurrentpage(pages.length === currentpage ? pages.length : currentpage + 1); paginate(pages.length === currentpage ? pages.length : currentpage + 1) }}>
                <p className="page-link" >Next</p>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div >
  )
}

export default ClientTable