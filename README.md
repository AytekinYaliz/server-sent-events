## SSE (Server-Sent Events) ##

1. Start the server with **yarn start**
2. Open a tab and navigate to **http://localhost:4000/events?token=london**
3. Open another tab and navigate to **http://localhost:4000/events?token=brighton**
4. Open another tab and navigate to **http://localhost:4000/events?token=london**

You can observe the first and the last tabs get same data while the second one's can differ.
  
There is also another index file for **socket.io** version in the root folder.
