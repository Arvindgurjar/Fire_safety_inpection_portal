import React from 'react'

const FormFields = (props) => {
     /* Form Field of Client Module */
    return (
        <div>
            <div className="row">
                <div className='col-md-6'>
                    <div className="mb-3">
                        <label htmlFor="client_name" className="form-label">Name:</label>
                        <input type="text" className="form-control" id="client_name" name='client_name' value={props.client.client_name}
                            {...props.register("client_name", {
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
                        {props.errors.client_name && <div className='errors'>{props.errors.client_name.message}</div>}
                    </div>

                    <div className="mb-3 col-12 ">
                        <label htmlFor="client_email" className="form-label">Email:</label>
                        <input type="email" className="form-control" id="client_email" name='client_email' value={props.client.client_email}

                            {...props.register("client_email", {
                                required: "*",
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "*"
                                }
                            }

                            )} onChange={props.setFieldData} />
                        {props.errors.client_email && <div className='errors'>{props.errors.client_email.message}</div>}
                    </div>
                    <div className="mb-3 col-12 ">
                        <label htmlFor="client_password" className="form-label">Password:</label>
                        <input type="password" className="form-control" id="client_password" name='client_password' value={props.client.client_password}
                            {...props.register("client_password", {
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
                        {props.errors.client_password && <div className='errors'>{props.errors.client_password.message}</div>}
                    </div>
                    <div className="mb-3 col-12 ">
                        <label htmlFor="client_city" className="form-label">City:</label>
                        <input type="text" className="form-control" id="client_city" name='client_city' value={props.client.client_city}
                            {...props.register("client_city", {
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
                        {props.errors.client_city && <div className='errors'>{props.errors.client_city.message}</div>}
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className="mb-3 col-12 ">
                        <label htmlFor="client_state" className="form-label">State:</label>
                        <input type="text" className="form-control" id="client_state" name='client_state' value={props.client.client_state}
                            {...props.register("client_state", {
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
                        {props.errors.client_state && <div className='errors'>{props.errors.client_state.message}</div>}
                    </div>
                    <div className="mb-3 col-12 ">
                        <label htmlFor="client_address" className="form-label">Address:</label>
                        <input type="text" className="form-control" id="client_address" name='client_address' value={props.client.client_address}
                            {...props.register("client_address", {
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
                        {props.errors.client_address && <div className='errors'>{props.errors.client_address.message}</div>}
                    </div>
                    <div className="mb-3 col-12 ">
                        <label htmlFor="client_phone" className="form-label">Phone:</label>
                        <input type="text" className="form-control" id="client_phone" name='client_phone' value={props.client.client_phone}
                            {...props.register("client_phone", {
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
                        {props.errors.client_phone && <div className='errors'>{props.errors.client_phone.message}</div>}
                    </div>
                    <div className="mb-3 col-12 ">
                        <label htmlFor="client_other_info" className="form-label">Other Info:</label>
                        <input type="text" className="form-control" id="client_other_info" name='client_other_info' value={props.client.client_other_info}
                            {...props.register("client_other_info", {
                                required: "*",
                            }

                            )} onChange={props.setFieldData} />
                        {props.errors.client_other_info && <div className='errors'>{props.errors.client_other_info.message}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormFields