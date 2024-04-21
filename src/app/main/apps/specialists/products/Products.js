import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import ProductsHeader from './ProductsHeader';
import ProductsTable from './ProductsTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash'
import { apiBaseUrl } from './../../../../../constants/config'

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
      searchField = `search:"${searchTxt}"`;
    }
    axios
      .post(
        `${apiBaseUrl}/graphql`,
        {
          "query": `query {
              GetAppUserList(
                userListInput:{
                  ${searchField}
                  role:"Doctor"
                  page:${page}
                  limit:${rowsPerPage}
                }
              ),
          {
            email
            gender
            role
            country
            verified
            id
          }
      }`,
        }
      ).then((res) => {
        setData(res.data.data.GetAppUserList)
      })



  }

  const getDataCounts = () => {

    let searchField = "";
    if (searchTxt !== "") {
      searchField = `search:"${searchTxt}"`;
    }


    axios
      .post(
        `${apiBaseUrl}/graphql`,
        {
          "query": `query {
            GetAppUserListCount(userListInput:{
                type:"count",
                role:"specialist",
                ${searchField}
            })
        }`,
        }
      ).then((res) => {
        setCounts(res.data.data.GetAppUserListCount)
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
      content={<ProductsTable counts={counts} data={data} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage} setPage={setPage} page={page} />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Products;
