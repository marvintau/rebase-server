
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';

const fs = require('fs').promises;

import FileRecv from './file-recv.js';
const Files = {};

import sql from 'mssql';
let config = {
    user: "marvin",
    password: "all4Jesus",
    server: "192.168.0.127",
}

sql.connect(config).then(function(){
    console.log('SQL database is ready.')
    sql.close();
}).catch((err) => {
    console.log('failed', err);
}).finally(() => {
    console.log('SQL closed')
    sql.close();
})

var app = express();

var server = app.listen(1337, function () {
  console.log('Server is listening 1337');
  console.log("run from the " + __dirname);
});

var io = require('socket.io').listen(server);


app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var restore = function(pool, path){
    const query = 
        `declare @mdfpath nvarchar(max),                          
                 @ldfpath nvarchar(max)                           
                                     
         select @mdfpath = [0], @ldfpath = [1]
             from (select type, physical_name                    
                     from sys.master_files                      
                     WHERE database_id = DB_ID(N'rebase'))
             as paths         
         pivot(max(physical_name) for type in ([0], [1])) as pvt;
           
         restore database rebase from disk = N'${path}' WITH FILE=1,
         MOVE N'Ufmodel'     TO @mdfpath,                         
         MOVE N'Ufmodel_LOG' TO @ldfpath,                        
         NOUNLOAD,  REPLACE,  STATS = 10;`

    return pool.request().query(query);
}

var recordRestoreProgress = function(pool){
    const query = 
    `SELECT command,
        start_time,
        percent_complete,
        CAST(estimated_completion_time/60000 as varchar) + 'min' as est_remaining_time
    FROM sys.dm_exec_requests r
    CROSS APPLY sys.dm_exec_sql_text(r.sql_handle) s
    WHERE r.command='RESTORE DATABASE'`;

    return pool.request().query(query);
}

io.sockets.on('connection', function (socket) {

    socket.on('start', function (data) { 

        var fileStub;
        Files[data.name] = fileStub = new FileRecv(data.size, path.join('D:/temp', data.destName));

        fileStub.open().then(function(fd){
            console.log("[start] file " + data.name + " desc created, ready to receive more.");
            fileStub.handler = fd;
            socket.emit('more', { 'position': 0, 'percent': 0 });
        }).catch(function(err){
            console.error('[start] file open error: ' + err.toString());
        });
    });

    socket.on('backupFileList', function(){
        console.log('received')
        //passsing directoryPath and callback function
        fs.readdir("D:/temp/").then((res)=>{
            console.log(res);
        })
    })

    socket.on('upload', function (data) {

        var fileStub = Files[data.name];
    
        fileStub.updateLen(data.segment);

        if (fileStub.isFinished()) {

            fileStub.write().then(function(){
                return fileStub.close();
            }).then(function(){
                socket.emit('msg', { type:"UPLOAD_DONE", file: fileStub.name });
                return sql.connect(config);
            }).then(function(pool){

                return new Promise(function(resolve, reject){
                    console.log('begin restoring');
                    restore(pool, fileStub.filePath).catch(err=>{
                        console.error(err);
                        socket.emit('msg', {type:"ERROR", data:{err, from:"restore"}})
                    });

                    (function polling(pool){
                        recordRestoreProgress(pool).then(function(res){
                            console.log(res);
                            socket.emit('msg', { type:"RESTORE_PROGRESS", data : res.recordset[0] });
                            if(res.recordset.length === 0){
                                setTimeout(polling, 500, pool);
                            }
                            else if(res.recordset[0].percent_complete === 100){
                                console.log('polling done');
                                resolve();
                            } else {
                                setTimeout(polling, 888, pool);
                            }
                        }).catch(err=>{
                            socket.emit('msg', {type:"ERROR", data: {err, from:"polling"}})
                        })
                    })(pool);
                })

             
            }).then(function(res){
                socket.emit('msg', {type:"RESTORE_DONE"});
            }).then(function(){
                console.log('done');
                fileStub = undefined;
            })
        
        } else if (fileStub.data.length > 10485760) { //buffer >= 10MB
            fileStub.write().then(function(){
                fileStub.data = ''; //reset the buffer
                socket.emit('more', fileStub.progress());
            }).catch(function(err){
                console.error(err);
            });

        } else {
            socket.emit('more', fileStub.progress());
        }
    });
});


