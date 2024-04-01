function SendMessage (message: string) {
    for (let index = 0; index <= Math.ceil(message.length / maxMessageLength) - 1; index++) {
        radio.sendString(message.substr(index * maxMessageLength, maxMessageLength))
    }
    radio.sendString("" + ("\n"))
    sendBytes += serialReceivedString.length
}
radio.onReceivedString(function (receivedString) {
    radioRecBuffer = "" + radioRecBuffer + receivedString
    while (radioRecBuffer.includes("\n")) {
        serial.writeLine(radioRecBuffer.substr(0, radioRecBuffer.indexOf("\n")))
        radioRecBuffer = radioRecBuffer.substr(radioRecBuffer.indexOf("\n") + 1, 0)
    }
    recBytes += receivedString.length
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    serialReceivedString = serial.readString()
    SendMessage(serialReceivedString)
})
let recBytes = 0
let radioRecBuffer = ""
let serialReceivedString = ""
let sendBytes = 0
let maxMessageLength = 0
maxMessageLength = 18
radio.setGroup(1)
radio.setFrequencyBand(50)
serial.setRxBufferSize(128)
serial.setTxBufferSize(128)
serial.writeLine("GW: Rover gateway started")
