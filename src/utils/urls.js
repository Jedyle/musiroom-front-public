const join = (base, path) => {
    let baseWithoutSlash = (
        base.charAt(base.length-1) === "/" ? base.slice(0, -1) : base
    );
    let pathWithoutSlash = (
        path.charAt(0) === "/" ? path.slice(1) : path
    );    
    return baseWithoutSlash + "/" + pathWithoutSlash;
};

export {join}
