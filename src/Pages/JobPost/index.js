import React, { useState } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Card, Radio } from "antd";
import Input from "../../Component/Input";
import Checkbox from "../../Component/Checkbox";
import RadioButton from "../../Component/RadioButton";
import Button from "../../Component/Button";
import Trix from "trix";
import { ReactTrixRTEInput } from "react-trix-rte";
import "./jobpost.scss";

function JobPostForm() {
  const [remoteLocation, setRemoteLocation] = useState(true);
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
        />
        <div className="categoryRowContainer">
          <Input label={"Category"} required />
          <div className="jobType">
            <div className="fieldLabel">
              Job Type <span className="requiredSymbol"> *</span>
            </div>
            <div className="checkboxContainer">
              <Checkbox label={"Full-time"} />
              <Checkbox label={"Contract"} />
              <Checkbox label={"Part-time"} />
              <Checkbox label={"Freelance"} />
              <Checkbox label={"Internship"} />
            </div>
          </div>
        </div>
        <div className="remotelocation">
          <div className="fieldLabel">
            Remote Location<span className="requiredSymbol"> *</span>
          </div>
          <Radio.Group
            value={remoteLocation}
            onChange={() => setRemoteLocation(!remoteLocation)}
          >
            <RadioButton label={"Worldwide"} value={true} />
            <RadioButton label={"Other Location Requirements"} value={false} />
          </Radio.Group>
          {!remoteLocation &&
            <>
              <div className="otherLocation">
                <Checkbox label={"America"} />
                <Checkbox label={"Europe"} />
                <Checkbox label={"Germany"} />
                <Checkbox label={"UK"} />
                <Checkbox label={"Canada"} />
                <Checkbox label={"France"} />
                <Checkbox label={"India"} />
                <Checkbox label={"Spain"} />
                <Checkbox label={"Australia"} />
                <Checkbox label={"US timezones"} />
                <Checkbox label={"European timezones"} />
                <Checkbox label={"UK timezones"} />
                <Checkbox label={"Other, please specify: "} />
              </div>
              <Input placeholder={"Countries, regions, timezones"} />
            </>
          }
        </div>
        <Input label={"Salary"} />
        <div className="application">
          <div className="fieldLabel">
            How to apply<span className="requiredSymbol"> *</span>
          </div>
          <Input placeholder={"Link to Application page or Email address."} />
          <div className="or">
            <span>OR</span>
          </div>
        </div>
        <Button
          customStyles="applicantBtn"
          title={"Create form for applicant"}
        />
        <div className="description">
          <div className="fieldLabel">
            Job Description<span className="requiredSymbol"> *</span>
          </div>
          <ReactTrixRTEInput />
        </div>

        <div className="aboutCompany">
          <div className="subTitle">Tell Us More About Your Company</div>
          <div className="aboutCompanyInputContainer">
            <Input label={"Company Name"} required />
            <Input label={"Email"} required />
          </div>
          <div className="description">
            <div className="fieldLabel">Company Description</div>
            <ReactTrixRTEInput />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default JobPostForm;
