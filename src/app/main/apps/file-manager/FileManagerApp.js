import withReducer from 'app/store/withReducer';
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useParams } from 'react-router-dom';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import DetailSidebarContent from './DetailSidebarContent';
import reducer from './store';
import { getItems, selectSelectedItem } from './store/itemsSlice';
import FileManagerHeader from './FileManagerHeader';
import FileManagerList from './FileManagerList';
import { DeleteItems } from 'src/constants/Apis';
import Popup from "src/components/popup";

function FileManagerApp() {

  const dispatch = useDispatch();

  const selectedItem = useSelector(selectSelectedItem);
  
  const routeParams = useParams();

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const [openPop, setOpenPop] = useState(false);

  const [SaveId, setSaveId] = useState(null);

  useEffect(() => {
    dispatch(getItems(routeParams.folderId));
  }, [dispatch, routeParams.folderId]);

  const deleteCard = async (id) => {
    setSaveId(id);
    setOpenPop(true);
  };

  const ConfirmDelete = async () => {
    setOpenPop(false);
    setTimeout(async () => {
      setOpenPop(false);
      await DeleteItems(SaveId);
      await dispatch(getItems(routeParams.folderId));
    }, 1000);
  };

const Refresh= async ()=>{
  await dispatch(getItems(routeParams.folderId));
}

  return (
    <>
    <FusePageCarded
      header={<FileManagerHeader />}
      content={<FileManagerList />}
      rightSidebarOpen={Boolean(selectedItem)}
      rightSidebarContent={<DetailSidebarContent 
        deleteCard={deleteCard}
        Refresh={Refresh}
      />}
      rightSidebarWidth={400}
      scroll={isMobile ? 'normal' : 'content'}
    />
    <Popup
    open={openPop}
    ConfirmDelete={() => ConfirmDelete()}
    handleClose={() => setOpenPop(false)}
    title={''}
  />


</>
  );
}

export default withReducer('fileManagerApp', reducer)(FileManagerApp);