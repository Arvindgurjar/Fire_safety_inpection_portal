import React, { useEffect, useState, useRef } from 'react'
import _ from "lodash"
import { MdDelete, MdEdit } from "react-icons/md";
import FormFields from './FormFields';
import { useForm } from "react-hook-form"

const ProductTable = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [pagesize, setpagesize] = useState(2)
  const [seachproduct, setsearchproduct] = useState("")
  const [products, setproducts] = useState([])
  const [tproducts, settproducts] = useState([])
  const [totalproducts, settotalproducts] = useState()
  const [paginatedproducts, setpaginatedproducts] = useState([])
  const [currentpage, setcurrentpage] = useState(1)
  const [pages, setpages] = useState([])
  const [sindex, setsindex] = useState()
  const [lindex, setlindex] = useState()
  const [ids, setids] = useState([])
  const [multiselect, setmultiselect] = useState(false)
  const [model, setmodel] = useState(false)
  const [editproduct, seteditproduct] = useState({
    product_name: "",
    product_extinguisher_type: "",
    product_extinguisher_capacity: "",
    product_manufactured_date: "",
    product_due_date: "",
    product_remarks: "",
    product_client_id: "",
    product_consultant_id: ""
  })
  const temp = useRef();
  // For Getting A products From Backend
  const getproducts = async () => {
    try {
      const res = await fetch("api/product/list", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const product = await res.json();
      setproducts([...product])
      settproducts([...product]);
      setpaginatedproducts(_([...product]).slice(0, pagesize).value())
    } catch (error) {
      console.log(error)
    }
  }
  //For Setting a Data In Resultant Page
  const paginate = (page) => {
    setcurrentpage(page)
    //console.log(page)
    const startindex = (page - 1) * pagesize
    setpaginatedproducts(_(products).slice(startindex, page * pagesize).value())
    setsindex((page - 1) * pagesize + 1)
    setlindex(page * pagesize < products.length ? page * pagesize : products.length)

  }
  //For Setting a Data In Resultant Page
  const resultantproduct = () => {
    setlindex(products.length < (currentpage * pagesize) ? products.length : (currentpage * pagesize))
    setsindex((currentpage - 1) * pagesize + 1)
    if (products.length !== 0) {
      const pagecount = products ? Math.ceil(products.length / pagesize) : 0;
      const page = _.range(1, pagecount + 1)
      setpages(page)
      setpaginatedproducts(_(products).slice(0, pagesize).value())
      settotalproducts(products.length)
      setcurrentpage(1)
    }
  }

  //Request for deleting one product
  const deleteOne = async (_id) => {
    try {
      const res = await fetch(`api/product/delete/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      if (res.status === 201) { alert("Deleted Successfully"); getproducts() }
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
    if (window.confirm("Do You Want To Delete Selected products")) {
      try {
        const res = await fetch("api/product/multidelete", {
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
          getproducts()
          setids([])
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const setFieldData = (e) => {
    let { name, value } = e.target

    seteditproduct({ ...editproduct, [name]: value })


  }
  //for edit products
  const submit = async () => {
    // console.log(editproduct)
    const { product_name,product_extinguisher_type,product_extinguisher_capacity,product_manufactured_date,product_due_date,product_remarks,product_client_id,product_consultant_id } = editproduct    
    const res = await fetch(`api/product/edit/${editproduct._id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        product_name,product_extinguisher_type,product_extinguisher_capacity,product_manufactured_date,product_due_date,product_remarks,product_client_id,product_consultant_id
      })
    })
    if (res.status === 201) {
      alert(`${editproduct.product_name} Data Successfully Updated`)
      setmodel(false)
    }
    else {
      alert("Oh! Please Update User");
    }
  }

  temp.current = getproducts
  useEffect(() => {

    temp.current()

  }, [props.state, model]);
const temp2 = useRef()
temp2.current = resultantproduct
  useEffect(() => {
    if (seachproduct === "") {
      //console.log(tproducts)
      setproducts(tproducts)
      temp2.current()
    } else {
      let result = tproducts.filter((val) => {
        return (val.product_name.toLowerCase().includes(seachproduct.toLowerCase()) || val.product_extinguisher_type.toLowerCase().includes(seachproduct.toLowerCase()) || val.product_extinguisher_capacity.toLowerCase().includes(seachproduct.toLowerCase()) || val.product_remarks.toLowerCase().includes(seachproduct.toLowerCase())||val._id.toLowerCase().includes(seachproduct.toLowerCase()))
      })
      // console.log(result)
      if (result.length === 0) {
        setpaginatedproducts([]);
        setsindex(0)
        setlindex(0);
        settotalproducts(0);
        setpages([1])
      }
      else {
        setproducts(result)
        setcurrentpage(1);
        settotalproducts(result.length)
        result.length < 6 && setpagesize(result.length)
      }
    }

  }, [seachproduct,tproducts])


  const temp1 = useRef()
  temp1.current = resultantproduct
  useEffect(() => {
    temp1.current()
  }, [products, pagesize])
  return (
    <div className="m-3">
      {model && <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Detail Of {editproduct.product_name.toUpperCase()}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { seteditproduct([]); setmodel(false) }}></button>
            </div>

            <form className='mx-2' onSubmit={handleSubmit(submit)}>
              <FormFields className="modal-body" product={editproduct} errors={errors} register={register} setFieldData={setFieldData} />
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { seteditproduct([]); setmodel(false) }} >Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      }
      <div className='d-sm-flex  justify-content-between mx-4' style={{ fontSize: "14px" }}>
        <p >Show <input type="number" value={pagesize} style={{ width: "60px" }} name="pagesize" onChange={(e) => e.target.value <= 0 ? setpagesize(1) : e.target.value < products.length ? setpagesize(e.target.value) : setpagesize(products.length)} disabled={paginatedproducts.length !== 0 ? false : true} /> entries</p>
        <p>Search: <input type="search" value={seachproduct} onChange={(e) => setsearchproduct(e.target.value)} /></p>
      </div>
      {ids.length <= 1 ? (multiselect ? <button className='btn btn-danger fw-bold ms-2' onClick={() => { setmultiselect(!multiselect); setids([]) }}>Diselect Multiple</button> : <button className='btn btn-danger fw-bold ms-2' onClick={() => { setmultiselect(!multiselect); setids([]) }}>Select Multiple</button>) : <button className='btn btn-danger fw-bold ms-2' onClick={deleteMultiple}>Delete All</button>}
      <div style={{ minWidth: "100px", height: "100%", overflow: "auto" }}>
        <table className='table table-striped'>
          <thead>
            <tr>
              {multiselect && <th className='text-center'>#</th>}
              <th>ID</th>
              <th>Product</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              paginatedproducts.map((product) => {
                if (product != null)
                  return (
                    <tr key={product._id}>
                      {multiselect && <td style={{ height: "100%", verticalAlign: "middle" }}><div className='text-center'><input type="checkbox" value={product._id} checked={product.isChecked} onChange={(e) => handleCheck(e)} /></div></td>}
                      <td style={{ width: "20%", height: "100%", verticalAlign: "middle" }} >{product.product_client_id}</td>
                      <td style={{ width: "20%", height: "100%", verticalAlign: "middle" }}>{product.product_name}</td>
                      <td style={{ width: "30%", height: "100%", verticalAlign: "middle" }}>{product.product_extinguisher_type}</td>
                      <td style={{ width: "20%", height: "100%", verticalAlign: "middle" }}>
                        <div className='d-flex' >
                          <div className='mx-1' style={{ height: "20px", width: "20px", backgroundColor: "blue", borderRadius: 2, textAlign: "center", }}><div style={{ color: "white", fontSize: "13px", margin: "auto" }} onClick={() => { seteditproduct(product); setmodel(true) }}><MdEdit /></div></div>
                          <div className='mx-1' style={{ height: "20px", width: "20px", backgroundColor: "red", borderRadius: 2, textAlign: "center", }} onClick={() => deleteOne(product._id)}><div style={{ color: "white", fontSize: "13px", margin: "auto" }}><MdDelete /></div></div>
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
          <div>Showing {sindex} to {lindex} of {totalproducts} entries</div>
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

export default ProductTable