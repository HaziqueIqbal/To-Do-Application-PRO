

var list = document.getElementById("list");
firebase.database().ref("information").on("child_added", function (data) {

    var div = document.createElement("div");
    div.setAttribute("class", "edit");
    var li = document.createElement("li");
    var liText = document.createTextNode(data.val().todo);
    div.appendChild(liText);
    li.appendChild(div);


    list.appendChild(li);


    var delet = document.createElement("i");
    delet.setAttribute("class", "fa fa-trash");
    delet.setAttribute("id", data.val().key)
    delet.setAttribute("onClick", "allDelete(this)")
    li.appendChild(delet);

    var edit = document.createElement("i");
    edit.setAttribute("class", "fa fa-pencil-square-o");
    edit.setAttribute("onClick", "ediit(this)");
    edit.setAttribute("id", data.val().key)
    li.appendChild(edit);
})
var date = new Date();
document.getElementById("datte").innerHTML = date.toDateString();
function addToDo() {

    var items = document.getElementById("toDoItems");
    if (items.value === "") {
        window.alert("Invalid Value");
    }
    else {
        var key = firebase.database().ref("information").push().key;

        var info = {
            todo: items.value,
            key: key
        }

        firebase.database().ref("information").child(key).set(info);
    }
    items.value = "";
}


function allDelete(receive) {
    receive.parentNode.remove();
    firebase.database().ref("information").child(receive.id).remove();
}
function reset() {
    list.innerHTML = "";
    firebase.database().ref("information").remove();
}
function ediit(receive) {
    var val = receive.parentNode.firstChild.firstChild.nodeValue;
    var newVal = window.prompt("Enter New Value", val);
    var updated = {
        todo: newVal,
        key: receive.id
    }
    receive.parentNode.firstChild.firstChild.nodeValue = newVal;
    firebase.database().ref("information").child(receive.id).set(updated);
}

