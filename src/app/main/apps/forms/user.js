import { Menu, Select, TextField, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import { useEffect, useState } from "react";


function UserForm(props) {
    const [data, setData] = useState({
        email: "",
        fname: "",
        lname: "",
        gender: "m",
        role: "family",
        phoneNo: ""
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
        <div className="lg:w-1/2 p-20">
            <TextField label={"Email"} required email className={"w-full"} value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
        </div>
        <div className="lg:w-1/2 p-20">
            <TextField label={"First name"} required className={"w-full"} value={data.fname} onChange={(e) => setData({ ...data, fname: e.target.value })} />
        </div>

        <div className="lg:w-1/2 p-20">
            <TextField label={"Last name"} required className={"w-full"} value={data.lname} onChange={(e) => setData({ ...data, lname: e.target.value })}
            />
        </div>

        {/* <div className="w-1/2 p-20">
            <FormControl className="w-full">
                <InputLabel>Role</InputLabel>
                <Select required label={"Role"} placeholder="Role" className="w-full" value={data.role}
                    onChange={(e) => setData({ ...data, role: e.target.value })}
                >
                    <MenuItem value={"specialist"}>Specialist</MenuItem>
                    <MenuItem value={"family"}>Family</MenuItem>
                </Select>
            </FormControl>
        </div> */}


        <div className="lg:w-1/2 p-20">
            <FormControl className="w-full">
                <InputLabel>Gender</InputLabel>
                <Select required label={"Gender"} placeholder="Gender" className="w-full" value={data.gender}
                    onChange={(e) => setData({ ...data, gender: e.target.value })}
                >
                    <MenuItem value={"m"}>Male</MenuItem>
                    <MenuItem value={"f"}>Female</MenuItem>
                </Select>
            </FormControl>
        </div>

        <div className="md:w-1/2 p-20">
            <TextField required label={"phone No."} className={"w-full"} value={data.phoneNo} onChange={(e) => setData({ ...data, phoneNo: e.target.value })} />
        </div>
        <div className="md:w-1/2 p-20" align="right">
            <Button color="primary" variant="contained" type="submit">Save</Button>
        </div>
    </form>)
}
export default UserForm;