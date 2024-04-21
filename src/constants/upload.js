import axios from "axios"
import { apiBaseUrl } from "./config"

export const uploadFileData = (file, dest) => {
    return new Promise((resolve) => {
        let formData = new FormData();
        formData.append("operations", `
        {"query":"mutation Mutation($file: Upload!, $dest: String!) {  uploadFile(file: $file, dest: $dest)}","operationName":"Mutation","variables":{"dest":"${dest}","file":null}}
        `);

        formData.append("map", `{"file": ["variables.file"]}`);
        formData.append("file", file);
        axios.post(`${apiBaseUrl}/graphql_upload`, formData).then((res) => {
            resolve(res.data);
        });
    })
}