import { Socket } from 'phoenix';
import Auth from './Auth'

const url = "ws://localhost:4000/socket"

class ChatSocket {

  constructor() {
    this.socket = new Socket(url, {params: {token: window.userToken}})
    this.socket.connect()

    this.channel = this.socket.channel("room:lobby", {})
    this.channel.join()
      .receive("ok", response => console.log("Joined successfully", response))
  }

  pushMessage(message) {
    this.channel.push("new_message", message)
  }

  pushTyping(message) {
    this.channel.push("typing", message)
  }

  handleServerMessage(callback) {
    this.channel.on('new_message', callback)
  }

  handleUserTyping(callback) {
    this.channel.on('typing', callback)
  }
}

export default ChatSocket
