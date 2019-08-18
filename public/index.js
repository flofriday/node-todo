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

    var div = document.createElement("DIV");
    div.textContent = obj.text;
    div.innerHTML += '<span class="secondary-content" style="cursor: pointer" onclick="removeTodo(' + obj.ID + ')"><i class="material-icons">check</i></span>';

    li.appendChild(div);
    contentElement.appendChild(li);

    //contentElement.innerHTML += '<li id="' + obj.ID +'" class="collection-item flow-text"><div>' + obj.text  + '<span class="secondary-content" style="cursor: pointer" onclick="removeTodo(' + obj.ID + ')"><i class="material-icons">check</i></span></div></li>';
}

function addTodo() {
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