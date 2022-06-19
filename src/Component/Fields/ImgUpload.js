import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./field.scss";

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: 56,
  height: 56,
};

export default function Previews({ handleFileSRC, value }) {
  const [files, setFiles] = useState(value);

  useEffect(() => {

  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    handleFileSRC(files);
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          alt="preview"
          src={file.preview}
          style={img}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

console.log("thumbs", thumbs, files);
  return (
    <section className="dropzoneImgContainer">
      <div {...getRootProps({ className: "dropzone" })}>
        <div>
          <input {...getInputProps()} />
          <p>Drag 'n' drop icon here, or click to select icon</p>
          <div className="previewImg">{thumbs}</div>
        </div>
      </div>
    </section>
  );
}
