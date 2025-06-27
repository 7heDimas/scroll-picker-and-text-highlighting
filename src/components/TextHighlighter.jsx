import React, { useState, useEffect } from "react";

function TextHighlighter() {
    const [text, setText] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const initialText = params.get("text");
        if (initialText) {
            setText(initialText);
        }
    }, []);

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
                rows={5}
                cols={40}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="text-highlighter-textarea"
            />
            <div className="text-highlighter-output">
                <div className="text-highlighter-result">
                    {[...text].map((ch, i) => (
                        <span key={i} className={isNonLatinChar(ch) ? "highlight" : ""}>
                            {ch}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TextHighlighter;