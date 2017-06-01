/**
 * Created by jess on 2017/6/1.
 */


'use strict';


var net = require('net');


//每个socket延迟多少毫秒返回
var DELAY = 1000;

var HOST = '0.0.0.0';
var PORT = 3003;

var concurrent = 0;


function endSocket(socket){
    concurrent--;
    try{
        socket.end('ok\n');
    }catch(err){
        
    }

}

var server = net.createServer(function(socket){
    concurrent++;
    setTimeout( function(){
        endSocket(socket);
    }, DELAY);
});

server.on('listening', function(){
    console.log('server.on_listening, maxConnections: ', server.maxConnections);
});

server.on('error', function(err){
    console.error('server.on_error', err.message);
});

var showTimer;

function showConcurrent(){
    server.getConnections(function(err, count){
        showTimer = setTimeout(showConcurrent, 1000);
        if( err ){
            return console.error('getConnections error: ', err.message);
        }
        console.log('concurrent:', concurrent, 'connections count: ', count, 'maxConnections', server.maxConnections);
    });
}


showTimer = setTimeout(showConcurrent, 1000);


server.listen({
    host : HOST,
    port : PORT
});
