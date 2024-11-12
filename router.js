const path = require("path");

function route(pathname, handle, response, productId){
    //경로를 담당하는 것.
    
    console.log('pathname :' + pathname);
    //콘솔창에 출력


    //handle에 처리 요청, 함수처럼 사용할 수 있음.
    if(typeof handle[pathname] === 'function'){
        handle[pathname] (response, productId);
    
    }else{
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.write('Not found');
        response.end();
    }
}

exports.route = route;
//루트 함수 내보내주기.