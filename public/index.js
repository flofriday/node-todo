var input = document.getElementById('new_todo').value = '';

M.AutoInit();
loadTodoList();

var contentElement = document.getElementById("content")

function loadTodoList() {
    console.log('Downloading')
    var Httpreq = new XMLHttpRequest(); // a new request

    Httpreq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            contentElement.innerHTML = '';
            obj.forEach((todo, n) => {
                addTodoElement(todo)
            });
        }
    };

    Httpreq.open("GET", "/todo", true);
    Httpreq.send();
}   

function addTodoElement(obj) {
    var li = document.createElement("LI");
    li.classList = "collection-item flow-text";
    li.id = obj.ID;

    var input = document.createElement("INPUT");
    input.setAttribute("type", "checkbox");
    input.classList = "filled-in"
    input.onclick = function() {removeTodo(obj.ID)}


    var span = document.createElement("SPAN");
    span.style = 'color: black; line-height: 1.6; font-size: 16px';
    span.innerText = obj.text;

    var label = document.createElement("LABEL")
    label.appendChild(input)
    label.appendChild(span)


    li.appendChild(label);
    contentElement.appendChild(li);

    //contentElement.innerHTML += '<li id="' + obj.ID +'" class="collection-item flow-text"><div>' + obj.text  + '<span class="secondary-content" style="cursor: pointer" onclick="removeTodo(' + obj.ID + ')"><i class="material-icons">check</i></span></div></li>';
}

function addTodo(e) {
    // only run this on enter
    if (e.keyCode != 13) {
        return
    }

    var input = document.getElementById('new_todo');
    var text = input.value;
    input.value = '';
    console.log(text)
    var Httpreq = new XMLHttpRequest(); // a new request

    Httpreq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            addTodoElement(obj);
        }
    };

    Httpreq.open("POST", "/todo");
    Httpreq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Httpreq.send(JSON.stringify({text: text}));
}

function removeTodo(ID) {
    console.log('Deleteing')
    var Httpreq = new XMLHttpRequest(); // a new request
    var todoElement = document.getElementById(ID)

    Httpreq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            todoElement.parentElement.removeChild(todoElement)
        }
    };

    Httpreq.open("DELETE", "/todo/" + ID, true);
    Httpreq.send();
}