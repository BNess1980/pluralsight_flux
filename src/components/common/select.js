import React from "react";
import PropTypes from "prop-types";

function Select(props) {
  let wrapperClass = "form-group";
  if (props.error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <>
      <div className={wrapperClass}>
        <label htmlFor={props.name}>{props.label}</label>
        <div className="field">
          <select
            id={props.id}
            name={props.name}
            className="form-control"
            onChange={props.onChange}
          >
            {props.authors.map((value, i) => {
              return (
                <option value={value.id} key={i + 1}>
                  {value.name}
                </option>
              );
            })}
          </select>
          {props.error && <div className="alert alert-danger mt-2">{props.error}</div>}
        </div>
      </div>
      {}
    </>
  );
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  authors: PropTypes.array.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
};

Select.defaultProps = {
  error: "", // If error not passed in; then empty
};
export default Select;
