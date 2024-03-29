var fs = require('fs');

var express = require('express');
var bodyParser = require('body-parser');

function Todo(text) {
    var obj = {};
    obj.text = text;
    obj.ID = Math.floor(Math.random() * Math.floor(10000));

    return obj;
}

var todoList = JSON.parse(fs.readFileSync('data.json'));

var app = express();

var server = app.listen(3000, listening);

function listening() {
    console.log("Listening on port 3000 ...");
}

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/todo/', sendTodoList);

function sendTodoList(request, response) {
    response.send(todoList);
}

app.get('/todo/:ID', sendTodo);

function sendTodo(request, response) {
    var id = Number(request.params.ID);
    var status = 404;
    var body = "There is no todo with the id: " + id;

    todoList.forEach((todo, i) => {
        if (id === todo.ID) {
            status = 200;
            body = todo;
        }
    });

    response.status(status).send(body);
}

app.post('/todo/', addTodo);

function addTodo(request, response) {
    var text = request.body.text;
    if (text == '') {
        response.status(400).send('Content is empty');
        return
    }

    todo = Todo(text);
    todoList.push(todo);

    fs.writeFile('data.json', JSON.stringify(todoList), () => {});

    response.send(todo)
}

app.delete('/todo/:ID', removeTodo);

function removeTodo(request, response) {
    var id = Number(request.params.ID);
    var status = 404;
    var body = "There is no todo with the id: " + id;
    var index = null;

    todoList.forEach((todo, i) => {
        if (id === todo.ID) {
            status = 200;
            body = 'OK';
            index = i;
        }
    });

    if (index !== null) {
        todoList.splice(index, 1);

        fs.writeFile('data.json', JSON.stringify(todoList), () => { });
    }

    response.status(status).send(body)
}


function finished(err) {}