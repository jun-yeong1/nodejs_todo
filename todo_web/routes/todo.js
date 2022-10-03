const express = require('express');
const app = express();
const router = express.Router();

const controller = require("../controllers/todo");

//read
router.get("/", controller.get);
//write
router.post('/write', controller.write);
//edit
router.get("/edit/:id", controller.edit);
//update
router.post('/update/:id', controller.update);
//remove
router.get('/remove/:id', controller.remove);

router.get("/timer", controller.timer);

module.exports = router;
