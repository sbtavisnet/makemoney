// Http Options

import { HttpHeaders } from "@angular/common/http";


export const HEADER = {
    headers: new HttpHeaders({
        'Connection': 'close',
        'Content-Encoding': 'deflate',
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Expose-Headers': '*'
    })
};



