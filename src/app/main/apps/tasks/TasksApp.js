import FusePageSimple from "@fuse/core/FusePageSimple";
import withReducer from "app/store/withReducer";
import { useEffect, useRef, useState  } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useDeepCompareEffect } from "@fuse/hooks";
import { styled } from "@mui/material/styles";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import TasksSidebarContent from "./TasksSidebarContent";
import TasksHeader from "./TasksHeader";
import TasksList from "./TasksList";
import reducer from "./store";
import { getTasks, getTasksdatiles } from "./store/tasksSlice";




const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
  },
}));

function TasksApp(props) {
  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const routeParams = useParams();
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [headerData, setheaderData] = useState(null);

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  useDeepCompareEffect(() => {
    let newIdes = {
      programId: parseInt(routeParams.programId),
      sessionId: parseInt(routeParams.sessionId),
    };
    dispatch(getTasks(newIdes));
  }, [dispatch]);

  useEffect(() => {
    getDatiles();
  }, [dispatch]);

  const getDatiles = async () => {
    let newIdes = {
      programId: parseInt(routeParams.programId),
      sessionId: parseInt(routeParams.sessionId),
    };
    let datiles = await dispatch(getTasksdatiles(newIdes));
    setheaderData(datiles?.payload);
  };

  useEffect(() => {
    setRightSidebarOpen(Boolean(routeParams.id));
  }, [routeParams]);

  return (
    <>
    <Root
      header={<TasksHeader data={headerData} pageLayout={pageLayout} />}
      content={<TasksList data={headerData}  />}
      ref={pageLayout}
      rightSidebarContent={<TasksSidebarContent />}
      rightSidebarOpen={rightSidebarOpen}
      rightSidebarOnClose={() => setRightSidebarOpen(false)}
      rightSidebarWidth={700}
      scroll={"normal"}
    />












    </>

  );
}

export default withReducer("tasksApp", reducer)(TasksApp);
