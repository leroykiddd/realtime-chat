const ws = require('ws')

const PORT = 8000

const ws_server = new ws.Server({
    port: PORT,

}, () => console.log(`Server started on port ${PORT}`))


ws_server.on('connection', function connection(ws) {
    ws.on('message', function(message){
        message = JSON.parse(message)
        switch(message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
})


function broadcastMessage(message, id) {
    ws_server.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}