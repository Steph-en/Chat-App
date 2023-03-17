var objPeople =
[
    {
        username: "ENG19A00007Y",
        password: "Ait123"
    },
    {
        username: "ENG19A00017Y",
        password: "Ait123"
    },
    {
        username: "ADS19A00106Y",
        password: "Ait123"
    },
    {
        username: "ADS19A00017Y",
        password: "Ait123"
    }
]

function getInfo()
{
    var username = document.getElementById("floatingInput").value
    var password = document.getElementById("floatingPassword").value
    var button = document.querySelector(".btn")
    
    var i;

    for (i = 0; i < objPeople.length; i++) {
        if (username == objPeople[i].username && password == objPeople[i].password) {
            alert(username + " is valid!!!");
            window.location = '/admin.html';
            return
        } else {
        }
    }
    alert("Incorrect username or password")
};

module.exports = getInfo;