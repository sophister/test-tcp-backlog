/**
 * Created by jess on 2017/6/1.
 */


'use strict';


var net = require('net');


var QPS = 500;

var HOST = '127.0.0.1';
var PORT = 3003;

var index = 0;

function send(){

    index++;

    var currentIndex = index;

    var client = net.connect({
        host : HOST,
        port : PORT
    });

    client.on('connect', function(){
        console.log('socket.on_connect: ',
            currentIndex, 'localAddress: ', client.localAddress, 'localPort: ', client.localPort);
    });

    client.on('error', function(err){
        console.error('socket.on_error: ', currentIndex, err.code);
    });

    client.on('timeout', function(){
        console.error('socket.on_timeout: ', currentIndex);
        client.end();
    });

    client.on('end', function(){
        client.end('byebye\n');
    });

}


function sendMulti(){
    for( var i = 0; i < QPS; i++){
        send();
    }
}

var timer = setInterval(sendMulti, 1000);

