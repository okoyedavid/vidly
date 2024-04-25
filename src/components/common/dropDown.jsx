import React from "react";

const DropDown = ({ name, label, value, options, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        onChange={onChange}
        className="form-control"
        id={name}
        value={value}
      >
        <option disabled value="">
          Select {label}
        </option>
        {options.map((item) => (
          <option value={item._id} key={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default DropDown;
