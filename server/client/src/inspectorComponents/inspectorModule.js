import React, { useReducer } from 'react'
import AddInspector from "./AddInspector"
import InspectorTable from "./InspectorTable"
import "../App.css"
import { initialstate, reducer } from "./Reducer/useReducer"
const InspectorModule = () => {
    const [state, dispatch] = useReducer(reducer, initialstate)
    return (
        <div className='m-2' style={{ border: "1px solid gray" }}>
            <div style={{ width: "100%", backgroundColor: "lightgrey" }}>
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="pills-showinspection-tab" data-bs-toggle="pill" data-bs-target="#pills-showinspection" type="button" role="tab" aria-controls="pills-showinspection" aria-selected="true" onClick={() => dispatch({ type: "submit" })}>Inspector List</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-addinpection-tab" data-bs-toggle="pill" data-bs-target="#pills-addinpection" type="button" role="tab" aria-controls="pills-addinpection" aria-selected="false">Add Inspector</button>
                    </li>
                </ul>
            </div>
            <div className="tab-content" id="pills-tabContent">
                 <div className="tab-pane fade show active" id="pills-showinspection" role="tabpanel" aria-labelledby="pills-showinspection-tab" tabIndex="0" ><InspectorTable state={state}/></div> 
                <div className="tab-pane fade" id="pills-addinpection" role="tabpanel" aria-labelledby="pills-addinpection-tab" tabIndex="0"><AddInspector /></div>
            </div>
        </div>
    )
}

export default InspectorModule