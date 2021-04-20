module.exports = {
    age: (timestamp) => {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        birthDate.getDate()

        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()){
            age = age - 1
        }

        return age;
    },
    graduation: (graduation) => {
        if (graduation == 'media'){
            return 'Ensino Médio Complemto'
        }else if(graduation == 'superior'){
            return 'Ensino Superior Completo'
        }else if(graduation == 'mestrado'){
            return 'Mestrado'
        }else{
            return 'Doutorado'
        }
    },
    date: (timestamp) => {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            iso: `${year}-${month}-${day}`,
            birthday: `${day}/${month}`,
            day,
            month,
            year
        }
    },
    grade: (year) => {
        if (year == '5F'){
            return '5º Ano do Ensino Fundamental'
        }else if (year == '6F'){
            return '6º Ano do Ensino Fundamental'
        }else if (year == '7F'){
            return '7º Ano do Ensino Fundamental'
        }else if (year == '8F'){
            return '8º Ano do Ensino Fundamental'
        }else if (year == '9F'){
            return '9º Ano do Ensino Fundamental'
        }else if (year == '1M'){
            return '1º Ano do Ensino Médio'
        }else if (year == '2M'){
            return '2º Ano do Ensino Médio'
        }else {
            return '3º Ano do Ensino Médio'
        }
    }
}