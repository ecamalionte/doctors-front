import { Socket } from 'phoenix'
import Auth from './Auth'

const url = "ws://localhost:4000/socket"

const auth_params = () => (
  { params: { token: Auth.storagedToken() } }
)

class ChatSocket {

  constructor(user) {
    this.socket = new Socket(url, auth_params())
    this.socket.connect()

    this.channel = this.socket.channel(`room:${user.login}`, auth_params().params)

    this.channel.join()
          .receive("ok", ({messages}) => console.log("Channel up", messages) )
          .receive("error", ({reason}) => console.log("failed join channel", reason) )
          .receive("timeout", () => console.log("Networking issue. Still waiting...") )

    this.channel.onError(e => console.log("something went wrong", e))
    this.channel.onClose(e => console.log("channel closed", e))
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
