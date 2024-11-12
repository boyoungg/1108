let http = require('http');
let url = require('url');


function start(route, handle){
    function onRequest(request, response){
        let pathname = url.parse(request.url).pathname;
        //parse : 문자열 찾기

        let queryData = url.parse(request.url, true).query;

        route(pathname, handle, response, queryData.productId);
        //루트에서 사용할수 있도록 pathname 전달


        // console.log('pathnamee :' + pathname);
        // //콘솔창에 출력 -> 루트.js로 이동


    }

    http.createServer(onRequest).listen(8888); 
}

// 자바스크립트에서 함수는 해당 파일에서만 사용할 수 있으므로, 외부로 사용하겠다 말해줘야 함.

exports.start = start;
//바깥에서(외부파일에서) start함수를 사용하겠다 선언.

