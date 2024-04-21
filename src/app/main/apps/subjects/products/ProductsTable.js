import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { baseUrl, apiBaseUrl } from './../../../../../constants/config';

import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import ProductsTableHead from './ProductsTableHead';
import { Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ProductsTable(props) {

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });


  useEffect(() => {
    setData(props.data);
    setLoading(false)


  }, [props.data]);


  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order._id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n._id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    props.navigate(`${baseUrl}subjects/${item.id}/edit`);
  }


  function handleChangePage(event, value) {
    props.setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    props.setRowsPerPage(event.target.value);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  // if (data.length === 0) {
  //   return (
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1, transition: { delay: 0.1 } }}
  //       className="flex flex-1 items-center justify-center h-full"
  //     >
  //       <Typography color="text.secondary" variant="h5">
  //         There are no products!
  //       </Typography>
  //     </motion.div>
  //   );
  // }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <ProductsTableHead
            selectedProductIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={props.count}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {data.map((n) => {
              const isSelected = selected.indexOf(n._id) !== -1;
              return (
                <TableRow
                  className="h-72 cursor-pointer"
                  hover
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={n.id}
                  selected={isSelected}
                  onClick={(event) => handleClick(n)}
                >
                  {/* <TableCell className="w-40 md:w-64 text-center" padding="none">
                    <Checkbox
                      checked={isSelected}
                      onClick={(event) => event.stopPropagation()}
                      onChange={(event) => handleCheck(event, n._id)}
                    />
                  </TableCell> */}

                  <TableCell
                    className="w-52 px-4 md:px-0"
                    component="th"
                    scope="row"
                    padding="none"
                  >
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.nameEn}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.nameAr}
                  </TableCell>
                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    <div className='flex items-center'>
                      <Tooltip title="Edit"><EditIcon /></Tooltip>
                      <Tooltip title="Delete"><DeleteIcon /></Tooltip>
                    </div>

                  </TableCell>


                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={props.counts}
        rowsPerPage={props.rowsPerPage}
        page={props.page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(ProductsTable);
