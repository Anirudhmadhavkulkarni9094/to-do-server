const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title : {
        type: String,
        require: true
    },
    status : {
        type: String,
        default : "pending"
    },
    Desc : {
        type : String,
        require : true
    },
    Date : {
        type: Date,
        default : Date.now()
    }

})

const TaskModel = mongoose.model('TaskModel',TaskSchema);
module.exports = TaskModel;