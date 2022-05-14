import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Button, Input, RadioButton, Select, TextArea } from "../../../Component/field";

const style = {
  backgroundColor: "white",
  cursor: "move",
};

export const Card = ({ id, data, index, moveCard }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const handleQuestion = (data) => {
      switch (data?.field) {
          case "Input Box":
              return <Input label={data.question} disabled required={data.required === "Yes"} />;
          case "Select (Dropdown)":
              return <Input label={data.question} disabled required={data.required === "Yes"} />;
          case "Text Area Box":
              return <TextArea label={data.question} disabled required={data.required === "Yes"} />;
          case "Radio Button":
              return <Input label={data.question} disabled required={data.required === "Yes"} />;
          default:
              break;
      }
  }

  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
        {handleQuestion(data)}
    </div>
  );
};
