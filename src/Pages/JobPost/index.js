import React, { useCallback, useState } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Card, Checkbox as AntdCheckbox } from "antd";
import { ReactTrixRTEInput } from "react-trix-rte";
import CreateForm from "../CreateForm";
import { Input, RadioButton, Button, Select } from "../../Component/Fields";
import {
  categoryOptions,
  jobType,
  otherLocation,
} from "../../assert/optionList";
import "./jobpost.scss";

const errorMsg = [
  "JobTitle is Required",
  "Select atleast one JobType",
  "Select or Enter atleast one location",
  "Field is Required",
  "Link is Invalid",
  "Email is Invalid",
  "Please Select Template or Create Form",
  "Enter the Job Description",
  "Company Name is Required",
  "Email is Invalid",
];

function JobPostForm() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [state, setState] = useState({
    jobTitle: "",
    category: "",
    jobType: [],
    location: "Worldwide",
    otherLocation: [],
    applyLink: "link",
    otherTimezones: "",
    salary: "",
    jobDescription: "",
    companyDescription: "",
    companyName: "",
    companyEmail: "",
  });
  const [errMsg, setErrmsg] = useState({
    jobTitle: "",
    jobType: "",
    location: "",
    applyLink: "",
    jobDescription: "",
    companyName: "",
    companyEmail: "",
    companyDescription: "",
  });

  const handleValidation = useCallback(() => {
    Object.keys(errMsg).forEach((it) => {
      if (it === "") {
        setErrmsg((prevState) => ({
          ...prevState,
          [it]: "",
        }));
      }
    });
  }, []);

  const handleChange = useCallback((data, name) => {
    console.log("stateonChange", data, name);
    setState((prevState) => ({
      ...prevState,
      [name]: data,
    }));
  }, []);

  const handleTrixChange = useCallback(
    (e, data, name) => {
      console.log("handleTrixChange", data, name);
      handleChange(data, name);
    },
    [handleChange]
  );

  const handleSubmit = useCallback(() => {
    handleValidation();
  }, [handleValidation]);

  console.log("state", state);

  return (
    <div className="jobPost">
      <div className="steps">
        <div className="activeSteps">Create</div>
        <ArrowRightOutlined />
        <div>Preview & Publish</div>
      </div>
      <Card className="cardContainer">
        <div className="subTitle">Tell Us About The Position</div>
        <Input
          label={"Job Title"}
          placeholder={"e.g. Software Developer"}
          required
          value={state.jobTitle}
          onChange={(data) => handleChange(data, "jobTitle")}
          onBlur={handleValidation}
          errMsg={errMsg.jobTitle}
        />
        <div className="categoryRowContainer">
          <Select
            Options={categoryOptions}
            label={"Category"}
            required
            value={state.category}
            onChange={(data) => handleChange(data, "category")}
          />
          <div className="jobType">
            <div className="fieldLabel">
              Job Type <span className="requiredSymbol"> *</span>
            </div>
            <div>
              <AntdCheckbox.Group
                options={jobType}
                className="checkboxContainer"
                value={state.jobType}
                onChange={(data) => handleChange(data, "jobType")}
              />
            </div>
          </div>
        </div>
        <div className="remotelocation">
          <div className="fieldLabel">
            Remote Location<span className="requiredSymbol"> *</span>
          </div>
          <RadioButton
            label={"Worldwide"}
            value={state.location === "Worldwide"}
            onChange={() => handleChange("Worldwide", "location")}
          />
          <RadioButton
            label={"Other Location Requirements"}
            value={state.location === "Other Location Requirements"}
            onChange={() =>
              handleChange("Other Location Requirements", "location")
            }
          />
          {state.location === "Other Location Requirements" && (
            <div className="otherLocation">
              <AntdCheckbox.Group
                options={otherLocation}
                className="checkboxContainer"
                value={state.otherLocation}
                onChange={(data) => handleChange(data, "otherLocation")}
              />
              {state.otherLocation.includes("Other, please specify: ") && (
                <Input
                  placeholder={"Countries, regions, timezones"}
                  value={state.otherTimezones}
                  onChange={(data) => handleChange(data, "otherTimezones")}
                />
              )}
            </div>
          )}
        </div>
        <Input
          label={"Salary"}
          value={state.salary}
          onChange={(data) => handleChange(data, "salary")}
        />
        <div className="application">
          <div className="linkContainer">
            <RadioButton
              value={state.applyLink === "link"}
              onChange={() => handleChange("link", "applyLink")}
            />
            <Input
              required
              label={"How to apply"}
              placeholder={"Link to Application page or Email address."}
            />
          </div>
          <div className="or">
            <span>OR</span>
          </div>
        </div>
        <div>
          <RadioButton
            value={state.applyLink === "createForm"}
            onChange={() => handleChange("createForm", "applyLink")}
          />
          <Button
            customStyles="applicantBtn"
            title={"Create form for applicant"}
            onClick={() => setIsModelOpen(true)}
          />
        </div>
        <div className="description">
          <div className="fieldLabel">
            Job Description<span className="requiredSymbol"> *</span>
          </div>
          <ReactTrixRTEInput
            onChange={(e, data) => handleTrixChange(e, data, "jobDescription")}
          />
        </div>

        <div className="aboutCompany">
          <div className="subTitle">Tell Us More About Your Company</div>
          <div className="aboutCompanyInputContainer">
            <Input
              label={"Company Name"}
              required
              value={state.companyName}
              onChange={(data) => handleChange(data, "companyName")}
            />
            <Input
              label={"Email"}
              required
              value={state.companyEmail}
              onChange={(data) => handleChange(data, "companyEmail")}
            />
          </div>
          <div className="description">
            <div className="fieldLabel">Company Description</div>
            <ReactTrixRTEInput
              onChange={(e, data) =>
                handleTrixChange(e, data, "companyDescription")
              }
            />
          </div>
        </div>
        <div className={"jobPostSubmit"}>
          <Button title={"Preview & Publish"} onClick={handleSubmit} />
        </div>
      </Card>
      <CreateForm
        isModelOpen={isModelOpen}
        handleModelOpen={() => setIsModelOpen(false)}
      />
    </div>
  );
}

export default JobPostForm;
