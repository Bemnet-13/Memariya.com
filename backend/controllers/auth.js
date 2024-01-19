const Student = require('../models/Student');
const Instructor = require('../models/Instructor');
const {StatusCodes } = require('http-status-codes');

const register = async (req, res) => { 
    if (req.body.role === 'Instructor') {
        const { name, email, password } = req.body;

        const lastUser = await Instructor.findOne().sort({ id: -1 }).exec();
        const id = lastUser? lastUser.id + 1 : 0

        const instructor = await Instructor.create({ id,name, email, password });
        const token = instructor.createJWT();
        res.status(StatusCodes.CREATED).json({ instructor: {id, name: instructor.name,email: instructor.email }, token });
    } else if (req.body.role === 'Student') {
        const { name, email, password } = req.body;
        
        const lastUser = await Student.findOne().sort({ id: -1 }).exec();
        const id = lastUser? lastUser.id + 1 : 0

        const student = await Student.create({id, name, email, password });
        const token = student.createJWT();
        res.status(StatusCodes.CREATED).json({ student: { id,name: student.name,email: student.email }, token });
    }
}
const login = async (req, res) => { }


module.exports = {register,login}