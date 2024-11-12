const fs = require('fs');
//모듈 연결 : 만들어둔 html을 가져올 수 있는 파일싱크

const main_view = fs.readFileSync('./main.html', 'utf-8');
const order_list = fs.readFileSync('./orderlist_2.html', 'utf-8');

const mariadb = require('./database/connect/mariadb');
//데이터 연결

function main(response){
    console.log('main')

    mariadb.query("SELECT * FROM product", function(err, rows){
        console.log(rows);
    });

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(main_view);
    response.end();
}

//orderlist
function orderList(response){
    console.log('order')

    response.writeHead(200, {'Content-Type': 'text/html'});

    mariadb.query("SELECT * FROM orderlist", function(err, rows) {
        response.write(order_list);

        rows.forEach(element => {
            response.write("<tr>" 
                        + "<td>"+element.product_id+"</td>"
                        + "<td>"+element.order_date+"</td>"
                        + "</tr>");
        });
        
        response.write("</table>");
        response.end();
    })
}

//이미지 뿌려주기
function redRacket(response){

    fs.readFile("./img/redRacket.png", function(err, data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });

}

function blueRacket(response){

    fs.readFile("./img/blueRacket.png", function(err, data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });

}

function blackRacket(response){

    fs.readFile("./img/blackRacket.png", function(err, data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });

}


function order(response, productId){
    response.writeHead(200, {'Content-Type': 'text/html'});

    //ORDER 버튼 눌렀을 때 값 받아오기 위한 연결
    mariadb.query("INSERT INTO orderlist VALUES("+ productId +", '" + new Date().toLocaleDateString() + "');", function(err, rows){
        console.log(rows);
    });

    response.write('orderPage');
    response.end();
}


// function login(response){
//     console.log('login')

//     response.writeHead(200, {'Content-Type': 'text/html'});
//     response.write('login page');
//     response.end();
// }

// //보영
// function boyoung(response){
//     console.log('boyoung')

//     response.writeHead(200, {'Content-Type': 'text/html'});
//     response.write('boyoung page');
//     response.end();
// }

//favicon 에러
function favicon(){
    console.log('favicon')
}

//router가 경로를 알려주면 이후 행동을 알려주는 역할
let handle = {};//key:value 
handle['/'] = main;
// handle['/login'] = login;
// handle['/boyoung'] = boyoung;
// key(이뜻이 뭐지?) = value(이런 뜻이야)
// /login을 찾아오면 login을 만나게 될거야.

//favicon 에러
handle['/favicon.ico'] = favicon;


//order추가
handle['/order'] = order;

handle['/orderlist'] = orderList;

//이미지 경로 추가
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;


exports.handle = handle;