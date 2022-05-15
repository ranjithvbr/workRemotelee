import React from "react";
import { useDropzone } from "react-dropzone";

export default function FileUpload(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    disabled: true
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="dropzoneContainer">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {files.length > 0 && (
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      )}
    </section>
  );
}
