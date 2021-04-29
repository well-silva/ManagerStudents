const db = require('../../config/db')
const { age, graduation, date, grade } = require('../../lib/utils')

module.exports = {
  all(callback) {

    const query = `
            SELECT *
            FROM students 
            ORDER BY name ASC
        `
        
    db.query(query, (err, results) => {
        if(err) throw `Database Error ${err}`
        
        callback(results.rows)
    })

  },
  create(data, callback){

    const query = `
    INSERT INTO students (
        name,
        avatar_url,
        email,
        education_level,
        birth_date,
        workload,
        teacher_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
    `
    
  const values = [
      data.name,
      data.avatar_url,
      data.email,
      data.education_level,
      date(data.birth_date).iso,
      data.workload,
      data.teacher
  ]

  db.query(query, values, (err, results) => {
    if(err) throw `Database Error ${err}`

    callback(results.rows[0])
  })

  },
  find(id, callback) {
    const query =`
      SELECT students.*, teachers.name AS teacher_name
      FROM students
      LEFT JOIN teachers ON (students.teacher_id = teachers.id)
      WHERE students.id = $1
    `

    db.query(query, [id], (err, results) => {
      if(err) throw `Database Error ${err}`

      callback(results.rows[0])
    })
  },
  update(data, callback) {
    const query = `
    UPDATE students SET
      avatar_url=($1),
      name=($2),
      email=($3),
      birth_date=($4),
      education_level=($5),
      workload=($6),
      teacher_id=($7)
    WHERE id = $8
    `

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth_date).iso,
      data.education_level,
      data.workload,
      data.teacher,
      data.id
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error ${err}`

      callback()
    })
  },
  delete(id, callback) {
    db.query(`DELETE FROM students WHERE id = $1`, [id], (err, results) => {
      if(err) throw `Database Error ${err}`

      return callback()
    })
  },
  teachersSelectOptions(callback) {
    db.query(`SELECT name, id FROM teachers`, (err, results) => {
      if (err) throw 'Database Error'

      callback(results.rows)
    })
  }
}