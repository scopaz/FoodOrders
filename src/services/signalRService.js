// src/services/signalRService.js
import { HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export function createSignalRConnection() {
    
    const connection = new HubConnectionBuilder()
        .withUrl('http://localhost:5020/orderhub')
        .configureLogging(LogLevel.Trace) // Enable detailed logging
        .withAutomaticReconnect() 
        .build();

    
    // connection.start()
    //     .then(() => {
    //         console.log('Connected to SignalR hub');

    //         // Now that the connection is established, you can send data
    //         sendOrderNotification(connection);
    //     })
    //     .catch((error) => {
    //         console.error('Error connecting to SignalR hub:', error);
    //     });

    return connection;
}

// function sendOrderNotification(connection) {
//     if (connection.state === 'Connected') {
//         // Send order notification data
//         connection.send('SendOrderNotification', 'Order created');
//     } else {
//         console.error('Cannot send order notification. Connection is not in the Connected state.');
//     }
// }
