import React from "react";
import { useDropzone } from "react-dropzone";

export default function FileUpload({ disabled, label, required }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    disabled: disabled,
  });

  // const files = acceptedFiles.map((file) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  return (
    <div className="dropzone-block">
      {label && (
        <label>
          {label} {required && <span className="requiredSymbol">*</span>}
        </label>
      )}
      <section className="dropzoneContainer">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>{"Drag 'n' drop some files here, or click to select files"}</p>
        </div>
        {/* {files.length > 0 && (
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      )} */}
      </section>
    </div>
  );
}
