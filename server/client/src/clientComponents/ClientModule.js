import React, { useReducer } from 'react'
import AddClient from "./AddClient"
import ClientTable from "./ClientTable"
import "../App.css"
import { initialstate, reducer } from "./Reducer/useReducer"
const ClientModule = () => {
    const [state, dispatch] = useReducer(reducer, initialstate)
    return (
        <div className='m-2' style={{ border: "1px solid gray" }}>
            <div style={{ width: "100%", backgroundColor: "lightgrey" }}>
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="pills-showclient-tab" data-bs-toggle="pill" data-bs-target="#pills-showclient" type="button" role="tab" aria-controls="pills-showclient" aria-selected="true" onClick={() => dispatch({ type: "submit" })}>Client List</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-addclient-tab" data-bs-toggle="pill" data-bs-target="#pills-addclient" type="button" role="tab" aria-controls="pills-addclient" aria-selected="false">Add Client</button>
                    </li>
                </ul>
            </div>
            <div className="tab-content" id="pills-tabContent">
                 <div className="tab-pane fade show active" id="pills-showclient" role="tabpanel" aria-labelledby="pills-showclient-tab" tabIndex="0" ><ClientTable state={state}/></div> 
                <div className="tab-pane fade" id="pills-addclient" role="tabpanel" aria-labelledby="pills-addclient-tab" tabIndex="0"><AddClient /></div>
            </div>
        </div>
    )
}

export default ClientModule