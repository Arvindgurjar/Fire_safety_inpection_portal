import React, { useEffect, useState, useRef } from 'react'
import _ from "lodash"
import { MdDelete, MdEdit } from "react-icons/md";
import FormFields from './FormFields';
import { useForm } from "react-hook-form"

const InspectorTable = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [pagesize, setpagesize] = useState(2)
  const [seachinspector, setsearchinspector] = useState("")
  const [inspectors, setinspectors] = useState([])
  const [tinspectors, settinspectors] = useState([])
  const [totalcliends, settotalinspectors] = useState()
  const [paginatedinspectors, setpaginatedinspectors] = useState([])
  const [currentpage, setcurrentpage] = useState(1)
  const [pages, setpages] = useState([])
  const [sindex, setsindex] = useState()
  const [lindex, setlindex] = useState()
  const [ids, setids] = useState([])
  const [multiselect, setmultiselect] = useState(false)
  const [model, setmodel] = useState(false)
  const [editinspector, seteditinspector] = useState({
    inspector_name: "",
    inspector_email: "",
    inspector_password: "",
    inspector_city: "",
    inspector_state: "",
    inspector_address: "",
    inspector_phone: "",
    inspector_other_info: ""
  })
  const temp = useRef();
  
  const getInspectors = async () => {
    try {
      const res = await fetch("api/inspector/list", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const inspector = await res.json();
      setinspectors([...inspector]);
      settinspectors([...inspector]);
      setpaginatedinspectors(_([...inspector]).slice(0, pagesize).value());
    } catch (error) {
      console.log(error);
    }
  }
  //For Setting a Data In Resultant Page
  const paginate = (page) => {
    setcurrentpage(page)
    //console.log(page)
    const startindex = (page - 1) * pagesize
    setpaginatedinspectors(_(inspectors).slice(startindex, page * pagesize).value())
    setsindex((page - 1) * pagesize + 1)
    setlindex(page * pagesize < inspectors.length ? page * pagesize : inspectors.length)

  }
  //For Setting a Data In Resultant Page
  const resultantinspector = () => {
    setlindex(inspectors.length < (currentpage * pagesize) ? inspectors.length : (currentpage * pagesize))
    setsindex((currentpage - 1) * pagesize + 1)
    if (inspectors.length !== 0) {
      const pagecount = inspectors ? Math.ceil(inspectors.length / pagesize) : 0;
      const page = _.range(1, pagecount + 1)
      setpages(page)
      setpaginatedinspectors(_(inspectors).slice(0, pagesize).value())
      settotalinspectors(inspectors.length)
      setcurrentpage(1)
    }
  }

  //Request for deleting one inspector
  const deleteOne = async (_id) => {
    try {
      const res = await fetch(`api/inspector/delete/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      if (res.status === 201) { alert("Deleted Successfully"); getInspectors() }
      else
        alert("Failed Deletion");

    } catch (error) {
      console.log(error)
    }
  }

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
    if (window.confirm("Do You Want To Delete Selected inspectors")) {
      try {
        const res = await fetch("api/inspector/multidelete", {
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
          getInspectors()
          setids([])
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const setFieldData = (e) => {
    let { name, value } = e.target

    seteditinspector({ ...editinspector, [name]: value })


  }
  //for edit inspectors
  const submit = async () => {
    // console.log(editinspector)
    const { inspector_name, inspector_email, inspector_password, inspector_city, inspector_state, inspector_address, inspector_phone, inspector_other_info } = editinspector
    const res = await fetch(`api/inspector/edit/${editinspector._id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        inspector_name, inspector_email, inspector_password, inspector_city, inspector_state, inspector_address, inspector_phone, inspector_other_info
      })
    })
    if (res.status === 201) {
      alert(`${editinspector.inspector_name} Data Successfully Updated`)
      setmodel(false)
    }
    else {
      alert("Oh! Please Update User");
    }
  }

  temp.current = getInspectors
  useEffect(() => {

    temp.current()

  }, [props.state, model]);



  useEffect(() => {
    if (seachinspector === "") {
      setinspectors(tinspectors)
    } else {

      let result = tinspectors.filter((val) => {
        return (val.inspector_name.toLowerCase().includes(seachinspector.toLowerCase()) || val.inspector_city.toLowerCase().includes(seachinspector.toLowerCase()) || val.inspector_state.toLowerCase().includes(seachinspector.toLowerCase()) || val.inspector_address.toLowerCase().includes(seachinspector.toLowerCase()) || val.inspector_email.toLowerCase().includes(seachinspector.toLowerCase()))
      })
      // console.log(result)
      if (result.length === 0) {
        setpaginatedinspectors([]);
        setsindex(0)
        setlindex(0);
        settotalinspectors(0);
        setpages([1])
      }
      else {
        setinspectors(result)
        setcurrentpage(1);
        settotalinspectors(result.length)
        result.length < 6 && setpagesize(result.length)
      }
    }

  }, [seachinspector, tinspectors])


  const temp1 = useRef()
  temp1.current = resultantinspector
  useEffect(() => {
    temp1.current()
  }, [inspectors, pagesize])
  return (
    <div className="m-3">
      {model && <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Detail Of {editinspector.inspector_name.toUpperCase()}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { seteditinspector([]); setmodel(false) }}></button>
            </div>

            <form className='mx-2' onSubmit={handleSubmit(submit)}>
              <FormFields className="modal-body" inspector={editinspector} errors={errors} register={register} setFieldData={setFieldData} />
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { seteditinspector([]); setmodel(false) }} >Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      }
      <div className='d-sm-flex  justify-content-between mx-4' style={{ fontSize: "14px" }}>
        <p >Show <input type="number" value={pagesize} style={{ width: "60px" }} name="pagesize" onChange={(e) => e.target.value <= 0 ? setpagesize(1) : e.target.value < inspectors.length ? setpagesize(e.target.value) : setpagesize(inspectors.length)} disabled={paginatedinspectors.length !== 0 ? false : true} /> entries</p>
        <p>Search: <input type="search" value={seachinspector} onChange={(e) => setsearchinspector(e.target.value)} /></p>
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
              paginatedinspectors.map((inspector) => {
                if (inspector != null)
                  return (
                    <tr key={inspector._id}>
                      {multiselect && <td style={{ height: "100%", verticalAlign: "middle" }}><div className='text-center'><input type="checkbox" value={inspector._id} checked={inspector.isChecked} onChange={(e) => handleCheck(e)} /></div></td>}
                      <td style={{ width: "20%", height: "100%", verticalAlign: "middle" }} >{inspector.inspector_name}</td>
                      <td style={{ width: "20%", height: "100%", verticalAlign: "middle" }}>{inspector.inspector_city}<br />{inspector.inspector_state}</td>
                      <td style={{ width: "30%", height: "100%", verticalAlign: "middle" }}>{inspector.inspector_address}</td>
                      <td style={{ width: "20%", height: "100%", verticalAlign: "middle" }}>{inspector.inspector_email}</td>
                      <td style={{ width: "20%", height: "100%", verticalAlign: "middle" }}>
                        <div className='d-flex' >
                          <div className='mx-1' style={{ height: "20px", width: "20px", backgroundColor: "blue", borderRadius: 2, textAlign: "center", }}><div style={{ color: "white", fontSize: "13px", margin: "auto" }} onClick={() => { seteditinspector(inspector); setmodel(true) }}><MdEdit /></div></div>
                          <div className='mx-1' style={{ height: "20px", width: "20px", backgroundColor: "red", borderRadius: 2, textAlign: "center", }} onClick={() => deleteOne(inspector._id)}><div style={{ color: "white", fontSize: "13px", margin: "auto" }}><MdDelete /></div></div>
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

export default InspectorTable