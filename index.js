let server = require('./server')
// require : 모듈 불러오는 함수
//서버에서 route 함수를 사용할 수 있도록 전달해줘야 하므로 
let router = require('./router');

//handle 소환
let requestHandler = require('./request');

//db 소환
const mariadb = require('./database/connect/mariadb');
mariadb.connect();

server.start(router.route, requestHandler.handle);
// 서버 모듈의 스타트 함수를 실행 시킬 때 라우터 모듈이 가지고 있는 루트 함수 전달을 해주겠다.
// 서버에 request.js 에 handle 도 넘겨주겠다.

//index : 모듈 연결 역할
//router : 경로 찾기 역할
//server : 요청, 웅답 역할.


