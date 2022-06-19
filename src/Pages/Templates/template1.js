import React, { useState, useCallback } from "react";
import { Input, Select, FileUpload, DatePicker } from "../../Component/Fields";
import "./template.scss";
import {
  GenderOptions,
  HispanicOptions,
  RaceOptions,
  VeteranOptions,
  DisabilityOptions,
} from "../../assert/optionList";

function Template1(params) {
  const [state, setState] = useState({
    firstName: "",
    middleName: "",
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
    hispanic: "Please select",
    race: "Please select",
    veteran: "Please select",
    disability: "Please select",
    school: "",
  });

  const handleChange = useCallback((data, name) => {
    setState((prevState) => ({
      ...prevState,
      [name]: data,
    }));
  }, []);

  console.log("Template1", state);

  return (
    <div className="template1-block">
      <h3>Basic Details</h3>
      <div className="name-conatiner">
        <Input
          label="First Name"
          value={state.firstName}
          required
          onChange={(data) => handleChange(data, "firstName")}
        />
        <Input
          label="Middle Name"
          value={state.middleName}
          required
          onChange={(data) => handleChange(data, "middleName")}
        />
        <Input
          label="Last Name"
          value={state.lastName}
          required
          onChange={(data) => handleChange(data, "lastName")}
        />
      </div>
      <div>
        <DatePicker
          label="DOB"
          value={state.DOB}
          required
          onChange={(data) => handleChange(data, "DOB")}
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
      <div className="horizontal-line profile-block">
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
      <div className="horizontal-line">
        <h3>Voluntary Self-Identification</h3>
        <p>
          For government reporting purposes, we ask candidates to respond to the
          below self-identification survey. Completion of the form is entirely
          voluntary. Whatever your decision, it will not be considered in the
          hiring process or thereafter. Any information that you do provide will
          be recorded and maintained in a confidential file.
        </p>
        <p>
          As set forth in Synura Inc.’s Equal Employment Opportunity policy, we
          do not discriminate on the basis of any protected group status under
          any applicable law.
        </p>
        <Select
          label="Gender"
          Options={GenderOptions}
          value={state.gender}
          onChange={(data) => handleChange(data, "gender")}
        />
        <Select
          label="Are you Hispanic/Latino?"
          Options={HispanicOptions}
          value={state.hispanic}
          onChange={(data) => handleChange(data, "hispanic")}
        />
        {state.hispanic === "No" && (
          <Select
            label="Please identify your race"
            Options={RaceOptions}
            value={state.race}
            onChange={(data) => handleChange(data, "race")}
          />
        )}
        <br />
        <div>
          <a href="https://en.wikipedia.org/wiki/Wikipedia:Race_and_ethnicity">
            Race & Ethnicity Definitions
          </a>
          <br />
          <p>
            If you believe you belong to any of the categories of protected
            veterans listed below, please indicate by making the appropriate
            selection. As a government contractor subject to the Vietnam Era
            Veterans Readjustment Assistance Act (VEVRAA), we request this
            information in order to measure the effectiveness of the outreach
            and positive recruitment efforts we undertake pursuant to VEVRAA.
            Classification of protected categories is as follows:
          </p>
          <p>
            A "disabled veteran" is one of the following: a veteran of the U.S.
            military, ground, naval or air service who is entitled to
            compensation (or who but for the receipt of military retired pay
            would be entitled to compensation) under laws administered by the
            Secretary of Veterans Affairs; or a person who was discharged or
            released from active duty because of a service-connected disability.
          </p>
          <p>
            A "recently separated veteran" means any veteran during the
            three-year period beginning on the date of such veteran's discharge
            or release from active duty in the U.S. military, ground, naval, or
            air service.
          </p>
          <p>
            An "active duty wartime or campaign badge veteran" means a veteran
            who served on active duty in the U.S. military, ground, naval or air
            service during a war, or in a campaign or expedition for which a
            campaign badge has been authorized under the laws administered by
            the Department of Defense.
          </p>
          <p>
            An "Armed forces service medal veteran" means a veteran who, while
            serving on active duty in the U.S. military, ground, naval or air
            service, participated in a United States military operation for
            which an Armed Forces service medal was awarded pursuant to
            Executive Order 12985.
          </p>
          <Select
            label="Veteran Status"
            Options={VeteranOptions}
            value={state.veteran}
            onChange={(data) => handleChange(data, "veteran")}
          />
        </div>
        <div className="horizontal-line">
          <div className="voluntary-info">
            <span>Form CC-305</span>
            <span>OMB Control Number 1250-0005</span>
            <span>Expires 05/31/2023</span>
          </div>
          <h3>Voluntary Self-Identification of Disability</h3>
          <b>Why are you being asked to complete this form?</b>
          <p>
            We are a federal contractor or subcontractor required by law to
            provide equal employment opportunity to qualified people with
            disabilities. We are also required to measure our progress toward
            having at least 7% of our workforce be individuals with
            disabilities. To do this, we must ask applicants and employees if
            they have a disability or have ever had a disability. Because a
            person may become disabled at any time, we ask all of our employees
            to update their information at least every five years.
          </p>
          <p>
            Identifying yourself as an individual with a disability is
            voluntary, and we hope that you will choose to do so. Your answer
            will be maintained confidentially and not be seen by selecting
            officials or anyone else involved in making personnel decisions.
            Completing the form will not negatively impact you in any way,
            regardless of whether you have self-identified in the past. For more
            information about this form or the equal employment obligations of
            federal contractors under Section 503 of the Rehabilitation Act,
            visit the U.S. Department of Labor’s Office of Federal Contract
            Compliance Programs (OFCCP) website at
            <a href="www.dol.gov/ofccp."> www.dol.gov/ofccp</a>.
          </p>
          <b>How do you know if you have a disability?</b>
          <p>
            You are considered to have a disability if you have a physical or
            mental impairment or medical condition that substantially limits a
            major life activity, or if you have a history or record of such an
            impairment or medical condition.
          </p>
          <p>Disabilities include, but are not limited to:</p>
          <ul>
            <li>Autism</li>
            <li>
              Autoimmune disorder, for example, lupus, fibromyalgia, rheumatoid
              arthritis, or HIV/AIDS
            </li>
            <li>Blind or low vision</li>
            <li>Cancer</li>
            <li>Cardiovascular or heart disease</li>
            <li>Celiac disease</li>
            <li>Cerebral palsy</li>
            <li>Deaf or hard of hearing</li>
            <li>Depression or anxiety</li>
            <li>Diabetes</li>
            <li>Epilepsy</li>
            <li>
              Gastrointestinal disorders, for example, Crohn's Disease, or
              irritable bowel syndrome
            </li>
            <li>Intellectual disability</li>
            <li>Missing limbs or partially missing limbs</li>
            <li>
              Nervous system condition for example, migraine headaches,
              Parkinson’s disease, or Multiple sclerosis (MS)
            </li>
            <li>
              Psychiatric condition, for example, bipolar disorder,
              schizophrenia, PTSD, or major depression
            </li>
          </ul>
          <Select
            label="Disability Status"
            Options={DisabilityOptions}
            value={state.disability}
            onChange={(data) => handleChange(data, "disability")}
          />
          <p>
            <br />
            1Section 503 of the Rehabilitation Act of 1973, as amended. For more
            information about this form or the equal employment obligations of
            Federal contractors, visit the U.S. Department of Labor's Office of
            Federal Contract Compliance Programs (OFCCP) website at{" "}
            <a href="www.dol.gov/ofccp">www.dol.gov/ofccp</a>.
          </p>
          <p>
            PUBLIC BURDEN STATEMENT: According to the Paperwork Reduction Act of
            1995 no persons are required to respond to a collection of
            information unless such collection displays a valid OMB control
            number. This survey should take about 5 minutes to complete.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Template1;
