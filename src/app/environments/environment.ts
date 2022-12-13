const socket = process.env['SOCKET_URL']
const api = process.env['API_URL']

if(!socket){
    console.error('No socket url provided')
}

if(!api){
    console.error('No api url provided')
}

export const environment = {
    production: false,
    api: api || 'https://tracking-app-go-server.herokuapp.com',
    socketUrl: socket || 'https://tracking-app-node-socket.herokuapp.com',
}