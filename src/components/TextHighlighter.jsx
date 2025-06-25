import React, { useState, useEffect } from "react";

function TextHighlighter() {
    const [text, setText] = useState("");

    const latinChars = [
        ..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        " ", ".", ",", "!", "?", ":", ";", "-", "_", "(", ")", "\"", "'"
    ];

    function isNonLatinChar(char) {
        return !latinChars.includes(char);
    }

    return (
        <div className="text-highlighter">
            <textarea
            row={5}
            cols={40}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="text-highlighter-textarea"
            />
            <div className="text-highlighter-output">
                <p className="text-highlighter-label">Non latin chars: </p>
                <div className="text-highlighter-result">
                    {[...text].map((ch, i) => {
                    if (isNonLatinChar(ch)) {
                        return <span key={i} className="highlight">{ch}</span>;
                    } else {
                        return <span key={i}>{ch}</span>
                    }
                })}
                </div>
            </div>
        </div>
    )
}

export default TextHighlighter;