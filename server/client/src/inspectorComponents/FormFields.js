import React from 'react'

const FormFields = (props) => {
    return (
        <div>
            <div className="row">
                <div className='col-md-6'>
                    <div className="mb-3">
                        <label htmlFor="inspector_name" className="form-label">Name:</label>
                        <input type="text" className="form-control" id="inspector_name" name='inspector_name' value={props.inspector.inspector_name}
                            {...props.register("inspector_name", {
                                required: "*",
                                pattern: {
                                    value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                                    message: "*"
                                },
                                minLength: {
                                    value: 3,
                                    message: "*"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "*"
                                }
                            }

                            )} onChange={props.setFieldData} />
                        {props.errors.inspector_name && <div className='errors'>{props.errors.inspector_name.message}</div>}
                    </div>

                    <div className="mb-3 col-12 ">
                        <label htmlFor="inspector_email" className="form-label">Email:</label>
                        <input type="email" className="form-control" id="inspector_email" name='inspector_email' value={props.inspector.inspector_email}

                            {...props.register("inspector_email", {
                                required: "*",
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "*"
                                }
                            }

                            )} onChange={props.setFieldData} />
                        {props.errors.inspector_email && <div className='errors'>{props.errors.inspector_email.message}</div>}
                    </div>
                    <div className="mb-3 col-12 ">
                        <label htmlFor="inspector_password" className="form-label">Password:</label>
                        <input type="password" className="form-control" id="inspector_password" name='inspector_password' value={props.inspector.inspector_password}
                            {...props.register("inspector_password", {
                                required: "*",
                                pattern: {
                                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                    message: "*"
                                },
                                minLength: {
                                    value: 8,
                                    message: "*"
                                }
                            }

                            )} onChange={props.setFieldData} />
                        {props.errors.inspector_password && <div className='errors'>{props.errors.inspector_password.message}</div>}
                    </div>
                    <div className="mb-3 col-12 ">
                        <label htmlFor="inspector_city" className="form-label">City:</label>
                        <input type="text" className="form-control" id="inspector_city" name='inspector_city' value={props.inspector.inspector_city}
                            {...props.register("inspector_city", {
                                required: "*",
                                pattern: {
                                    value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                                    message: "*"
                                },
                                minLength: {
                                    value: 3,
                                    message: "*"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "*"
                                }
                            }

                            )} onChange={props.setFieldData} />
                        {props.errors.inspector_city && <div className='errors'>{props.errors.inspector_city.message}</div>}
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className="mb-3 col-12 ">
                        <label htmlFor="inspector_state" className="form-label">State:</label>
                        <input type="text" className="form-control" id="inspector_state" name='inspector_state' value={props.inspector.inspector_state}
                            {...props.register("inspector_state", {
                                required: "*",
                                pattern: {
                                    value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                                    message: "*"
                                },
                                minLength: {
                                    value: 2,
                                    message: "*"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "*"
                                }
                            }

                            )} onChange={props.setFieldData} />
                        {props.errors.inspector_state && <div className='errors'>{props.errors.inspector_state.message}</div>}
                    </div>
                    <div className="mb-3 col-12 ">
                        <label htmlFor="inspector_address" className="form-label">Address:</label>
                        <input type="text" className="form-control" id="inspector_address" name='inspector_address' value={props.inspector.inspector_address}
                            {...props.register("inspector_address", {
                                required: "*",
                                pattern: {
                                    value: /^[a-zA-Z0-9\s,'-]*$/,
                                    message: "*"
                                },
                                minLength: {
                                    value: 8,
                                    message: "*"
                                }
                            }

                            )} onChange={props.setFieldData} />
                        {props.errors.inspector_address && <div className='errors'>{props.errors.inspector_address.message}</div>}
                    </div>
                    <div className="mb-3 col-12 ">
                        <label htmlFor="inspector_phone" className="form-label">Phone:</label>
                        <input type="text" className="form-control" id="inspector_phone" name='inspector_phone' value={props.inspector.inspector_phone}
                            {...props.register("inspector_phone", {
                                required: "*",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "*"
                                },
                                minLength: {
                                    value: 10,
                                    message: "*"
                                },
                                maxLength: {
                                    value: 10,
                                    message: "*"
                                }
                            }

                            )} onChange={props.setFieldData} />
                        {props.errors.inspector_phone && <div className='errors'>{props.errors.inspector_phone.message}</div>}
                    </div>
                    <div className="mb-3 col-12 ">
                        <label htmlFor="inspector_other_info" className="form-label">Other Info:</label>
                        <input type="text" className="form-control" id="inspector_other_info" name='inspector_other_info' value={props.inspector.inspector_other_info}
                            {...props.register("inspector_other_info", {
                                required: "*",
                            }

                            )} onChange={props.setFieldData} />
                        {props.errors.inspector_other_info && <div className='errors'>{props.errors.inspector_other_info.message}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormFields