
import axios from "./api";

import { ApiUploadFile, Graphql, ApiEngin , ApiUploadFileReplace , ApiDesktop } from "./methods";

export const UploadFile = async (file) => {
  let token = await localStorage.getItem("jwt_access_token");
  const formData = new FormData();
  Array.from(file)?.forEach((element, index) => {
    formData.append(`file`, element);
  });
  formData.append(`lengthFile`, JSON.stringify(Array.from(file).length));
  let res = await axios.post(ApiUploadFile, formData, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const UploadFileReplace = async (file,name) => {
  let token = await localStorage.getItem("jwt_access_token");
  const formData = new FormData();
  Array.from(file)?.forEach((element, index) => {
    formData.append(`file`, element);
  });
  formData.append(`name`, name);

  let res = await axios.post(ApiUploadFileReplace, formData, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const CreateProgram = async (
  img,
  title,
  country_id,
  chooseClass,
  target_audience,
  color,
  tags,
  current_progarm
) => {
  let data = JSON.stringify({
    query:
      "mutation request($data: CreateProgramInput) { CreateProgram(createProgramInput: $data) {  title } }",
    variables: {
      data: {
        title: title,
        country_id: country_id,
        class: chooseClass,
        target_audience: target_audience,
        color: color,
        image: img,
        tags:tags,
        current_progarm:current_progarm,
        type:"program"
      },
    },
  });
  let config = {
    method: "post",
    url: Graphql,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const GetProgramList = async () => {
  let data = {
    query: `query{
      ProgramList
    {
      id
      title
      image
      country_id {
        id
        name
      }
      class
      target_audience
      color
      tags {
        id
        name
      }
      current_progarm
      order
      type
    }
  }`,
  };
  let config = {
    method: "post",
    url: Graphql,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  let response = await axios.request(config);
  return response.data?.data?.ProgramList;
};

export const GetProgramSingle = async (id) => {
  let data = {
    query: `query{
      ProgramSingle(programId:${id})
    {
      id
      title
      image
    }
  }`,
  };
  let config = {
    method: "post",
    url: Graphql,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  let response = await axios.request(config);
  return response.data?.data?.ProgramSingle;
};

export const DeleteProgram = async (id) => {
  let data = JSON.stringify({
    query: `mutation{ DeleteProgram(programId: ${JSON.stringify(
      id
    )} ){ code message }}`,
  });
  let config = {
    method: "post",
    url: Graphql,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const UpdateProgram = async (
  id,
  image,
  title,
  country_id,
  chooseClass,
  target_audience,
  color,
  tags,
  current_progarm
) => {
  let data = JSON.stringify({
    query:
      "mutation request($data: CreateProgramInput) { UpdateProgram(createProgramInput: $data) {  code,message } }",
    variables: {
      data: {
        id: id,
        title: title,
        country_id: country_id,
        class: chooseClass,
        target_audience: target_audience,
        color: color,
        image: image,
        tags:tags,
        current_progarm:current_progarm,
        type:"program"
      },
    },
  });

  let config = {
    method: "post",
    url: Graphql,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const CreateSession = async (
  program_id,
  img,
  title,
  template,
  numberSession,
  tags,
  isTraining
) => {

  let data= JSON.stringify({
    query:
      "mutation request($data: CreateSessionInput) { CreateSession(createSessionInput: $data) {  title } }",
    variables: {
      data: {
        program_id:parseInt(program_id),
        image:img,
        title:title,
        template:template,
        numberSession:numberSession,
        tags:tags,
        type:"session",
        isTraining:isTraining
      },
    },
  });

  let config = {
    method: "post",
    url: Graphql,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const GeteSessionList = async (id) => {
  let data = {
    query: `query{
      SessionList(programId:${JSON.stringify(id)})
    {
      id
      program_id
      title
      image
      template
      numberSession
      tags {
        id
        name
      }
      isTraining
    }
  }`,
  };
  let config = {
    method: "post",
    url: Graphql,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  let response = await axios.request(config);
  return response.data?.data?.SessionList;
};

export const DeleteeSession = async (id) => {
  let data = JSON.stringify({
    query: `mutation{ DeleteSession(sessionId: ${JSON.stringify(
      id
    )} ){ code message }}`,
  });
  let config = {
    method: "post",
    url: Graphql,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const UpdateeSession = async (
  id,
  image,
  title,
  template,
  numberSession,
  tags,
  program_id,
  isTraining
) => {

  let data= JSON.stringify({
    query:
      "mutation request($data: CreateSessionInput) { UpdateSession(createSessionInput: $data) {  code message } }",
    variables: {
      data: {
        id:id,
        program_id:parseInt(program_id),
        image:image,
        title:title,
        template:template,
        numberSession:numberSession,
        isTraining:isTraining,
        tags:tags,
        type:"session"
      },
    },
  });

  let config = {
    method: "post",
    url: Graphql,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const CreateEngin = async (data) => {
  let res = await axios.post(ApiEngin, data);
  return res.data;
};

export const UpdateFolderNameEngin = async (data) => {
  let res = await axios.post(ApiEngin+"/file-manager/edit-folder", data);
  return res.data;
};

export const UpdateNameEngin = async (data) => {
  let res = await axios.post(ApiEngin+"/file-manager/edit-file", data);
  return res.data;
};

export const getSingleEngines = async (dataApi) => {
  try {
    const response = await axios.get(
      ApiEngin +
        "/single-id" +
        `?id=${dataApi?.id}&programId=${dataApi?.programId}&sessionId=${dataApi?.sessionId}`
    );
    const data = await response.data?.data;
    return data;
  } catch (error) {
    return null;
  }
};

export const getAllEngines = async (dataApi) => {
  try {
    const response = await axios.get(
      ApiEngin +
        "/all" +
        `?id=${dataApi?.id}&programId=${dataApi?.programId}&sessionId=${dataApi?.sessionId}`
    );
    const data = await response.data?.data;
    return data;
  } catch (error) {
    return null;
  }
};

export const CreateFileManager = async (data) => {
  let res = await axios.post(ApiEngin + "/file-manager", data);
  return res.data;
};

export const getItems = async (searchText) => {
  const response = await axios.get(
    ApiEngin + `/file-manager?searchText=${searchText}`
  );
  const data = await response.data;
  return data;
};

export const SinglegetItems = async (id) => {
  const response = await axios.get(ApiEngin + `/file-manager/id?id=${id}`);
  const data = await response.data?.data;
  return data;
};

export const getAppFileInOneProgram = async (id) => {
  const response = await axios.get(ApiEngin + `/file-manager/by-program?id=${id}`);
  const data = await response.data?.data;
  return data;
};

export const DeleteItems = async (id) => {
  const response = await axios.delete(ApiEngin + `/file-manager?id=${id}`);
  const data = await response.data?.data;
  return data;
};

export const getAllProgram = async (dataApi) => {
  try {
    const response = await axios.get(ApiEngin + "/program/reorder");
    const data = await response.data?.data;
    return data;
  } catch (error) {
    return null;
  }
};

export const ReorderProgram = async (arr) => {
  const response = await axios.post(ApiEngin + "/program/reorder", arr);
  const data = await response.data;
  return null;
};

export const ReorderSession = async (dataApi) => {
  const response = await axios.post(ApiEngin + "/session/reorder", dataApi);
  const data = await response.data;
  return null;
};

export const CheckFileManager = async (data) => {
  let res = await axios.get(ApiEngin + `/file-manager/check?name=${data}`);
  return res.data;
};

export const RemoveImageFileManager = async (data) => {
  let res = await axios.delete(
    ApiEngin + `/file-manager/remove-image?name=${data}`
  );
  return res.data;
};

export const CreateCountriesControll = async (data) => {
  let res = await axios.post(ApiEngin + "/countries_controll", data);
  return res.data;
};

export const GetCountriesControll = async () => {
  let res = await axios.get(ApiEngin + "/countries_controll");
  return res.data?.data;
};


export const CreateProgramCategory = async (data) => {
  let res = await axios.post(ApiEngin + "/program_category", data);
  return res.data;
};

export const GetProgramCategory = async () => {
  let res = await axios.get(ApiEngin + "/program_category");
  return res.data?.data;
};


export const CreateFileManagerForLinks = async (data) => {
  let res = await axios.post(ApiEngin + "/file-manager/links", data);
  return res.data;
}


export const DownloadProgram = async (data) => {
  let res = await axios.get(ApiDesktop + `/program/download/test?type=${data?.type}&program_id=${data?.program_id}&session_id=${data?.session_id}`);
  return res.data;
};