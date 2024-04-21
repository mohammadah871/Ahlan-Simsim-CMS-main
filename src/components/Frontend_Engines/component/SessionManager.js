import React from 'react';
import { useState } from 'react';

const Highlighter = ({ children, isSameText }) => {
    const [isMouseDown, setIsMouseDown] = useState(false);

    const onMouseDownHandler = () => {
        setIsMouseDown(true);
    }

    const onMouseUpHandler = (e) => {
        setIsMouseDown(false);
        highlightSelection22(e);
    }

    const onMouseLeaveHandler = (e) => {
        if (!isMouseDown)
            return;
        onMouseUpHandler(e);
    }




    function highlightSelection22(e) {
        console.clear();
        var selection = window.getSelection().getRangeAt(0);
        if (isSameText !== true) {
            let t = window.getSelection().toString().split(/\r?\n/);
            if (t.length > 1)
                return;
        }

        var selectedText = selection.extractContents();

        var span = document.createElement("span");
        span.style.backgroundColor = "rgba(255,0,0,.35)";
        span.appendChild(selectedText);
        selection.insertNode(span);
        e.currentTarget.selectionStart = 0;
        e.currentTarget.selectionEnd = 0;
    }





    return <div className="highlighter" onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} onMouseLeave={onMouseLeaveHandler}>{children}</div>;

};

export default Highlighter;