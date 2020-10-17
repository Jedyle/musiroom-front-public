export const join = (base, path) => {
    let baseWithoutSlash = (
        base.charAt(base.length-1) === "/" ? base.slice(0, -1) : base
    );
    let pathWithoutSlash = (
        path.charAt(0) === "/" ? path.slice(1) : path
    );    
    return baseWithoutSlash + "/" + pathWithoutSlash;
};

export const previewUrl = (url) => {
    if (!url.startsWith("https://")){
        return process.env.REACT_APP_API_URL + url;
    }
    return url;
};
