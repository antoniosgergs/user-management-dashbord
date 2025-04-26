import React from "react";

const Input = ({label, error, type, placeholder, ...rest}) => (
    <>
        <label className="user-label">{label}</label>
        <input className="user-input" type={type} placeholder={placeholder} {...rest} />
        {error && <p className="user-input-error">{error}</p>}
    </>
)

export default Input;