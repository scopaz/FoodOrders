import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7176/orderhub")
    // .withUrl('https://foodorders.azurewebsites.net/orderhub')
    .configureLogging(signalR.LogLevel.Trace)
    .withAutomaticReconnect()
    .build();

connection.start().catch(err => console.error(err));

export default connection;