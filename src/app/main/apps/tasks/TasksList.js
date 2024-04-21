import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { getTasks, reorderList, selectTasks } from "./store/tasksSlice";
import TaskListItem from "./TaskListItem";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";
function TasksList() {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const tasks = useSelector(selectTasks);

  const [data_save, setSaveData] = useState([...tasks]);
  const [IfDrag, setIfDrag] = useState(false);

  useEffect(() => {
    setSaveData([...tasks]);
  }, [tasks]);

  if (!data_save) {
    return null;
  }

  if (data_save.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="text.secondary" variant="h5">
          There are no engines!
        </Typography>
      </div>
    );
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    var temp = [...data_save];

    var source = temp[result.source.index];

    var destination = result.destination.index;

    var destination_order = temp[result.destination.index]?.order;

    var source_order = temp[result.source.index]?.order;

    var destination_id = temp[result.destination.index]?.id;

    var source_id = temp[result.source.index]?.id;

    temp.splice(result.source.index, 1);

    temp.splice(destination, 0, source);

    setSaveData([...temp]);

    dispatch(
      reorderList({

        arr: [...temp],

        destination_order: destination_order,
        source_order: source_order,

        destination_id: destination_id,
        source_id: source_id,

        programId: parseInt(routeParams.programId),
        sessionId: parseInt(routeParams.sessionId)
        
      })
    );
  }

  return (
    <List
      style={{ maxWidth: "100%", width: "100%" }}
      className="w-full m-0 p-0"
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list" type="list" direction="vertical">
          {(provided) => (
            <>
              <div ref={provided.innerRef}>
                {data_save.map((item, index) => {
                  return (
                    <TaskListItem
                      data={item}
                      index={index}
                      key={item.id}
                      disabled={IfDrag}
                    />
                  );
                })}
              </div>
              {provided.placeholder}
            </>
          )}
        </Droppable>
      </DragDropContext>
    </List>
  );
}

export default TasksList;
