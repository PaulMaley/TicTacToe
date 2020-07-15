/*
 * Random player : selects a free square randomly.
 *
 */

 exports.RandomPlayer = function(marking) {
   this.marking = marking;

   this.marker = function() {
     return this.marking
   }

   this.select = function(markings) {
     let freeList = markings.map((e,i) => e == '' ? i : -1).filter(i => i != -1);
//     console.log(freeList);
     return freeList[Math.floor(Math.random() * freeList.length)];
   };

 }
