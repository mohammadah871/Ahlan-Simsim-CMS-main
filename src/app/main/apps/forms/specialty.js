import { Menu, Select, TextField, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import { useEffect, useState } from "react";


function UserForm(props) {
    const [data, setData] = useState({
        nameAr: "",
        nameEn: ""
    });

    useEffect(() => {
        if (props.mode === "edit") {
            setData(props.data);
        }
    }, [props.data])

    return (<form className="w-full" onSubmit={(e) => {
        e.preventDefault();
        props.submit(data);
    }}>
        <div className="md:w-1/2 p-20">
            <TextField label={"Name (Ar)"} required email className={"w-full"} value={data.nameAr} onChange={(e) => setData({ ...data, nameAr: e.target.value })} />
        </div>

        <div className="md:w-1/2 p-20">
            <TextField label={"Name (En)"} required email className={"w-full"} value={data.nameEn} onChange={(e) => setData({ ...data, nameEn: e.target.value })} />
        </div>

        <div className="md:w-1/2 p-20" align="right">
            <Button color="primary" variant="contained" type="submit">Save</Button>
        </div>
    </form>)
}
export default UserForm;