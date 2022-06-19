import React, { useState, useCallback } from "react";
import { Input, Select, FileUpload, DatePicker } from "../../Component/Fields";
import "./template.scss";
import { GenderOptions } from "../../assert/optionList";

function Template2(params) {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    DOB: "",
    email: "",
    phone: "",
    higestDegree: "",
    discipline: "",
    streetAddress: "",
    city: "",
    linkedin: "",
    portfolio: "",
    gender: "Please select",
    school: "",
  });

  const handleChange = useCallback((data, name) => {
    setState((prevState) => ({
      ...prevState,
      [name]: data,
    }));
  }, []);

  console.log("Template2", state);

  return (
    <div className="template2-block">
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
      <div className="dob-flex">
        <DatePicker
          label="DOB"
          value={state.DOB}
          required
          onChange={(data) => handleChange(data, "DOB")}
        />
        <Select
          label="Gender"
          Options={GenderOptions}
          value={state.gender}
          required
          onChange={(data) => handleChange(data, "gender")}
        />
      </div>
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
      <div className="horizontal-line">
        <Input
          label="Linkedin Profile"
          value={state.linkedin}
          onChange={(data) => handleChange(data, "linkedin")}
        />
        <Input
          label="Portfolio"
          value={state.portfolio}
          onChange={(data) => handleChange(data, "portfolio")}
        />
      </div>
      <div className="horizontal-line">
        <h3>Education</h3>
        <div className="d-flex">
          <Input
            label="Higest Degree"
            value={state.higestDegree}
            onChange={(data) => handleChange(data, "higestDegree")}
          />
          <Input
            label="Discipline"
            value={state.discipline}
            onChange={(data) => handleChange(data, "discipline")}
          />
        </div>
        <Input
          label="School"
          value={state.school}
          onChange={(data) => handleChange(data, "school")}
        />
        <div className="horizontal-line">
          <h3>Address</h3>
          <Input
            placeholder="Street Address"
            value={state.streetAddress}
            onChange={(data) => handleChange(data, "streetAddress")}
          />
          <Input
            placeholder="city, state, zipcode"
            value={state.city}
            onChange={(data) => handleChange(data, "city")}
          />
        </div>
      </div>
    </div>
  );
}

export default Template2;
