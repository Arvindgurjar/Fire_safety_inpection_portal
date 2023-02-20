import React from 'react'

const FormFields = (props) => {
    return (
        <div>
            <div className="row">
                <div className='col-md-6'>
                    <div className="mb-3">
                        <label htmlFor="product_name" className="form-label">Product Name:</label>
                        <input type="text" className="form-control" id="product_name" name='product_name' value={props.product.product_name}
                            {...props.register("product_name", {
                                required: "*",
                            }

                            )} onChange={props.setFieldData} />
                        {props.errors.product_name && <div className='errors'>{props.errors.product_name.message}</div>}
                    </div>

                    <div className="mb-3 col-12 ">
                        <label htmlFor="product_extinguisher_type" className="form-label">Extinguisher Type:</label>
                        <input type="text" className="form-control" id="product_extinguisher_type" name='product_extinguisher_type' value={props.product.product_extinguisher_type}

                            {...props.register("product_extinguisher_type", {
                                required: "*",
                            }

                            )} onChange={props.setFieldData} />
                        {props.errors.product_extinguisher_type && <div className='errors'>{props.errors.product_extinguisher_type.message}</div>}
                    </div>
                    <div className="mb-3 col-12 ">
                        <label htmlFor="product_extinguisher_capacity" className="form-label">Extinguisher Capacity:</label>
                        <input type="text" className="form-control" id="product_extinguisher_capacity" name='product_extinguisher_capacity' value={props.product.product_extinguisher_capacity}
                            {...props.register("product_extinguisher_capacity", {
                                required: "*",
                            }

                            )} onChange={props.setFieldData} />
                        {props.errors.product_extinguisher_capacity && <div className='errors'>{props.errors.product_extinguisher_capacity.message}</div>}
                    </div>

                </div>
                <div className='col-md-6'>
                    <div className="mb-3 col-12 ">
                        <label htmlFor="product_manufactured_date" className="form-label">Manufactured Date:</label>
                        <input type="date" className="form-control" id="product_manufactured_date" name='product_manufactured_date' value={props.product.product_manufactured_date}
                            {...props.register("product_manufactured_date", {
                                required: "*",
                            }

                            )} onChange={props.setFieldData} />
                        {props.errors.product_manufactured_date && <div className='errors'>{props.errors.product_manufactured_date.message}</div>}
                    </div>
                    <div className="mb-3 col-12 ">
                        <label htmlFor="product_due_date" className="form-label">Extinguisher Next Due Date:</label>
                        <input type="date" className="form-control" id="product_due_date" name='product_due_date' value={props.product.product_due_date}
                            {...props.register("product_due_date", {
                                required: "*",
                            }

                            )} onChange={props.setFieldData} />
                        {props.errors.product_due_date && <div className='errors'>{props.errors.product_due_date.message}</div>}
                    </div>
                    <div className="mb-3 col-12 ">
                        <label htmlFor="product_remarks" className="form-label">Remark:</label>
                        <textarea  className="form-control" id="product_remarks" name='product_remarks' value={props.product.product_remarks}
                            {...props.register("product_remarks", {
                                required: "*",
                            }

                            )} onChange={props.setFieldData} />
                        {props.errors.product_remarks && <div className='errors'>{props.errors.product_remarks.message}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormFields