import React, { useState, useRef } from 'react';

const TestComponent = () => {
    const [savedSelection, setSavedSelection] = useState(null);
    const containerRef = useRef(null);
    function handleMouseUp() {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            setSavedSelection(selection.getRangeAt(0));
        }
    }
    function handleRestoreSlectionClick() {
        if (savedSelection) {
            // Clear any existing highlights
            clearHighlights();
            // Create a new range based on the saved selection
            let restoredRange = document.createRange();
            restoredRange.setStart(savedSelection.startContainer, savedSelection.startOffset);
            restoredRange.setEnd(savedSelection.endContainer, savedSelection.endOffset);
            highlightSelectedText(restoredRange.cloneContents(), false);
            // Scroll to the highlighted text.
            if (containerRef.current && containerRef.current.scrollIntoView) {
                containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }
    function clearHighlights() {
        let nodes = document.querySelectorAll(".highlighted");
        nodes.forEach(node => {
            node.outerHTML = node.innerHTML;
        })
    }
    function highlightSelectedText(content, wrap = true) {
        const newNode = wrap ? document.createElement("span") : document.createDocumentFragment();
        if (wrap) newNode.className = "highlighted";
        try {
            if (wrap) newNode.appendChild(content);
            else newNode.append(content);
            let selection = window.getSelection();
            selection.removeAllRanges();
            let range = savedSelection;
            range.insertNode(newNode);
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }
    return (
        <div ref={containerRef} onMouseUp={handleMouseUp}>
            <p>
                Some text is here
                <span>and there</span>
                Should be able to select
                <div>and here is div</div>
            </p>
            {/* Restore the saved selection */}
            <button onClick={handleRestoreSlectionClick}>Restore Selection</button>
        </div>
    );
}

export default TestComponent;