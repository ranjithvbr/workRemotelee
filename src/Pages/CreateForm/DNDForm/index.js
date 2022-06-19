import React, { useState, useEffect, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Button,
  Input,
  RadioButton,
  Select,
  TextArea,
  FileUpload,
  DatePicker,
} from "../../../Component/Fields";
import { Radio } from "antd";
import { EditFilled, DeleteFilled, HolderOutlined } from "@ant-design/icons";
import "./dndForm.scss";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle, selectedEditColor) => ({
  padding: "0 8px",
  background: selectedEditColor ? "#d7d7d7" : "white",
  borderRadius: "4px",
  boxShadow: isDragging
    ? "0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)"
    : "",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#f0f0f0" : "",
});

export default function DND({
  questions = [],
  handleEdit,
  handleDelete,
  initialState,
  handleDnd,
  handleClear,
  disableAction,
  // handleSubmit
}) {
  const [selectedOptionValue, setSelectedOptionValue] = useState("");
  const [editIndex, setEditIndex] = useState("");
  const [items, setItems] = useState(questions);
  const [disableIcon, setDisableIcon] = useState(false);

  useEffect(() => {
    setItems(questions);
  }, [questions]);

  useEffect(() => {
    if (initialState) {
      setEditIndex("");
      setDisableIcon(false);
    }
  }, [initialState]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(reorderedItems);
    handleDnd(reorderedItems);
  };

  const handleQuestion = (data) => {
    switch (data?.field) {
      case "Input":
        return (
          <Input
            label={data.question}
            disabled
            required={data.required === "Yes"}
          />
        );
      case "Dropdown":
        return (
          <Select
            label={data.question}
            Options={data.options}
            required={data.required === "Yes"}
          />
        );
      case "Text Area":
        return (
          <TextArea
            label={data.question}
            disabled
            required={data.required === "Yes"}
          />
        );
      case "Radio Button":
        return (
          <div className="radioContainer">
            {data.question && (
              <label>
                {data.question}{" "}
                {data.required === "Yes" && (
                  <span className="requiredSymbol">*</span>
                )}
              </label>
            )}
            <Radio.Group value={selectedOptionValue}>
              {data.options.map((option) => {
                return (
                  <RadioButton
                    onChange={() => setSelectedOptionValue(option?.li)}
                    value={option?.li}
                    label={option.li}
                  />
                );
              })}
            </Radio.Group>
          </div>
        );
      case "Date Picker":
        return (
          <div className="radioContainer">
            {data.question && (
              <label>
                {data.question}{" "}
                {data.required === "Yes" && (
                  <span className="requiredSymbol">*</span>
                )}
              </label>
            )}
            <DatePicker disabled />
          </div>
        );
      case "File Upload":
        return (
          <div className="radioContainer">
            {data.question && (
              <label>
                {data.question}{" "}
                {data.required === "Yes" && (
                  <span className="requiredSymbol">*</span>
                )}
              </label>
            )}
            <FileUpload disabled />
          </div>
        );

      default:
        break;
    }
  };

  const handleEditFunc = useCallback(
    (index) => {
      handleEdit(index);
      setEditIndex(index);
      setDisableIcon(true);
    },
    [handleEdit]
  );

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd} className="dndContainer">
        <Droppable droppableId="droppable">
          {(droppableProvided, droppableSnapshot) => (
            <div
              ref={droppableProvided.innerRef}
              style={getListStyle(droppableSnapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      ref={disableIcon ? null : draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      style={getItemStyle(
                        draggableSnapshot.isDragging,
                        draggableProvided.draggableProps.style,
                        editIndex === item.id
                      )}
                    >
                      <div id={index}>
                        <div className="fieldRowContainer">
                          <div className="actinIconContainer">
                            {handleQuestion(item)}
                            {!disableAction ? (
                              <>
                                <EditFilled
                                  className={`${
                                    disableIcon ? "disableIcon" : ""
                                  } iconEdit`}
                                  onClick={
                                    disableIcon
                                      ? () => {}
                                      : () => handleEditFunc(item.id)
                                  }
                                />
                                <DeleteFilled
                                  className={`${
                                    disableIcon ? "disableIcon" : ""
                                  } iconDelete`}
                                  onClick={
                                    disableIcon
                                      ? () => {}
                                      : () => handleDelete(item.id)
                                  }
                                />
                              </>
                            ) : null}
                          </div>
                          {!disableAction ? (
                            <div className="dragDropIcon">
                              <HolderOutlined
                                className={disableIcon ? "disableIcon" : ""}
                                {...draggableProvided.dragHandleProps}
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {!disableAction ? (
        <div className="modelBtnfooter">
          <Button
            customStyles="cancelBtnStyle"
            title={"Clear"}
            onClick={handleClear}
          />
          {/* <Button title={"Submit"} onClick={handleSubmit} /> */}
        </div>
      ) : null}
    </div>
  );
}
