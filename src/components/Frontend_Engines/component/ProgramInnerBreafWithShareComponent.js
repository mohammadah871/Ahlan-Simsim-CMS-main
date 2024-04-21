import React, { useState } from 'react';
import './ProgramInnerBreafWithShareComponent.css';
import Highlighter from './SessionManager';
import ButtonCircularComponent from './ButtonCircularComponent';
import iconWhatsApp from '../icons/iconWhatsapp.svg';
import iconFacebook from '../icons/iconFacebook.svg';
import iconTelegram from '../icons/iconTelegram.svg';
import iconCopy from '../icons/iconCopy.svg';
import ButtonCustomizedComponent from './ButtonCustomizedComponent';

const ProgramInnerBreafWithShareComponent = ({ data, width, bgColor, borderColor }) => {

    const onWhatsAppClicked = () => {

    }

    return (<div id='text' className="programInnerBreafWithShare-textContainer" dir='rtl' style={{ backgroundColor: bgColor ? bgColor : '#F2F4FD', width: width ? width : null, borderColor: borderColor ? borderColor : null, borderWidth: borderColor ? '1px' : 0 }}>
        <div className='programInnerBreafWithShare-panelRight'>
            {
                data?.contentHtml?
                    <>
                        {data?.title &&
                            < span className="programInnerBreafWithShare-label programInnerBreafWithShare-title">
                                {data?.title}
                            </span>
                        }
                        <div className="programInnerBreafWithShare-label programInnerBreafWithShare-description" dangerouslySetInnerHTML={{ __html: data?.contentHtml }} />
                    </>
                    :
                    <Highlighter isSameText={true}>
                        <span className="programInnerBreafWithShare-label programInnerBreafWithShare-title">
                            {data?.title}
                            {'\n'}
                            <span className="programInnerBreafWithShare-label programInnerBreafWithShare-description"
                            >
                                <br />{data?.description}
                            </span>
                        </span>
                    </Highlighter>
            }
        </div>
        <div className='programInnerBreafWithShare-panelLeft' dir="rtl">
            <ButtonCustomizedComponent
                // isCentered={true}
                icon={iconCopy}
                label="نسخ النص"
                isBold={true}
                borderColor="#D3D8E2"
                bgColor="transparent"
                fontColor="#121027"
                isCentered={true}
            />
            <span className='programInnerBreafWithShare-horizontalMargin' />
            <span className="programInnerBreafWithShare-label programInnerBreafWithShare-description"
            >شارك عبر:</span>
            <ButtonCircularComponent
                icon={iconWhatsApp}
                isCircular={false}
                bgColor="#00D95F"
                borderColor={'transparent'}
                size={17}
                onClickCallback={onWhatsAppClicked}
            />
            <ButtonCircularComponent
                icon={iconTelegram}
                isCircular={false}
                bgColor="#0088CC"
                borderColor={'transparent'}
                size={17}
                onClickCallback={onWhatsAppClicked}
            />
            <ButtonCircularComponent
                icon={iconFacebook}
                isCircular={false}
                bgColor="#1877F2"
                borderColor={'transparent'}
                size={17}
                onClickCallback={onWhatsAppClicked}
            />
        </div>
    </div >)
}

export default ProgramInnerBreafWithShareComponent;