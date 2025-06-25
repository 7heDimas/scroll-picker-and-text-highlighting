import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function TextHighlighter() {
    const [searchParams] = useSearchParams();
    const initialText = searchParams.get(("text") || "");
    const [text, setText] = useState(initialText);

    const latinChars = [
        ..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        " ", ".", ",", "!", "?", ":", ";", "-", "_", "(", ")", "\"", "'"
    ];

    function isNonLatinChar(char) {
        return !latinChars.includes(char);
    }

    const nonLatinChars = [...text].filter(isNonLatinChar);

    return (
        <div>
            <textarea
            row={5}
            cols={40}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div>
                <p>Non latin chars: </p>
                <div>{nonLatinChars.join("")}</div>
            </div>
        </div>
    )
}

export default TextHighlighter;