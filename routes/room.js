const express = require('express');
const router = express.Router();
const room = require('../controller/roomController');
const restrict = require('../middleware/restrict');


router.post('/room',restrict,room.createRoom);
router.post('/room/:id/fight',restrict,room.duelRoom);
router.get('/room/:id/result',restrict,room.result);

module.exports = router;