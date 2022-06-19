import React, { useState, useCallback } from "react";
import { Input, Select, FileUpload } from "../../Component/Fields";
import "./template.scss";
import { GenderOptions } from "../../assert/optionList";

function Template3(params) {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "Please select",
  });

  const handleChange = useCallback((data, name) => {
    setState((prevState) => ({
      ...prevState,
      [name]: data,
    }));
  }, []);

  console.log("Template3", state);

  return (
    <div className="template3-block">
      <h3>Basic Details</h3>
      <div className="short-name-conatiner">
        <Input
          label="First Name"
          value={state.firstName}
          required
          onChange={(data) => handleChange(data, "firstName")}
        />
        <Input
          label="Last Name"
          value={state.lastName}
          required
          onChange={(data) => handleChange(data, "lastName")}
        />
      </div>
      <Select
        label="Gender"
        Options={GenderOptions}
        value={state.gender}
        required
        onChange={(data) => handleChange(data, "gender")}
      />
      <Input
        label="Email"
        required
        value={state.email}
        onChange={(data) => handleChange(data, "email")}
      />
      <Input
        label="Phone"
        required
        value={state.phone}
        onChange={(data) => handleChange(data, "phone")}
      />
      <FileUpload label="Resume/CV" required />
      <FileUpload label="Cover letter" />
    </div>
  );
}

export default Template3;
