const db = require('../../config/db')
const { age, graduation, date, grade } = require('../../lib/utils')

module.exports = {
  all(callback) {

    const query = `
      SELECT teachers.*, COUNT(students) AS total_students
      FROM teachers
      LEFT JOIN students on (students.teacher_id = teachers.id)
      GROUP BY teachers.id
      ORDER BY total_students DESC
  `
        
    db.query(query, (err, results) => {
        if(err) throw `Database Error ${err}`
        
        callback(results.rows)
    })

  },
  create(data, callback){

    const query = `
    INSERT INTO teachers (
        name,
        avatar_url,
        education_level,
        subjects_taught,
        birth_date,
        class_type,
        created_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
    `
    
  const values = [
      data.name,
      data.avatar_url,
      data.education_level,
      data.subjects_taught,
      date(data.birth_date).iso,
      data.class_type,
      date(Date.now()).iso
  ]

  db.query(query, values, (err, results) => {
    if(err) throw `Database Error ${err}`

    callback(results.rows[0])
  })

  },
  find(id, callback) {
    const query =`
      SELECT * FROM teachers WHERE id = $1
    `

    db.query(query, [id], (err, results) => {
      if(err) throw `Database Error ${err}`

      callback(results.rows[0])
    })
  },
  update(data, callback) {
    const query = `
    UPDATE teachers SET
      avatar_url=($1),
      name=($2),
      birth_date=($3),
      education_level=($4),
      class_type=($5),
      subjects_taught=($6),
      created_at=($7)
    WHERE id = $8
    `

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth_date).iso,
      data.education_level,
      data.class_type,
      data.subjects_taught,
      date(Date.now()).iso,
      data.id
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error ${err}`

      callback()
    })
  },
  delete(id, callback) {
    db.query(`DELETE FROM teachers WHERE id = $1`, [id], (err, results) => {
      if(err) throw `Database Error ${err}`

      return callback()
    })
  }
}