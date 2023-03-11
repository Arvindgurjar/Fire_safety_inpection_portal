import React, { useReducer } from 'react'
import AddProduct from "./AddProduct"
import ProductTable from "./ProductTable"
import "../App.css"
import { initialstate, reducer } from "./Reducer/useReducer"
const ProductModule = () => {
    const [state, dispatch] = useReducer(reducer, initialstate)
    return (
        <div className='m-2' style={{ border: "1px solid gray" }}>
            <div style={{ width: "100%", backgroundColor: "lightgrey" }}>
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="pills-showproduct-tab" data-bs-toggle="pill" data-bs-target="#pills-showproduct" type="button" role="tab" aria-controls="pills-showproduct" aria-selected="true" onClick={() => dispatch({ type: "productsubmit" })}>Product List</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-addproduct-tab" data-bs-toggle="pill" data-bs-target="#pills-addproduct" type="button" role="tab" aria-controls="pills-addproduct" aria-selected="false">Add Product</button>
                    </li>
                </ul>
            </div>
            <div className="tab-content" id="pills-tabContent">
                 <div className="tab-pane fade show active" id="pills-showproduct" role="tabpanel" aria-labelledby="pills-showproduct-tab" tabIndex="0" ><ProductTable state={state}/></div> 
                <div className="tab-pane fade" id="pills-addproduct" role="tabpanel" aria-labelledby="pills-addproduct-tab" tabIndex="0"><AddProduct/></div>
            </div>
        </div>
    )
}

export default ProductModule