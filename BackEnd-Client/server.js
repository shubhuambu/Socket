const io = require('socket.io')();

io.on("connection", socket => {
    console.log("User connected..!");
    socket.on("test", arg => {
        console.log(arg); // world
        io.emit("test", arg);
      });
      socket.on("typing", arg => {
        console.log('typing---',arg); // world
        io.emit("typing", arg);
      });  
    //   socket.broadcast.emit('test2', "bhyghuygbygb");
})

io.listen(1234);