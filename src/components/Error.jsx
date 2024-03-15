import PropTypes from 'prop-types';

/**
 * Error component displays an error message.
 *
 * @param {string} errorMessage - The error message to display.
 * @returns {JSX.Element} - The rendered Error component.
 */
export default function Error({ errorMessage }) {
  return (
    <div className="alert alert-danger" role="alert">
      <h4 className="alert-heading">Error</h4>
      <p>{errorMessage}</p>
    </div>
  );
}

Error.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};
