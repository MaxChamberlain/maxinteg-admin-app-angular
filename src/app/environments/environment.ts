const socket = process.env['SOCKET_URL']
const api = process.env['API_URL']

export const environment = {
    production: false,
    api: api,
    socketUrl: socket,
}