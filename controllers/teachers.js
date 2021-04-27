const fs = require('fs');
const data = require('../data.json')
const { age, graduation, date } = require('../utils')

exports.index = (req, res) => {

    let teachers = data.teachers.map((teacher) => {
        const newTeacher = {
            ...teacher,
            services: teacher.services.split(',')
        }

        return newTeacher
    })

    return res.render('teachers/index', { teachers })
}
// show
exports.show = (req, res) => {
    const { id } = req.params

    const foundTeacher = data.teachers.find((teacher) => {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send('Teacher not found')

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        graduation: graduation(foundTeacher.graduation),
        services: foundTeacher.services.split(','),
        create_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.create_at)
    }

    return res.render('teachers/show', { teacher })
}
// create
exports.post = (req, res) => {

    const keys = Object.keys(req.body)

    for (key of keys){
        if (req.body[key] == ""){
            return res.send("Preencha todos os campos")
        }
    }

    let { avatar_url, name, birth, grauEscolaridade, tipoDeAula, services } = req.body

    birth = Date.parse(birth)
    
    const lastTeacher = data.teachers.length
    let id = 1
    if (lastTeacher){
        id = lastTeacher + 1
    }

    data.teachers.push({
        id,
        name,
        avatar_url,
        birth,
        grauEscolaridade,
        tipoDeAula,
        services
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('White file error')

        return res.redirect('/teachers')
    })
}
//crate
exports.create = (req, res) => {
    return res.render('teachers/create')
}
// edit
exports.edit = (req, res) => {

    const { id } = req.params

    const foundTeacher = data.teachers.find((teacher) => {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send('Teacher not found')

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso
    }

    return res.render('teachers/edit', { teacher })
}
// update
exports.update = (req, res) => {
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find((teacher, foundIndex) => {
        if(id == teacher.id){
            index = foundIndex
            return true
        }
    })

    if (!foundTeacher) return res.send('Teacher not found')

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(id)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Write error')

        return res.redirect(`/teachers/${id}`)
    })

}
// delete
exports.delete = (req, res) => {
    const { id } = req.body

    const filteredTeachers = data.teachers.filter((teacher) => {
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Write error')

        return res.redirect('/teachers')
    })
}