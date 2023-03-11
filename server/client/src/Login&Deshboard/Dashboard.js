import React from 'react'
import ClientModule from '../clientComponents/ClientModule'
import ProductModule from '../productComponents/ProductModule'
import InspectorModule from '../inspectorComponents/inspectorModule'
export default function Dashboard(props) {
  return (
    <div className='m-2 module' style={{ border: "1px solid gray" }}>
      <div style={{ width: "100%", backgroundColor: "lightgrey" }}>
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="pills-dashboard-tab" data-bs-toggle="pill" data-bs-target="#pills-dashboard" type="button" role="tab" aria-controls="pills-dashboard" aria-selected="true">Dashboard</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-clients-tab" data-bs-toggle="pill" data-bs-target="#pills-clients" type="button" role="tab" aria-controls="pills-clients" aria-selected="false">Clients</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-products-tab" data-bs-toggle="pill" data-bs-target="#pills-products" type="button" role="tab" aria-controls="pills-products" aria-selected="false">Products</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-inspection-tab" data-bs-toggle="pill" data-bs-target="#pills-inspection" type="button" role="tab" aria-controls="pills-inspection" aria-selected="false">Inspection</button>
          </li>
        </ul>
      </div>
      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-dashboard" role="tabpanel" aria-labelledby="pills-dashboard-tab" tabIndex="0" >Summary Goes Here</div>
        <div className="tab-pane fade" id="pills-clients" role="tabpanel" aria-labelledby="pills-clients-tab" tabIndex="0"><ClientModule /></div>
        <div className="tab-pane fade" id="pills-products" role="tabpanel" aria-labelledby="pills-products-tab" tabIndex="0" ><ProductModule /></div>
        <div className="tab-pane fade" id="pills-inspection" role="tabpanel" aria-labelledby="pills-inspection-tab" tabIndex="0"><InspectorModule /></div>
      </div>
    </div>
  )
}