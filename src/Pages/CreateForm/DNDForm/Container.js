import update from "immutability-helper";
import { useCallback, useEffect, useState } from "react";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Card } from "./Card.js";

export default function Container ({questions}){
    const [cards, setCards] = useState(questions);

    useEffect(() => {
        setCards(questions);
    }, [questions]);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
      setCards((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        })
      );
    }, []);

    const renderCard = useCallback((item, index) => {
      return (
        <Card
          key={item.id}
          index={index}
          id={item.id}
          data={item}
          moveCard={moveCard}
        />
      );
    }, [moveCard]);
    console.log("cards", questions);
    return (
        <DndProvider backend={HTML5Backend}>
            <div>{cards.length > 0 && cards.map((item, i) => renderCard(item, i))}</div>
        </DndProvider>
    );
};
