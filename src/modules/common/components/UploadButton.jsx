import PropTypes from "prop-types";
import { useRef } from "react";

const UploadButton = ({ onUpload }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="upload-button-container">
      <button type="button" className="upload-button" onClick={handleClick}>
        Upload Image
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="upload-input"
        onChange={handleFileChange}
      />
    </div>
  );
};

UploadButton.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default UploadButton;
