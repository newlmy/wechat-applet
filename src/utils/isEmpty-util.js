let isEmpty = (val) => {
    if(val === undefined) return true;
    else if (val === null) return true;
    else {
        switch(typeof val){
            case 'string':
                return !val;
            case 'object':
                if(Array.isArray(val)) {
                    return !val.length;

                } else {
                    for(let i in val){
                        if(i) return false
                    }
                    return true;
                }
            default:
                return false;
        }
    }
}

export {
    isEmpty
}