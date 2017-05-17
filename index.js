const app = require('express')();

app.get('/eventbrite', require("./controllers/eventbrite"));

app.listen(3000, () => {
    console.log('locaTO server listening on port 3000!')
});

