import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import ProductsHeader from './ProductsHeader';
import ProductsTable from './ProductsTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash'
import { apiBaseUrl } from './../../../../../constants/config'
// import Popup from './../../users/popup';

function Products() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [counts, setCounts] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTxt, setSearchTxt] = useState("");

  const searchTxtFunc = debounce((text) => {
    setPage(0);
    setSearchTxt(text);
  }, 500);

  const getData = () => {


    let searchField = "";
    if (searchTxt !== "") {
      searchField = searchTxt;
    }
    axios({
      method: "post",
      url: `${apiBaseUrl}/graphql`,
      data: {
        "query": "query request($data: UserAppDesktopListInput) {  GetDesktopUserList(userAppDesktopListInput: $data) { date,_id,id,email,fname,lname,phoneNo,verified,accountType,gender,count,workplace,country,countryData {id,title} }}",
        "variables": {
          "data": {
            "page": page,
            "limit": rowsPerPage,
            "search": searchField
          }
        }
      }
    }).then((res) => {
      // axios
      //   .post(
      //     `${apiBaseUrl}/graphql`,
      //     {
      //       "query": `query {
      //           GetAppUserList(
      //             userListInput:{
      //               ${searchField}
      //               role:"Caregiver"
      //               page:${page}
      //               limit:${rowsPerPage}
      //             }
      //           ),
      //       {
      //         email
      //         gender
      //         role
      //         country
      //         verified
      //         id
      //       }
      //   }`,
      //     }
      //   ).then((res) => {
      setData(res.data.data.GetDesktopUserList)

      // if (res.data.data.GetDesktopUserList.length > 0) {
      //   setCounts(res.data.data.GetDesktopUserList[0].count)
      // }
    })



  }

  const getDataCounts = () => {

    let searchField = "";
    if (searchTxt !== "") {
      searchField = searchTxt;
    }


    axios
      .post(
        `${apiBaseUrl}/graphql`,
        {
          "query": "query request($data: UserAppDesktopListInput) {  GetDesktopUserListCount(userAppDesktopListInput: $data) }",
          "variables": {
            "data": {
              "type": "count",
              "search": searchField
            }
          }
        }
      ).then((res) => {
        setCounts(res.data.data.GetDesktopUserListCount)
      })

  }

  useEffect(() => {
    getData();
  }, [searchTxt, rowsPerPage, page])
  useEffect(() => {
    getDataCounts();
  }, [searchTxt])

  return (
    <FusePageCarded
      header={<ProductsHeader searchTxtFunc={searchTxtFunc} />}
      content={
        <>
          <ProductsTable counts={counts} data={data} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage} setPage={setPage} page={page} />}

        </>}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Products;
