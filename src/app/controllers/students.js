const { age, graduation, date, grade } = require('../../lib/utils')

const controller = {
    index: (req, res) => {

        return res.render('students/index')
    },
    show: (req, res) => {
        
        return 
    },
    post: (req, res) => {

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
    
        return
    },
    create: (req, res) => {
        return res.render('students/create')
    },
    edit: (req, res) => {
        return
    },
    update: (req, res) => {
        const keys = Object.keys(req.body)
    
        for (key of keys){
            if (req.body[key] == ""){
                return res.send("Preencha todos os campos")
            }
        }
    },
    delete: (req, res) => {
        return
    }
}

module.exports = controller