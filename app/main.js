"use strict";

import Server from "./server/Server.js";

let server = new Server();
server.start();
// let close = server.start();
// setTimeout(()=> {
//     console.log('should be closed');
//     close.close(()=> {
//         console.log('server closed');
//     });
// }, 5000);