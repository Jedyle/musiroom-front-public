import sanitizeHtml from 'sanitize-html';

export function truncate(str, n){
  return (str.length > n) ? str.substr(0, n-1) + '...' : str;
};

export function removeHTML(str){
    let div = document.createElement('div');
    div.innerHTML = str;
    return div.textContent || div.innerText || "";
}

export function cleanHTML(str){
    return sanitizeHtml(str, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["ins", "blockquote", "del", "span"]),
        allowedAttributes: {
            '*': ["style"],
        },
        allowedStyles: {
            '*': {
                // Match HEX and RGB
                color: [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
                'text-align': [/^left$/, /^right$/, /^center$/],
                // Match any number with px, em, or %
                'font-size': [/^\d+(?:px|em|%)$/]
            }
        }
    });
}
