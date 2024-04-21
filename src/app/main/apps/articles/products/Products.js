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
          "query": "mutation GetArticleList($articleListInput: ArticleListInput) {\r\n  GetArticleList(articleListInput: $articleListInput) {\r\n    description\r\n    title\r\n    image\r\n    age\r\n    id\r\n  }\r\n}",
          "variables": {
            "articleListInput": {
              "page": page,
              "limit": rowsPerPage
            }
          }
        }
        //   {
        //     "query": `query {
        //       SubjectList(
        //         subjectInput:{
        //             ${searchField}
        //             page:${page}
        //             limit:${rowsPerPage}
        //           }
        //         ),
        //     {
        //       nameEn,
        //       nameAr,
        //       id
        //     }
        // }`,
        //   }
      ).then((res) => {
        setData(res.data.data.GetArticleList)
      })



  }

  const getDataCounts = () => {

    let searchField = "";
    if (searchTxt !== "") {
      searchField = `${searchTxt}`;
    }


    axios
      .post(
        `${apiBaseUrl}/graphql`,
        {
          "query": "mutation GetArticleList($articleListInput: ArticleListInput) {\r\n  GetArticleList(articleListInput: $articleListInput) {\r\n    description\r\n    title\r\n    image\r\n    age\r\n    id\r\n  }\r\n}",
          "variables": {
            "articleListInput": {
              type: "count",
              "search": searchField
            }
          }
        }
        // {
        //   "query": `query {
        //     SubjectListCount(subjectInput:{
        //         type:"count",
        //         ${searchField}
        //     })
        // }`,
        // }
      ).then((res) => {
        setCounts(res.data.data.GetArticleList)
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
