import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const NotFoundHandler = ({ error }) => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h2 className="text-red-800 text-lg font-semibold mb-2">Error</h2>
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-red-600 hover:text-red-800 font-medium"
        >
          Return to Product List
        </button>
      </div>
    </div>
  );
};

NotFoundHandler.propTypes = {
  error: PropTypes.string.isRequired,
};

export default NotFoundHandler;
