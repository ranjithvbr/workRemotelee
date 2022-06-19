import React from "react";
import { EnvironmentOutlined, AimOutlined } from "@ant-design/icons";
import BriefCase from "../../assert/Images/BriefCase.svg";
import "./preview.scss";
import { Button } from "../../Component/Fields";

export default function Preview({ formValue, template }) {
  return (
    <div>
      {/* <div className="left-nav">
        <div>Job Preview</div>
        <div>Job Description</div>
        <div>About the company</div>
        <div>Form</div>
      </div> */}
      <div>
      <div className="job-card-container">
        <div className="job-card">
          {formValue.logoSRC?.[0]?.preview ?
          <img
            alt="company logo"
            className="company-logo"
            src={formValue.logoSRC?.[0]?.preview}
          />
          : <div className="company-logo-letter">{formValue.companyName?.[0]?.toUpperCase()}</div>}
          <div className="job-card-content">
            {/* eslint-disable no-script-url */}
            <a className="job-title" href="JavaScript:Void(0);">
              {formValue.jobTitle}
            </a>
            <div>{formValue.companyName}</div>
            <div className="job-location">
              <img src={BriefCase} alt="job type" className="job-card-icon" />
              <span>
                {formValue.jobType.map((it, index) => {
                  return `${it}${
                    formValue.jobType.length - 1 !== index ? " / " : ""
                  }`;
                })}
              </span>
            </div>
            <div className="job-location">
              <EnvironmentOutlined className="job-card-icon" />
              <span>
                {formValue.location || formValue.otherLocation.map((it, index) => {
                  return `${it}${
                    formValue.otherLocation.length - 1 !== index ? " / " : ""
                  }`;
                })}
              </span>
            </div>
            <div className="job-location job-active-icon">
              <AimOutlined className="job-card-icon" />
              <span>Actively recruiting</span>
            </div>
            <span className="job-day">Just now</span>
          </div>
        </div>
      </div>
      <div className="job-details horizontal-line">
        <h2>{formValue.jobTitle}</h2>
        <h4>
          {formValue.companyName}{" "}
          <span className="job-details-day">Just now</span>
        </h4>
        <div className="job-location">
          <img src={BriefCase} alt="job type" className="job-card-icon" />
          <span>
            {formValue.jobType.map((it, index) => {
              return `${it}${
                formValue.jobType.length - 1 !== index ? " / " : ""
              }`;
            })}
          </span>
        </div>
        <div className="job-location">
          <EnvironmentOutlined className="job-card-icon" />
          <span>
            {formValue.location || formValue.otherLocation.map((it, index) => {
              return `${it}${
                formValue.otherLocation.length - 1 !== index ? " / " : ""
              }`;
            })}
          </span>
        </div>
        <div
          className="job-description"
          dangerouslySetInnerHTML={{ __html: formValue.jobDescription }}
        />
        <Button title={"Apply"} customStyles={"job-first-btn"} />
        <Button title={"Apply"} customStyles={"job-second-btn"} />
      </div>
      <div className="company-description horizontal-line">
        <h3>About the company</h3>
        <div className="about-company">
        {formValue.logoSRC?.[0]?.preview ?
          <img
            alt="company logo"
            className="company-logo"
            src={formValue.logoSRC?.[0]?.preview}
          />
          : <div className="company-logo-letter">{formValue.companyName?.[0]?.toUpperCase()}</div>}
          <div className="company-title">{formValue.companyName}</div>
        </div>
        {formValue.companyDescription && (
          <div
            className="company-description"
            dangerouslySetInnerHTML={{ __html: formValue.companyDescription }}
          />
        )}
      </div>
      {formValue.applyLink !== "link" && <div className="horizontal-line">{template}</div>}
      </div>
    </div>
  );
}
