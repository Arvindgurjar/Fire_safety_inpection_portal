import React, { useEffect, useState } from 'react'
import _ from "lodash"
const ClientTable = () => {

  const [pagesize, setpagesize] = useState(1)
  const [seachclient, setsearchclient] = useState("")
  const [clients, setclients] = useState([])
  const [paginatedclients, setpaginatedclients] = useState([])
  const [currentpage, setcurrentpage] = useState(1)
  const [pages, setpages] = useState([])

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
  }

  useEffect(() => {
   
    getClients()

  },[])

  useEffect(() => {
    const pagecount = clients ? Math.ceil(clients.length / pagesize) : 0;
    const page = _.range(1, pagecount + 1)
    setpages(page)
    setpaginatedclients(_(clients).slice(0, pagesize).value())
  }, [pagesize, clients])


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
                return (
                  <tr key={client._id}>
                    <td>{client.client_name}</td>
                    <td>{client.client_city}<br />{client.client_state}</td>
                    <td>{client.client_address}</td>
                    <td>{client.client_email}</td>
                    <td>icons</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <div className='d-sm-flex justify-content-between mx-4'>
          <div>Showing 1 to {pagesize} of {clients.length} entries</div>
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


              <li className={currentpage >= pages.length ? "page-item disabled" : "page-item"} onClick={() => { setcurrentpage(clients.length >= currentpage ? clients.length : currentpage + 1); paginate(clients.length >= currentpage ? clients.length : currentpage + 1) }}>
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