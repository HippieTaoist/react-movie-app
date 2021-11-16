import React from "react";
import PropTypes from "prop-types";

function TheError(props) {
  return (
    <div>
      <h1>{props.errorMessage}</h1>
    </div>
  );
}

TheError.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default TheError;
