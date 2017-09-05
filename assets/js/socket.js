import {Socket} from "phoenix"

let username = localStorage.getItem("username");

if(!username || username == 'null'){
  username = prompt("What is your name?");
  localStorage.setItem("username", username);
}

// connecting to the soceket
let socket = new Socket("/socket", {params: {username: username}});

socket.connect()

let channel = socket.channel("rooms:lobby", {})
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

// channel.push("msg", {body: "Test messagees"})


let messages = document.getElementById("messages")
channel.on("msg", function(message){
  messages.innerHTML += '<div class="message">@' + message.username + ': ' + message.body + '</div>';
})

input.addEventListener("keyup", function(e){
  console.log('keycode', e.keyCode)
  if(e.keyCode == 13){
    channel.push("msg", {body: input.value})
    input.value = '';
  }
});


export default socket
