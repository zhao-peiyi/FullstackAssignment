const mongoose = require('mongoose')

// Connect the Database
if ( process.argv.length < 3 ) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://peiyi:${password}@cluster0.yuryr.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

// Create Schema and Model
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model( 'Person', personSchema )


// Add new Person
if ( process.argv.length == 5 ) {

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then( result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}

//  Show all person
if ( process.argv.length == 3 ) {

    Person.find({}).then( result => {
        console.log("phonebook:")
        result.forEach( (item, i) => { console.log(item) })
        mongoose.connection.close()
    })
}
