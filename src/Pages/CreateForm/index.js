import React, { useState } from "react";
import { Modal } from "antd";
import { TextArea, Select, Button } from "../../Component/field";
import "./createForm.scss";
import { fieldOptionList, RequiredOptionList } from "../../assert/optionList";
import DNDForm from "./DNDForm/Container";

function CreateForm() {
  const [visible, setVisible] = useState(true);
  const [element, setElement] = useState([]);
  const [fieldValue, setFieldValue] = useState({
    id: "",
    question: "",
    field: "",
    required: ""
  });

  const handleAdd = () => {
    setElement([...element, {
      id: element.length,
      question: fieldValue.question,
      field: fieldValue.field,
      required: fieldValue.required
    }])
  };

  console.log("element", fieldValue);

  const handleBlur = () => {

  };

  const handleFieldValue = (data, name) => {
    setFieldValue((prevState) => ({
      ...prevState,
      [name]: data
    }))
  }

  return (
    <div>
      <Modal
        title="Create Form"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={700}
        className="createFormModal"
      >
        <div className="questionContainer">
          <TextArea
            label="Your Qusetion"
            customTextAreaStyles="textAreaFixedHeight"
            // errMsg={"Enter your question"}
            onBlur={handleBlur}
            onChange={(data)=>handleFieldValue(data, "question")}
          />
          <div className="fields">
            <Select Options={fieldOptionList} label={"Fields"} onChange={(data)=>handleFieldValue(data, "field")} />
            <Select Options={RequiredOptionList} label={"Field Required"} onChange={(data)=>handleFieldValue(data, "required")} />
            <Button title={"Add"} onClick={handleAdd} />
          </div>
          <TextArea customTextAreaStyles="fieldOption" label={"Radio Options"} />
          <div className="customForm">
            <h3>Custom Form</h3>
            <DNDForm questions={element} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CreateForm;
