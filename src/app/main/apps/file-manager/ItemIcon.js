import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { amber, blue, green, grey, red ,orange } from '@mui/material/colors';

const TypeBadge = styled(Box)(({ theme, ...props }) => ({
  backgroundColor: {
    
    pdf: red[600],
    PDF: red[600],

    doc: blue[600],
    DOC: blue[600],

    docx: blue[600],
    DOCX: blue[600],

    rtf: blue[600],
    RTF: blue[600],

    xls: green[600],
    XLS: green[600],

    xlsx: green[600],
    XLSX: green[600],

    pptx: orange[600],
    PPTX: orange[600],

    txt: grey[600],
    TXT: grey[600],

    jpg: amber[600],
    JPG: amber[600],

    jpge: amber[600],
    JPGE: amber[600],

    svg: amber[600],
    SVG: amber[600],

    png: amber[600],
    PNG: amber[600],

    MP4: blue[600],
    mp4: blue[600],

    WAV: blue[600],
    wav: blue[600],

  }[props.color],
}));

function ItemIcon(props) {
  const { type } = props;
console.log("type",type)
  if (type === 'folder') {
    return (
      <FuseSvgIcon className="" size={56} color="disabled">
        heroicons-outline:folder
      </FuseSvgIcon>
    );
  }

  return (
    <div className="relative">
      <FuseSvgIcon className="" size={56} color="disabled">
        heroicons-outline:document
      </FuseSvgIcon>
      <TypeBadge
        color={type}
        className="absolute left-0 bottom-0 px-6 rounded text-12 font-semibold leading-20 text-white"
      >
        {type}
      </TypeBadge>
    </div>
  );
}

export default ItemIcon;
