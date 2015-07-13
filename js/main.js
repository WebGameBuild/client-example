

var userSocket;

window.onload = function () {
    userSocket = new UserSocket();
    userSocket.onopen = function() {
        userSocket.send("Auth", "getToken", {
            username: "loh",
            password: "pidr"
        }, function (data) {
            userSocket.send("Auth", "assignToken", {token: data.token})
        });
    };
};


function testAction() {
    //test action: load land data
    userSocket.send("Land", "square", {
        x1: 0,
        y1: 0,
        x2: 5,
        y2: 5
    }, function(data) {
        //do processing data
    });
}

function accountInfo() {
    userSocket.send("Test", "myAccount");

}