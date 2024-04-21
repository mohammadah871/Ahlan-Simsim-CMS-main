import Button from "@mui/material/Button";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useParams } from "react-router-dom";
import history from "@history";
import { apiBaseUrlImage, baseUrl } from "src/constants/config";
import i18n from "src/i18n";
import { useEffect, useState } from "react";
import { getAppFileInOneProgram } from "src/constants/Apis";
import Searchable from "react-searchable-dropdown";
import { Snackbar } from "@mui/material";

import { selectUser } from "app/store/userSlice";
import { useSelector } from "react-redux";


function TasksHeader({ data }) {
  const routeParams = useParams();
  const user = useSelector(selectUser);

  const [allData, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let d = await getAppFileInOneProgram(routeParams.programId);
    let local = [];
    d.forEach((element) => {
      console.log("element", element);
      local.push({ value: element?.image, label: element?.name });
    });
    setData([...local]);
  };

  const SelectValue = (value) => {
    setMessage("Copied to clibboard");
    setOpen(true);
    navigator.clipboard.writeText(apiBaseUrlImage + value);
  };

  return (
    <div className="flex flex-col sm:flex-row item-center sm:items-start space-y-16 sm:space-y-0 p-24 sm:p-32 w-full border-b-1 flex items-center justify-between">
      {data != null ? (
        <div className="flex flex-row items-center justify-center cursor-pointer">
          <div
            onClick={() =>
              history.push(`${baseUrl}programs/${routeParams.programId}`)
            }
          >
            {i18n.dir() == "rtl" ? (
              <FuseSvgIcon className="text-48" size={25} color="#555">
                heroicons-solid:arrow-right
              </FuseSvgIcon> 
            ) : (
              <FuseSvgIcon className="text-48" size={25} color="#555">
                heroicons-solid:arrow-left
              </FuseSvgIcon>
            )}
          </div>

          <div>
            <img
              style={{
                width: 100,
                objectFit: "contain",
                borderRadius: 10,
                marginLeft: 15,
                marginRight: 15,
              }}
              src={apiBaseUrlImage + data.program?.image}
            />
          </div>

          <div className="flex flex-col items-start justify-center cursor-pointer">
            <h1 style={{ marginLeft: 15 }}>
              {data.program?.title} / {data.session?.title}
            </h1>
          </div>
        </div>
      ) : null}

      <div style={{ marginTop: 20 }}>
        <Searchable
          value=""
          placeholder="Search files" // by default "Search"
          notFoundText="No result found" // by default "No result found"
          options={allData}
          onSelect={(value) => SelectValue(value)}
          listMaxHeight={500}
        />
      </div>


      {user?.role != "viewer" ?
      <div className="flex items-center items-center -mx-8">
        <Button
          className="mx-8 whitespace-nowrap"
          variant="contained"
          color="secondary"
          component={NavLinkAdapter}
          to="new/engine"
          style={{ marginTop: 33 }}
        >
          <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
          <span className="mx-8">Add Engine</span>
        </Button>
      </div>:null}

      <Snackbar
        message={message}
        style={{ marginTop: 75 }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      />
    </div>
  );
}

export default TasksHeader;
