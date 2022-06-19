import React, { useCallback, useEffect, useState } from "react";
import { Modal, Radio } from "antd";
import { TextArea, Select, Button, RadioButton } from "../../Component/Fields";
import { ExclamationCircleFilled } from "@ant-design/icons";
import DND from "./DNDForm";
import Template1 from "../Templates/template1";
import Template2 from "../Templates/template2";
import Template3 from "../Templates/template3";
import {
  fieldOptionList,
  RequiredOptionList,
  templateOptionList,
} from "../../assert/optionList";
import "./createForm.scss";

function CreateForm({
  isModelOpen,
  handleModelClose,
  handleClear,
  handleSubmit,
  handleFormValidation,
}) {
  const [visible, setVisible] = useState(false);
  const [element, setElement] = useState([]);
  const [fieldOptions, setFieldOptions] = useState("");
  const [OptionList, setOptionList] = useState([]);
  const [selectedRadioOptionValue, setSelectedRadioOptionValue] = useState("");
  const [yourQuestionError, setYourQuestionError] = useState(false);
  const [optionErr, setOptionErr] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const [initialState, setInitialState] = useState(true);
  const [template, setTemplate] = useState("Template 1");
  const [createFormErr, setCreateFormErr] = useState("");
  const [fieldValue, setFieldValue] = useState({
    id: "",
    question: "",
    field: "",
    required: "",
    options: [],
  });

  useEffect(() => {
    setVisible(isModelOpen);
  }, [isModelOpen]);

  useEffect(() => {
    handleFormValidation(element);
  }, [element, handleFormValidation]);

  useEffect(() => {
    let list = [];
    fieldOptions?.split(",").forEach((data, index) => {
      if (data?.trim()) {
        list.push({ id: index, li: data });
      }
    });
    setOptionList(list);
  }, [fieldOptions, fieldValue.field]);

  const handleCancel = useCallback(() => {
    setFieldValue({
      id: "",
      question: "",
      field: "Input",
      required: "Yes",
      options: [],
    });
    setFieldOptions("");
    setEditIndex("");
    setInitialState(true);
  }, []);

  const handleAdd = useCallback(() => {
    if (!fieldValue.question) {
      setYourQuestionError(true);
      return;
    }
    if (
      (fieldValue.field === "Radio Button" && !OptionList.length > 0) ||
      (fieldValue.field === "Dropdown" && !OptionList.length > 0)
    ) {
      setOptionErr(true);
      return;
    }
    let count = 0;
    element?.filter((it) => {
      if (element.length + 1 <= Number(it.id.replace("item-", ""))) {
        count = Number(it.id.replace("item-", "")) + 1;
      } else {
        count = element.length;
      }
      return null;
    });
    setElement([
      ...element,
      {
        id: `item-${count}`,
        question: fieldValue.question,
        field: fieldValue.field,
        required: fieldValue.required,
        options: OptionList,
      },
    ]);
    handleCancel();
  }, [OptionList, element, fieldValue, handleCancel]);

  const handleBlur = useCallback(() => {
    if (fieldValue.question) {
      setYourQuestionError(false);
    }
    if (
      (fieldValue.field === "Radio Button" && OptionList.length > 0) ||
      (fieldValue.field === "Dropdown" && OptionList.length > 0)
    ) {
      setOptionErr(false);
      return;
    }
  }, [OptionList, fieldValue]);

  const handleFieldValue = useCallback((data, name) => {
    setFieldValue((prevState) => ({
      ...prevState,
      [name]: data,
    }));
  }, []);

  const handleEdit = useCallback(
    (editId) => {
      let filteredEle = element.filter((item) => editId === item.id);
      let { id, question, field, required, options } = filteredEle?.[0];
      setFieldValue({
        id,
        question,
        field,
        required,
        options,
      });
      let editOptions = options.map((li) => li?.li?.trim()).join(", ");
      setFieldOptions(editOptions);
      setEditIndex(editId);
      setInitialState(false);
    },
    [element]
  );

  const handleUpdate = useCallback(() => {
    if (!fieldValue.question) {
      setYourQuestionError(true);
      return;
    }

    let editedForm = [];
    element.forEach((item) => {
      if (item.id === editIndex) {
        editedForm.push({
          id: editIndex,
          question: fieldValue.question,
          field: fieldValue.field,
          required: fieldValue.required,
          options: OptionList,
        });
      } else {
        editedForm.push(item);
      }
    });

    setElement(editedForm);
    handleCancel();
  }, [OptionList, editIndex, element, fieldValue, handleCancel]);

  const handleDelete = useCallback(
    (deleteId) => {
      let filteredData = element?.filter((it) => it.id !== deleteId);
      setElement(filteredData);
    },
    [element]
  );

  const handleModalClose = useCallback(() => {
    setVisible(false);
    handleModelClose(null);
  }, [handleModelClose]);

  const handleOk = useCallback(() => {
    if (element.length > 0 || template !== "Custom Form") {
      setVisible(false);
      handleModelClose(template);
    } else {
      setCreateFormErr("Add atleast one field");
    }
  }, [element.length, handleModelClose, template]);

  console.log("template", template);

  return (
    <div className="create-form">
      <Modal
        title="Create Form"
        visible={visible}
        onCancel={handleModalClose}
        width={800}
        className="createFormModal"
        onOk={handleOk}
        okText={"Select " + template}
      >
        <div className="templateOption">
          {templateOptionList.map((it) => {
            return (
              <RadioButton
                value={it.value === template}
                label={it.label}
                onChange={() => setTemplate(it.value)}
                helperText={it.helperText}
              />
            );
          })}
        </div>
        <div className="horizontal-line">
          {template === "Template 1" && <Template1 />}
          {template === "Template 2" && <Template2 />}
          {template === "Template 3" && <Template3 />}
          {template === "Custom Form" && (
            <div className="questionContainer">
              <TextArea
                required
                label="Your Qusetion"
                customTextAreaStyles="textAreaFixedHeight"
                errMsg={yourQuestionError && "Enter your question"}
                onBlur={handleBlur}
                onChange={(data) => handleFieldValue(data, "question")}
                value={fieldValue.question}
              />
              <div className="fields">
                <Select
                  required
                  Options={fieldOptionList}
                  label={"Fields"}
                  onChange={(data) => handleFieldValue(data, "field")}
                  value={fieldValue.field}
                />
                <Select
                  required
                  Options={RequiredOptionList}
                  label={"Field Required"}
                  onChange={(data) => handleFieldValue(data, "required")}
                  value={fieldValue.required}
                />
                {editIndex || editIndex === 0 ? (
                  <>
                    <Button
                      customStyles="cancelBtnStyle"
                      title={"Cancel"}
                      onClick={handleCancel}
                    />
                    <Button title={"Update"} onClick={handleUpdate} />
                  </>
                ) : (
                  <Button title={"Add"} onClick={handleAdd} />
                )}
              </div>
              <div className="optionContainer">
                {(fieldValue.field === "Radio Button" ||
                  fieldValue.field === "Dropdown") && (
                  <div>
                    <TextArea
                      customTextAreaStyles="fieldOption"
                      onChange={setFieldOptions}
                      label={`${
                        fieldValue.field === "Radio Button"
                          ? "Radio"
                          : fieldValue.field === "Dropdown"
                          ? "Dropdown"
                          : ""
                      } Options`}
                      value={fieldOptions}
                      errMsg={optionErr && "Enter dropdown option"}
                      onBlur={handleBlur}
                    />
                    <Radio.Group value={selectedRadioOptionValue}>
                      {fieldValue.field === "Radio Button" &&
                        OptionList.map((data) => {
                          return (
                            <RadioButton
                              onChange={() =>
                                setSelectedRadioOptionValue(data?.li)
                              }
                              value={data?.li}
                              label={data.li}
                            />
                          );
                        })}
                    </Radio.Group>
                    {fieldValue.field === "Dropdown" &&
                      OptionList.length > 0 && (
                        <Select Options={OptionList} onChange={() => {}} />
                      )}
                  </div>
                )}
              </div>
              {createFormErr && element.length === 0 && (
                <span className="create-form-err-msg">
                  <ExclamationCircleFilled />
                  {createFormErr}
                </span>
              )}
              {element.length > 0 && (
                <div className="customForm">
                  <div className="previewSubtitle">Preview</div>
                  <DND
                    questions={element}
                    initialState={initialState}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleDnd={setElement}
                    handleClear={() => {
                      setElement([]);
                      handleCancel();
                    }}
                    // handleSubmit={handleModalClose}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default CreateForm;
