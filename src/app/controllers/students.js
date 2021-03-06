const Student = require('../model/Student')
const { age, graduation, date, grade } = require('../../lib/utils')

const controller = {
    index: (req, res) => {

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(students){

                const pagination = {
                    total: Math.ceil(students[0].total / limit),
                    page
                }
                    console.log(pagination.total)
                    return res.render('students/index', { students, pagination, filter })
                    console.log(pagination.total)

            }
        }
        Student.paginate(params)

    },
    show: (req, res) => {
        
        Student.find(req.params.id, (student) => {
            if(!student) return res.send('Students not found')

            student.age = date(student.birth_date).birthday
            student.education_level = grade(student.education_level)

            return res.render('students/show', { student })
        })
    },
    post: (req, res) => {

        const keys = Object.keys(req.body)
    
        for (key of keys){
            if (req.body[key] == ""){
                return res.send("Preencha todos os campos")
            }
        }
        
        Student.create(req.body, (student) => {
            return res.redirect(`/students/${ student.id }`)
        })

    },
    create: (req, res) => {
        Student.teachersSelectOptions((options) => {
            return res.render('students/create', { teacherOptions: options })
        })
    },
    edit: (req, res) => {
        Student.find(req.params.id, (student) => {
            if(!student) return res.send('Student not found')

            student.birth_date = date(student.birth_date).iso

            Student.teachersSelectOptions((options) => {
                return res.render('students/edit', { student ,teacherOptions: options })
            })
        })
    },
    update: (req, res) => {
        const keys = Object.keys(req.body)
    
        for (key of keys){
            if (req.body[key] == ""){
                return res.send("Preencha todos os campos")
            }
        }

        Student.update(req.body, () => {
            return res.redirect(`students/${req.body.id}`)
        })
    },
    delete: (req, res) => {
        Student.delete(req.body.id, () => {
            return res.redirect('/students')
        })
    }
}

module.exports = controller