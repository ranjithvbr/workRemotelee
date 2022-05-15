import React, { useCallback, useEffect, useState } from "react";
import { Modal, Radio } from "antd";
import { TextArea, Select, Button, RadioButton } from "../../Component/Fields";
import "./createForm.scss";
import { fieldOptionList, RequiredOptionList } from "../../assert/optionList";
import DNDForm from "./DNDForm/Container";

function CreateForm() {
  const [visible, setVisible] = useState(true);
  const [element, setElement] = useState([]);
  const [fieldOptions, setFieldOptions] = useState("");
  const [OptionList, setOptionList] = useState([]);
  const [selectedRadioOptionValue, setSelectedRadioOptionValue] = useState("");
  const [yourQuestionError, setYourQuestionError] = useState(false);
  const [fieldValue, setFieldValue] = useState({
    id: "",
    question: "",
    field: "",
    required: "",
    options: [],
  });

  useEffect(() => {
    let list = [];
    fieldOptions?.split(",").forEach((data, index) => {
      if (data?.trim()) {
        list.push({ id: index, li: data });
      }
    });
    setOptionList(list);
  }, [fieldOptions, fieldValue.field]);

  const handleAdd = useCallback(() => {
    if(!fieldValue.question) {
      setYourQuestionError(true);
      return;
    };
    setElement([
      ...element,
      {
        id: element.length,
        question: fieldValue.question,
        field: fieldValue.field,
        required: fieldValue.required,
        options: OptionList,
      },
    ]);
    setFieldValue({
      id: "",
      question: "",
      field: "Input Box",
      required: "Yes",
      options: [],
    });
    setFieldOptions("")
  }, [OptionList, element, fieldValue]);

  const handleBlur = useCallback(() => {
    if(fieldValue.question) {
      setYourQuestionError(false);
    };
  }, [fieldValue.question]);

  const handleFieldValue = useCallback((data, name) => {
    setFieldValue((prevState) => ({
      ...prevState,
      [name]: data,
    }));
  }, []);

  console.log("OptionList", fieldValue);

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
            errMsg={yourQuestionError && "Enter your question"}
            onBlur={handleBlur}
            onChange={(data) => handleFieldValue(data, "question")}
            value={fieldValue.question}
          />
          <div className="fields">
            <Select
              Options={fieldOptionList}
              label={"Fields"}
              onChange={(data) => handleFieldValue(data, "field")}
              value={fieldValue.field}
            />
            <Select
              Options={RequiredOptionList}
              label={"Field Required"}
              onChange={(data) => handleFieldValue(data, "required")}
              value={fieldValue.required}
            />
            <Button title={"Add"} onClick={handleAdd} />
          </div>
          <div className="optionContainer">
            {(fieldValue.field === "Radio Button" ||
              fieldValue.field === "Dropdown Box") && (
              <div>
                <TextArea
                  customTextAreaStyles="fieldOption"
                  onChange={setFieldOptions}
                  label={`${
                    fieldValue.field === "Radio Button"
                      ? "Radio"
                      : fieldValue.field === "Dropdown Box"
                      ? "Dropdown"
                      : ""
                  } Options`}
                  value={fieldOptions}
                />
                <Radio.Group value={selectedRadioOptionValue}>
                  {fieldValue.field === "Radio Button" &&
                    OptionList.map((data) => {
                      return (
                        <RadioButton
                          onChange={() => setSelectedRadioOptionValue(data?.li)}
                          value={data?.li}
                          label={data.li}
                        />
                      );
                    })}
                </Radio.Group>
                {fieldValue.field === "Dropdown Box" && (
                  <Select Options={OptionList} />
                )}
              </div>
            )}
          </div>
          {element.length > 0 && <div className="customForm">
            <div className="previewSubtitle">Preview - which will seen by applicant</div>
            <DNDForm questions={element} />
          </div>}
        </div>
      </Modal>
    </div>
  );
}

export default CreateForm;
