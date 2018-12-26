module.exports = class SseConnection {
   constructor(res) {
      this.res = res;
   }

   setup() {
      this.isSetup = true;
      this.res.writeHead(200, {
         'Content-Type': 'text/event-stream',
         'Cache-Control': 'no-cache',
         'Connection': 'keep-alive'
      });
   }

   send(data) {
      this.res.write("data: " + JSON.stringify(data) + "\n\n");
   }
}
