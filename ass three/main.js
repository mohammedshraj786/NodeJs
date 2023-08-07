var calculator=require("./exportOperations");
resultAdd=calculator.add(5,5);
resultSub=calculator.sub(10,5);
resultMul=calculator.mul(4,5);
resultDiv=calculator.div(10,2)

console.log("The output is(addition)  "+resultAdd)
console.log("The output is(subtraction)  "+resultSub)
console.log("The output is(multiplication)  "+resultMul)
console.log("The output is(division)  "+resultDiv)
 

var http=require('http');
var server=http.createServer((req,res)=>
{
  res.write('Working the calculation');
  res.end();  
})
server.listen(9000,function()
{
    console.log("Server running at 9000!");
}
);