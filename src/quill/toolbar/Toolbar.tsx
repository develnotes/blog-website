export const Toolbar = () => {
    return (
        <div id="toolbar">
            <span className="ql-formats">
                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <button className="ql-underline"></button>
                <button className="ql-strike"></button>
                <button className="ql-highlight"></button>
                <button className="ql-quote"></button>
            </span>
            <span className="ql-formats">
                <button className="ql-anchor"></button>
                <button className="ql-code-block"></button>
                <button className="ql-formula"></button>
                <button className="ql-image"></button>
                <button className="ql-blockquote"></button>
            </span>
            <span className="ql-formats">
                <select className="ql-align"></select>
                <button className="ql-indent" value="+1"></button>
                <button className="ql-indent" value="-1"></button>
            </span>
            <span className="ql-formats">
                <button className="ql-list" value="bullet"></button>
                <button className="ql-list" value="ordered"></button>

            </span>
        </div>
    );
};