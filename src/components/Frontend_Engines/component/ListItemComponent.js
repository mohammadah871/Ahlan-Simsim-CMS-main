import Highlighter from './SessionManager';
import './ProgramInnerSlide3.css';

const ListItemComponent = ({ data }) => {
    return (


        <div disabled={!data?.isButton}
            className='programInnerSlide3-listItemBtn'
        >
            {
                data?.isPoint &&
                <div className='programInnerSlide3-bullet' />
            }
            <span className='programInnerSlide3-label programInnerSlide3-titleDescription programInnerSlide3-alignTextRight'
                style={{
                    color: data?.isButton === true ? '#319BF7' : '#121027',
                    cursor: data?.isButton ? 'pointer' : 'default',
                    fontFamily: 'Medium',
                }}
            >
                {/* {data?.text} */}
                <Highlighter>{' ' + data?.text}</Highlighter>
       
            </span>
        </div >

    );
}

export default ListItemComponent;