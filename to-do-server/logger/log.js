const Event =require("events");
class logger extends Event{
    info(msg){
    this.emit("message",msg);}
    error(msg){
        this.emit("Error ! ",msg);
    }
}
const log= new logger();
log.on("message",(data)=>{console.log(data)})
log.on("Error ! ",(data)=>{console.error("Error ! ",data)})
module.exports = log;