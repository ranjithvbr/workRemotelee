import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  // Button,
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

// fake data generator
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: "8px",

  // change background colour if dragging
  background: "white",
  borderRadius: "4px",
  boxShadow: isDragging
    ? "0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)"
    : "",
  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#f0f0f0" : "",
  padding: "10px",
});

export default function DND({ questions = [] }) {
  const [selectedOptionValue, setSelectedOptionValue] = useState("");
  const [items, setItems] = useState(questions);

  useEffect(() => {
    setItems(questions);
  }, [questions]);

  const onDragEnd = (result) => {
    console.log("result", result);
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderedItems);
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

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  console.log("items", items);
  return (
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
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    style={getItemStyle(
                      draggableSnapshot.isDragging,
                      draggableProvided.draggableProps.style
                    )}
                  >
                    <div id={index}>
                      <div className="fieldRowContainer">
                        <div className="actinIconContainer">
                          {handleQuestion(item)}
                          <EditFilled className="iconEdit" />
                          <DeleteFilled className="iconDelete" />
                        </div>
                        <div className="dragDropIcon">
                          <HolderOutlined
                            {...draggableProvided.dragHandleProps}
                          />
                        </div>
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
  );
}
