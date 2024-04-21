import { Menu, Select, TextField, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import { useEffect, useState } from "react";

import { MuiColorInput } from 'mui-color-input'
import { set } from "lodash";
import { uploadFileData } from "src/constants/upload";
import { apiBaseUrl } from "src/constants/config";

function SubjectForm(props) {
    const [data, setData] = useState({
        title: "",
        description: "",
        age: 0,
        image: ""
    });



    const uploadFile = async (e) => {
        let filedata = await uploadFileData(e.target.files[0], "article_images");
        setData({ ...data, image: filedata.data.uploadFile });
    }
    useEffect(() => {
        if (props.mode === "edit") {
            setData({ ...data, ...props.data });
        }
    }, [props.data])

    return (<form className="w-full" onSubmit={(e) => {
        e.preventDefault();
        props.submit(data);
    }}>
        <div className="md:w-1/2 p-20">
            <TextField label={"Name (Ar)"} required email className={"w-full"} value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
        </div>

        <div className="md:w-1/2 p-20">
            <TextField multiline rows={8} label={"Description"} required email className={"w-full"} value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} />
        </div>

        <div className="md:w-1/2 p-20">
            <TextField type="number" multiline label={"Age"} required email className={"w-full"} value={data.age} onChange={(e) => setData({ ...data, age: e.target.value })} />
        </div>

        <div className="md:w-1/2 p-20">
            <div><input type="file" onChange={uploadFile} /></div>
            <div className="pt-20">{data.image !== "" && <img style={{ width: 300, height: "auto" }} src={apiBaseUrl + "/" + data.image} />}</div>
        </div>

        <div className="md:w-1/2 p-20" align="right">
            <Button color="primary" variant="contained" type="submit">Save</Button>
        </div>
    </form>)
}
export default SubjectForm;