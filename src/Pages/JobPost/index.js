import React, { useCallback, useEffect, useState, useRef } from "react";
import { ArrowRightOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Card, Checkbox as AntdCheckbox } from "antd";
import { ReactTrixRTEInput } from "react-trix-rte";
import CreateForm from "../CreateForm";
import {
  Input,
  RadioButton,
  Button,
  Select,
  ImgUpload,
} from "../../Component/Fields";
import {
  categoryOptions,
  jobType,
  otherLocation,
} from "../../assert/optionList";
import "./jobpost.scss";
import Preview from "../Preview";
import TickBadge from "../../assert/Images/TickBadge.svg";
import Template1 from "../Templates/template1";
import Template2 from "../Templates/template2";
import Template3 from "../Templates/template3";
import DND from "../CreateForm/DNDForm";

function JobPostForm() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [createFormData, setCreateFormData] = useState([]);
  const [enableSubmit, setEnableSubmit] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [tabName, setTabName] = useState("create");
  const [state, setState] = useState({
    jobTitle: "",
    category: "",
    jobType: ["Full-time"],
    location: "Worldwide",
    otherLocation: [],
    applyLink: "link",
    otherTimezones: "",
    salary: "",
    jobDescription: "",
    companyDescription: "",
    companyName: "",
    companyEmail: "",
    country: "",
    apply: "",
    logoSRC: [],
    websiteURL: "",
  });
  const [errMsg, setErrmsg] = useState({
    jobTitle: "",
    jobType: "",
    location: "",
    applyLink: "",
    applyTemplate: "",
    jobDescription: "",
    companyName: "",
    companyEmail: "",
  });
  const inputEl = useRef(null);

  useEffect(() => {
    if (enableSubmit !== null) {
      let validation = Object.keys(errMsg).every((it) => errMsg[it] === "");
      if (validation) {
        alert("preview");
      }
    }
  }, [enableSubmit]);

  const handleValidation = useCallback(() => {
    let validationParams = { ...errMsg };

    if (!state.jobTitle) validationParams.jobTitle = "Enter the Job Title";
    else validationParams.jobTitle = "";

    if (state.jobType.length === 0)
      validationParams.jobType = "Select atleast one Job Type";
    else validationParams.jobType = "";

    if (
      state.location === "Other Location Requirements" &&
      (state.otherLocation.length === 0 ||
        (state.otherLocation.includes("Other, please specify: ") &&
          state.otherLocation.length <= 1 &&
          !state.otherTimezones))
    )
      validationParams.location = "Select or Enter atleast one Remote location";
    else validationParams.location = "";

    if (state.applyLink === "link" && !state.apply)
      validationParams.applyLink = "Field is required";
    else validationParams.applyLink = "";

    if (
      state.applyLink === "createForm" &&
      selectedTemplate === null
    )
      validationParams.applyTemplate =
        "Please select the template or create your own form";
    else validationParams.applyTemplate = "";

    if (!state.jobDescription)
      validationParams.jobDescription = "Enter the Job Description";
    else validationParams.jobDescription = "";

    if (!state.companyName)
      validationParams.companyName = "Company Name is required";
    else validationParams.companyName = "";

    if (!state.companyEmail.match(/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i))
      validationParams.companyEmail = "EmailId is Invalid";
    else validationParams.companyEmail = "";

    setErrmsg(validationParams);
  }, [errMsg, state, selectedTemplate]);

  const handleChange = useCallback((data, name) => {
    setState((prevState) => ({
      ...prevState,
      [name]: data,
    }));
    if (data === "Worldwide") {
      setErrmsg((prevState) => ({
        ...prevState,
        location: "",
      }));
    }
  }, []);

  const handleTrixChange = useCallback(
    (e, data, name) => {
      handleChange(data, name);
    },
    [handleChange]
  );

  const handleSubmit = useCallback(() => {
    handleValidation();
    setEnableSubmit(!enableSubmit);
  }, [enableSubmit, handleValidation]);

  const handleCreateForm = useCallback(
    (data) => {
      setIsModelOpen(false);
      setSelectedTemplate(data);
      data && handleChange("createForm", "applyLink");
    },
    [handleChange]
  );

  const handleApplyLinkSelect = useCallback(() => {
    handleChange("createForm", "applyLink");
    if (!selectedTemplate) {
      setIsModelOpen(true);
    }
  }, [handleChange, selectedTemplate]);

  const handlePreviewForm = useCallback(() => {
    let previewTemplate;
    switch (selectedTemplate) {
      case "Template 1":
        previewTemplate = <Template1 />;
        break;
      case "Template 2":
        previewTemplate = <Template2 />;
        break;
      case "Template 3":
        previewTemplate = <Template3 />;
        break;
      default:
        previewTemplate = <DND questions={createFormData} disableAction />;
        break;
    }
    return previewTemplate;
  }, [createFormData, selectedTemplate]);

  const handleTab = useCallback((tabName) => {
    setTabName(tabName);
  }, []);

  useEffect(() => {
    inputEl.current = (
      <ImgUpload
        label={"Drag 'n' drop icon here, or click to select icon"}
        handleFileSRC={(data) => handleChange(data, "logoSRC")}
        value={state.logoSRC}
      />
    );
  }, [handleChange, state.logoSRC]);

  console.log("state", state.logoSRC);

  return (
    <div className="jobPost">
      <div className="steps">
        <div
          className={tabName === "create" ? "activeSteps" : ""}
          onClick={() => handleTab("create")}
        >
          Create
        </div>
        <ArrowRightOutlined />
        <div
          className={tabName === "preview" ? "activeSteps" : ""}
          onClick={() => handleTab("preview")}
        >
          Preview & Publish
        </div>
      </div>
        <Card className={`${tabName !== "create" ? "d-none" : null} cardContainer`}>
          <div className="subTitle">About The Position</div>
          <Input
            label={"Job Title"}
            placeholder={"e.g. Software Developer, Project Manager"}
            required
            value={state.jobTitle}
            onChange={(data) => handleChange(data, "jobTitle")}
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
              {errMsg.jobType && (
                <span className="errMsg">
                  <ExclamationCircleFilled />
                  {errMsg.jobType}
                </span>
              )}
            </div>
          </div>
          <div className="remotelocation">
            <div className="fieldLabel">
              Remote Location<span className="requiredSymbol"> *</span>
            </div>
            <div>
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
            </div>
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
                    value={state.country}
                    onChange={(data) => handleChange(data, "country")}
                  />
                )}
              </div>
            )}
            {errMsg.location && (
              <span className="errMsg">
                <ExclamationCircleFilled />
                {errMsg.location}
              </span>
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
                value={state.apply}
                onChange={(data) => handleChange(data, "apply")}
                errMsg={errMsg.applyLink}
              />
            </div>
            <div className="or">
              <span>OR</span>
            </div>
          </div>
          <div className="createFormContainer">
            <RadioButton
              value={state.applyLink === "createForm"}
              onChange={handleApplyLinkSelect}
            />
            <div className="applicant-btn-container">
              <Button
                customStyles="applicantBtn"
                title={
                  <div>
                    Select template <b>OR</b> Create your own form
                  </div>
                }
                onClick={() => setIsModelOpen(true)}
              />
              <div className="applicant-template">
                {selectedTemplate && (
                  <span>
                    <i>{selectedTemplate}</i>
                    <img src={TickBadge} alt="tickBadge" />
                  </span>
                )}
              </div>
            </div>
            {errMsg.applyTemplate && (
              <span className="errMsg">
                <ExclamationCircleFilled />
                {errMsg.applyTemplate}
              </span>
            )}
          </div>
          <div className="description">
            <div className="fieldLabel">
              Job Description<span className="requiredSymbol"> *</span>
            </div>
            <ReactTrixRTEInput
              onChange={(e, data) =>
                handleTrixChange(e, data, "jobDescription")
              }
            />
            {errMsg.jobDescription && (
              <span className="errMsg">
                <ExclamationCircleFilled />
                {errMsg.jobDescription}
              </span>
            )}
          </div>

          <div className="aboutCompany">
            <div className="subTitle">About Your Company</div>
            <div className="aboutCompanyInputContainer">
              <Input
                label={"Company Name"}
                required
                value={state.companyName}
                onChange={(data) => handleChange(data, "companyName")}
                errMsg={errMsg.companyName}
              />
              <Input
                label={"Email"}
                required
                value={state.companyEmail}
                onChange={(data) => handleChange(data, "companyEmail")}
                errMsg={errMsg.companyEmail}
              />
            </div>
            <Input
              label={"Company's Website URL "}
              value={state.websiteURL}
              onChange={(data) => handleChange(data, "websiteURL")}
            />
            <div>
              <div className="fieldLabel">Logo</div>
              {inputEl.current}
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
        <Card className={`${tabName === "create" ? "d-none" : null} cardContainer`}>
          <Preview formValue={state} template={handlePreviewForm()} />
        </Card>
      <CreateForm
        isModelOpen={isModelOpen}
        handleModelClose={handleCreateForm}
        handleFormValidation={setCreateFormData}
      />
    </div>
  );
}

export default JobPostForm;
