import { useEffect , useState , useRef } from 'react';
function MyComponent() {
    const ref= useRef()
    const [selectedText, setSelectedText] = useState("");
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [divIds, setDivIds] = useState([]); // <-- Changed `const` to `let`

    const getSelectedText = () => {
        const selection = window.getSelection();
        let range = selection.getRangeAt(0);
        const start = range.startContainer.textContent.slice(0, range.startOffset);
        const end = range.endContainer.textContent.slice(range.endOffset);
    
        while (range) {
          //divIds.push(range.commonAncestorContainer.id);
          divIds.push(range.commonAncestorContainer !== null ? range.commonAncestorContainer.id : "");
          range = range.commonAncestorContainer.ownerDocument && range.commonAncestorContainer.ownerDocument.createRange();
        }
    
        // setSelectedText(start + end);
        let selected = selection.getRangeAt(0).startContainer.textContent;
        selected = selected.replace(start, '');
        selected = selected.replace(end, '');
        setSelectedText(selected);
        setStart(start);
        setEnd(end);
        setDivIds(divIds);
      };

    const highlightSelectedText = () => {

        const divs = ref.current.querySelectorAll("div");
 alert(divs.length)
        for (const div of divs) {
            if (divIds.includes(div.id)) {
            const range = document.createRange();
            range.selectNodeContents(div);
            range.collapse(true);

            const highlight = document.createElement("span");
            highlight.style.backgroundColor = "red";
             highlight.appendChild(range.cloneContents());

            div.appendChild(highlight);
            }
        }
    };

    useEffect(() => {
        highlightSelectedText();
    }, [selectedText, divIds]);

    return (
        <div ref={ref}>
            <div >
                <div id='a1'>The Super League is played over 36 rounds from the end of July to May, with a winter break from mid-December to the first week of February. Each team plays each other four times, twice at home and twice away, in a round-robin.</div>
                <div id='a2'>As teams from both Switzerland and Liechtenstein participate in the Swiss football leagues, only a Swiss club finishing in first place will be crowned champion—should a team from Liechtenstein win, this honor will go to the highest-placed Swiss team.[6] Relative to their league coefficient ranking the highest-placed teams will compete in UEFA competitions—again with exception of teams from Liechtenstein, who qualify through the Liechtenstein Cup. The bottom team will be relegated to the Challenge League and replaced by the respective champion for the next season. The club finishing in 9th place will compete against the second-placed team of the Challenge League in a relegation play-off over two games, home and away, for a spot in the succeeding tournament.[7]</div>
            </div>
            <button onClick={getSelectedText}>Get Selected Text</button>
            <p>Selected Text: {selectedText}</p>
            <p>Start: {start}</p>
            <p>End: {end}</p>
            <p>Div IDs: {divIds}</p>
        </div>
    );
}
export default MyComponent;