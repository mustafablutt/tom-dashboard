import { useState } from "react";
import { DroppedItem } from "../../../interfaces/Interfaces";
import { DraggableCheckbox } from "./draggableCheckbox";
import { DraggableInput } from "./draggableInput";
import { DraggableRadioButton } from "./draggableRadioButton";
import { DraggableSelect } from "./draggableSelect";
import { useDrop } from "react-dnd";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

export const GridCell: React.FC<{
    gridSize: any;
    rowIndex: number;
    colIndex: number;
    onItemAdded: (item: DroppedItem, rowIndex: number, colIndex: number) => void;
  }> = ({ gridSize, rowIndex, colIndex, onItemAdded }) => {
    const classes = useStyles();
    const [content, setContent] = useState<JSX.Element[]>([]);
    const handleItemAdded = (item: DroppedItem) => {
      onItemAdded(item, rowIndex, colIndex);
    };
    const removeItem = (id: number) => {
      setContent((prev) => prev.filter((item) => item.props.id !== id));
    };
  
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
      accept: ["input", "checkbox", "select", "radio"],
      drop: (item: DroppedItem, monitor) => {
        console.log("Dropped item:", item);
        handleItemAdded(item);
        const uniqueId = Date.now() + Math.random();
        setContent((prev) => [
          ...prev,
          item.type === "checkbox" ? (
            <DraggableCheckbox
              key={uniqueId}
              id={uniqueId}
              checked={item.checked}
              label={item.label}
              color={item.color}
              variant={item.variant}
              size={item.size}
              onRemove={removeItem}
              showClearIcon={true}
            />
          ) : item.type === "select" ? (
            <DraggableSelect
              key={uniqueId}
              id={uniqueId}
              option1="DOG"
              option2="CAT"
              placeholder={item.placeholder}
              color={item.color}
              size={item.size}
              variant={item.variant}
              onRemove={removeItem}
              showClearIcon={true}
            />
          ) : item.type === "radio" ? (
            <DraggableRadioButton
              key={uniqueId}
              id={uniqueId}
              option1="Radio1"
              option2="Radio2"
              option3="Radio3"
              placeholder={item.placeholder}
              color={item.color}
              size={item.size}
              variant={item.variant}
              type={item.type}
              onRemove={removeItem}
              showClearIcon={true}
            />
          ) : (
            <DraggableInput
              key={uniqueId}
              id={uniqueId}
              type={item.type}
              value={item.value || ""}
              placeholder={item.placeholder}
              color={item.color}
              variant={item.variant}
              size={item.size}
              onRemove={removeItem}
              showClearIcon={true}
            />
          ),
        ]);
      },
  
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }));
  
    const isActive = canDrop && isOver;
    const backgroundColor = isActive ? "#7947ca" : "white";
  
    return (
      <Grid
        item
        xs={gridSize}
        key={colIndex}
        ref={drop}
        style={{ background: backgroundColor }}
      >
        <Paper>
          {content.length === 0 && (
            <div className={classes.paper}>{`Grid ${rowIndex + 1}-${
              colIndex + 1
            }`}</div>
          )}
  
          {content.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </Paper>
      </Grid>
    );
  };
  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));