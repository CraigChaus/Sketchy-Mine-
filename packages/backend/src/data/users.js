const {v4:uuidv4} = require('uuid');

let users = [
    {
        id: 1,
        username : 'Bob',
        password : '$2a$12$cyHQjJEIhQsdMYjT.0b4quXIFk5CHA9ikGVVKGMoVUiEMlcqge2pG', //password1
        secret: uuidv4(),
    },
    {
        id: 2,
        username : 'Jack',
        password : '$2a$12$qXHCHj7TD9oHT/9sdUILtO83PqiJKyGP7fd9Cx2tvqiHfdibznx6S', //password2
        secret: uuidv4(),
    },
    {
        id: 3,
        username : 'Alice',
        password : '$2a$12$vIVOAbTb7b7ZGXiZxrUi0ebituOA5q0Vt0wDxPBTeUtMBtZ9bWd5m', //password3
        secret: uuidv4(),
    }
]

module.exports = users;
