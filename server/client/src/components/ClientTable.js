import React, { useEffect, useState } from 'react'
import _ from "lodash"
import { MdDelete, MdEdit } from "react-icons/md";
const ClientTable = () => {

  const [pagesize, setpagesize] = useState(6)
  const [seachclient, setsearchclient] = useState("")
  const [clients, setclients] = useState([])
  const [tclients, settclients] = useState([])
  const [totalcliends, settotalclients] = useState()
  const [paginatedclients, setpaginatedclients] = useState([])
  const [currentpage, setcurrentpage] = useState(1)
  const [pages, setpages] = useState([])
  const [sindex, setsindex] = useState()
  const [lindex, setlindex] = useState()

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
  const paginate = (page) => {
    setcurrentpage(page)
    //console.log(page)
    const startindex = (page - 1) * pagesize
    setpaginatedclients(_(clients).slice(startindex, page * pagesize).value())
    setsindex((page - 1) * pagesize + 1)
    setlindex(page * pagesize)

  }

  const resultantClient = () => {
    if (clients.length !== 0) {
      const pagecount = clients ? Math.ceil(clients.length / pagesize) : 0;
      const page = _.range(1, pagecount + 1)
      setpages(page)
      setpaginatedclients(_(clients).slice(0, pagesize).value())
      settotalclients(clients.length)
      setcurrentpage(1)
    }

  }
  const deleteOne = async(_id)=>{
    try {
      const res = await fetch(`api/client/delete/${_id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include"
      })
      if(res.status===201)
      {alert("Deleted Successfully");getClients()}
      else
      alert("Failed Deletion");
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    getClients()

  },[])


  useEffect(() => {
    if (seachclient === "") {
      setclients(tclients)
    } else {

      let result = tclients.filter((val) => {
        return (val.client_name.toLowerCase().includes(seachclient.toLowerCase()) || val.client_city.toLowerCase().includes(seachclient.toLowerCase()) || val.client_state.toLowerCase().includes(seachclient.toLowerCase()) || val.client_address.toLowerCase().includes(seachclient.toLowerCase()) || val.client_email.toLowerCase().includes(seachclient.toLowerCase()))
      })
      if (result.length !== 0) {
        setclients(result)
        setcurrentpage(1);
        result.length < 6 && setpagesize(result.length)
      }
      else {
        setpaginatedclients(result);
        setsindex(0)
        setlindex(0);
        settotalclients(0);
        setpagesize(1)
      }
    }

  }, [seachclient,tclients])

  useEffect(() => {
    
    setlindex(clients.length < (currentpage * pagesize) ? clients.length : (currentpage * pagesize))
    setsindex((currentpage - 1) * pagesize + 1)
    resultantClient();
  }, [pagesize,clients])
  return (
    <>

      <div className='d-sm-flex  justify-content-between mx-4' style={{ fontSize: "14px" }}>
        <p >Show <input type="number" value={pagesize} style={{ width: "60px" }} name="pagesize" onChange={(e) => e.target.value <= 0 ? setpagesize(1) : e.target.value < clients.length ? setpagesize(e.target.value) : setpagesize(clients.length)} /> entries</p>
        <p>Search: <input type="search" value={seachclient} onChange={(e) => setsearchclient(e.target.value)} /></p>
      </div>
      <div style={{ minWidth: "100px", height: "100%", overflow: "auto" }}>
        <table className='table table-striped'>
          <thead>
            <tr>
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
                      <td>{client.client_name}</td>
                      <td>{client.client_city}<br />{client.client_state}</td>
                      <td>{client.client_address}</td>
                      <td>{client.client_email}</td>
                      <td>
                        <div className='d-flex'>
                          <div className='mx-1' style={{ height: "20px", width: "20px", backgroundColor: "blue", borderRadius: 2, textAlign: "center", }}><div style={{ color: "white", fontSize: "13px", margin: "auto" }}><MdEdit /></div></div>
                          <div className='mx-1' style={{ height: "20px", width: "20px", backgroundColor: "red", borderRadius: 2, textAlign: "center", }} onClick={()=>deleteOne(client._id)}><div style={{ color: "white", fontSize: "13px", margin: "auto" }}><MdDelete /></div></div>
                        </div>
                      </td>
                    </tr>
                  )
              })
            }
          </tbody>
        </table>
        <div className='d-sm-flex justify-content-between mx-4'>
          <div>Showing {sindex} to {lindex} of {totalcliends} entries</div>
          <nav className='d-flex justify-content-end'>
            <ul className='pagination ' style={{ overflow: "auto", }}>
              <li className={currentpage <= 1 ? "page-item disabled" : "page-item"} onClick={() => { setcurrentpage(1 <= currentpage ? 1 : currentpage - 1); paginate(1 <= currentpage ? 1 : currentpage - 1) }}>
                <p className="page-link">Previous</p>
              </li>
              {
                pages.map((val, index) => {
                  return <li className={val === currentpage ? "page-item active" : "page-item"} key={index}><p className="page-link" onClick={() => { paginate(val) }} >{val}</p></li>
                })
              }


              <li className={currentpage >= pages.length ? "page-item disabled" : "page-item"} onClick={() => { setcurrentpage(pages.length >= currentpage ? pages.length : currentpage + 1); paginate(pages.length >= currentpage ? pages.length : currentpage + 1) }}>
                <p className="page-link" >Next</p>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default ClientTable