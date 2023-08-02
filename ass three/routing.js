const http=require('http');
const url=require('url');
const server=http.createServer((req,res)=>
{
    res.writeHead(200,{'Content-Type':'text/html'});
    const url=req.url;
    
    if(url==='/about')
    {   
    res.write('Welcome to about page!');
    res.end();
    }
    else if(url==='/home')
    {
     res.write('Hello Here is the home page!');
     res.end();
    }
    else{
        res.write('Error Not Found');
        res.end();
    }
})
server.listen(3000,function(){
    console.log("server started @ port 3000");
});