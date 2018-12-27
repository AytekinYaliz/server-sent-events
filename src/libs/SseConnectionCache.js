class SseConnectionCache {
   constructor() {
      this.cache = {};
   }

   add(key, value) {
      console.log( 'New Connection:', key );

      if(this.cache.hasOwnProperty(key)) {
         this.cache[key].push(value);
      } else {
         this.cache[key] = [value];
      }
   }
   get(key) {
      return this.cache[key];
   }
   remove(key, res) {
      console.log( 'Remove Connection:', key );

      if(this.cache.hasOwnProperty(key)) {
         const index = this.cache[key].indexOf(res);

         if(index > -1) {
            this.cache[key].splice(index, 1);
         }

         if(this.cache[key].length === 0) {
            delete this.cache[key];
         }
      }
   }

   keys() {
      return Object.keys( this.cache );
   }
   values() {
      return Object.values( this.cache );
   }
}

module.exports = new SseConnectionCache();
