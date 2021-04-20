const fs = require('fs');
const data = require('../data.json')
const { age, graduation, date, grade } = require('../utils')

exports.index = (req, res) => {

    return res.render('students/index', { students: data.students })
}
// show
exports.show = (req, res) => {
    const { id } = req.params

    const foundStudent = data.students.find((student) => {
        return student.id == id
    })

    if (!foundStudent) return res.send('Student not found')

    const student = {
        ...foundStudent,
        age: date(foundStudent.birth).birthday,
        yearSchool: grade(foundStudent.yearSchool)

    }

    return res.render('students/show', { student })
}
// create
exports.post = (req, res) => {

    const keys = Object.keys(req.body)

    for (key of keys){
        if (req.body[key] == ""){
            return res.send("Preencha todos os campos")
        }
    }

    let { avatar_url, 
        name, 
        email,
        birth,
        yearSchool,
        classTime
    } = req.body

    birth = Date.parse(birth)

    const lastStudent = data.students.length

    let id = 1
    if (lastStudent){
        id = lastStudent + 1
    }

    data.students.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('White file error')

        return res.redirect('/students')
    })
}
//create
exports.create = (req, res) => {
    return res.render('students/create')
}
// edit
exports.edit = (req, res) => {

    const { id } = req.params

    const foundStudent = data.students.find((student) => {
        return student.id == id
    })

    if (!foundStudent) return res.send('Student not found')

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return res.render('students/edit', { student })
}
// update
exports.update = (req, res) => {
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find((student, foundIndex) => {
        if(id == student.id){
            index = foundIndex
            return true
        }
    })

    if (!foundStudent) return res.send('Student not found')

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(id)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Write error')

        return res.redirect(`/students/${id}`)
    })

}
// delete
exports.delete = (req, res) => {
    const { id } = req.body

    const filteredStudents = data.students.filter((student) => {
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Write error')

        return res.redirect('/students')
    })
}