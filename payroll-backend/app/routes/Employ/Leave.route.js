
"use strict"

const router = require("express").Router()
const { Leave, get_leave, get_user_id, leave_delete, update_laeve ,get_User_leave,get_User_leave_count, get_day_leave} = require('../../controllers/Employ/Leave.cotroller')


router.post('/leave', Leave)
router.get('/get_leave', get_leave)
// router.post('/get-user-leave/:id',get_user_leave_id)
router.post('/leave_dalete/:id', leave_delete)
router.post('/leave_update', update_laeve)
router.post('/get_User_leave', get_User_leave)
router.post('/get_User_leave_count', get_User_leave_count)
router.get('/get_day_leave', get_day_leave)


module.exports = router;

