// import { Injectable } from '@angular/core';
// import { io } from 'socket.io-client';
// import { environment } from '../environments/environment';
// import { Observable } from 'rxjs';

// @Injectable()
// export class SocketService {

//     socket: any;

//     constructor() {
//         this.socket = io(environment.socketUrl);
//     }

//     listen(eventName: string) {
//       return new Observable((subscriber) => {
//         this.socket.on(eventName, (data: any) => {
//           subscriber.next(data);
//         });
//       })
//     }

//     emit(eventName: string, data: any) {
//         this.socket.emit(eventName, data);
//     }
// }

import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';  
import { debounceTime } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	constructor(private socket: Socket) { }

	// emit event
	emit(eventName: string, data: any) {
		this.socket.emit(eventName, data);
	}

	// listen event
	listen() {
		return this.socket.fromEvent('tasks');
	}

	setNewTasks(projectId: any, tasks: any) {
		this.socket.emit('setTasks', {id: projectId, tasks: tasks})
		.pipe(debounceTime(1000));
	  }
}