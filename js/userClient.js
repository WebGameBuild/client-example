
UserSocket = function () {
    var socket;
    var requestIdCounter = 0;
    var callbacks = [];
    var self = this;
    socket = new WebSocket("ws://127.0.0.1:82");
    socket.timeout = 10;

    socket.onopen = function () {
        console.log("Соединение открылось");
        self.onopen();
    };

    socket.onclose = function () {
        console.log("Соединение закрылось");
    };

    socket.onmessage = function (event) {
        console.log(">>>", event.data);
        var json = JSON.parse(event.data);
        /** @namespace json.request */
        var reqId = json.request.id;
        if (callbacks[reqId] !== undefined) {
            callbacks[reqId](json.data);
            delete callbacks[reqId];
        }
    };

    self.send = function (controller, action, data, callback) {
        var reqId = requestIdCounter++;
        var request = JSON.stringify({
            controller: controller,
            action: action,
            id: reqId,
            data: data
        });
        console.log("<<<", request);
        socket.send(request);
        if(callback !== undefined) {
            callbacks[reqId] = callback;
        }
    };

    self.onopen = function() {};
};