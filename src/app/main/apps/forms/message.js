import { Menu, Select, TextField, MenuItem, FormControl, InputLabel, Button, Table } from "@mui/material";
import { useEffect, useState } from "react";
import { socket } from './../../../../socket'


function SubjectForm(props) {
    const [data, setData] = useState({
        nameAr: "",
        nameEn: ""
    });
    const [messagesData, setMessagesData] = useState([])

    useEffect(() => {
        // if (props.mode === "edit") {
        //     setData({ ...data, ...props.data });
        // }
        // alert("test222")
        socket.on("get message", (messages) => {
            // alert("test")
            // console.log(messages)
            setMessagesData(messages.messages);
            // console.log("messages", messages);
        });
    }, [])

    return (<form className="w-full" onSubmit={(e) => {
        // console.log("wwwww")
        e.preventDefault();
        socket.emit("add message", { name: data.nameAr })


        let messageData2 = [...messagesData];
        messageData2.push({
            created: new Date().toISOString(),
            title: data.nameAr
        })
        setMessagesData(messageData2)
        // props.submit(data);
    }}>
        <div className="w-1/2 p-20">
            <TextField label={"Name (Ar)"} required email className={"w-full"} value={data.nameAr} onChange={(e) => setData({ ...data, nameAr: e.target.value })} />
        </div>

        <div className="w-1/2 p-20" align="right">
            <Button color="primary" variant="contained" type="submit">Save</Button>
        </div>

        <table border={"1"} cellPadding={"10"} cellSpacing={"10"}>
            <tr>
                <th>Name</th>
                <th>created</th>
            </tr>
            {messagesData.map((item) => {
                return (<tr>
                    <th>{item.title}</th>
                    <th>{item.created}</th>
                </tr>)
            })}
        </table>
    </form>)
}
export default SubjectForm;