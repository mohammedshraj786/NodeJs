/*
1. Create a node program that tells you the current time and date.
2. Subtract one date object from another to get the number of milliseconds
between them.
3. Make a timeTillDiwali program that tells you how many seconds there are until
Diwali.
Run your program from the console using the node command
*/
function DisplayTimeDate()
{
const dateTime = new Date();

console.log(`Date: ${dateTime.toDateString()}`);
console.log(`Time: ${dateTime.toTimeString()}`);
}
DisplayTimeDate();

function SubDate()
{
 let x= new Date("July 31, 2023 12:45:45")
 let y = new Date("July 30, 2023 02:45:45");
let result=Math.abs(x.getTime()-y.getTime());
console.log("Result Of Subtracting Two Dates in millisecinds:   "   +  result);

}
SubDate();

function timeTillDiwali()
{
    let diwali= new Date("November 14, 2023 12:00:00 AM")
    let current= new Date("July 31, 2023 01:45:45 PM");
   let result=Math.abs(diwali.getTime()-current.getTime())/1000;
   console.log("We Have    " + result + "   seconds to reach diwali");

}
timeTillDiwali();