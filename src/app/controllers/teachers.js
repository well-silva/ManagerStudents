const Teacher = require('../model/Teacher')
const { age, graduation, date } = require('../../lib/utils')

const controller = {
    index: (req, res) => {

        Teacher.all((teachers) => {

            return res.render('teachers/index', { teachers })
        })

    },
    show: (req, res) => {
        
        Teacher.find(req.params.id, (teacher) => {
            if(!teacher) return res.send('Teachers not found')

            teacher.subjects_taught = teacher.subjects_taught.split(',')
            teacher.age = age(teacher.birth_date)
            teacher.education_level = graduation(teacher.education_level)
            teacher.created_at = date(teacher.created_at).format
            
            return res.render('teachers/show', { teacher })
        })
    },
    post: (req, res) => {

        const keys = Object.keys(req.body)
    
        for (key of keys){
            if (req.body[key] == ""){
                return res.send("Preencha todos os campos")
            }
        }
        
        Teacher.create(req.body, (teacher) => {

            return res.redirect(`/teachers/${ teacher.id }`)

        })

    },
    create: (req, res) => {
        return res.render('teachers/create')
    },
    edit: (req, res) => {
        Teacher.find(req.params.id, (teacher) => {
            if(!teacher) return res.send('Teacher not found')

            teacher.birth_date = date(teacher.birth_date).iso

            return res.render('teachers/edit', { teacher })
        })
    },
    update: (req, res) => {
        const keys = Object.keys(req.body)
    
        for (key of keys){
            if (req.body[key] == ""){
                return res.send("Preencha todos os campos")
            }
        }

        Teacher.update(req.body, () => {
            return res.redirect(`teachers/${req.body.id}`)
        })
    },
    delete: (req, res) => {
        Teacher.delete(req.body.id, () => {
            return res.redirect('/teachers')
        })
    }
}

module.exports = controller