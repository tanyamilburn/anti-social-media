const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const db = require('./config/db')
const {User, Thought} = require('./models')

const URI = `mongodb://127.0.0.1:27017/socialDB`
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
//add data
  const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'))
  const thoughts = JSON.parse(fs.readFileSync(`${__dirname}/_data/thoughts.json`, 'utf-8'))


  const importData = async () => {
    try{
        await User.create(users)
        await Thought.create(thoughts)

        console.log('Data imported...'.green.inverse)
        console.table(users)
        console.table(thoughts)
        process.exit()
        
    }
    catch(err){
        console.log(err)
    }
  }

  //delete data

  const deleteData = async () => {
    try{
        await User.deleteMany()
        await Thought.deleteMany()

        console.log('Data destoryed...'.red.inverse)
        process.exit()
        
    }
    catch(err){
        console.log(err)
    }
  }

  if(process.argv[2] === '-i'){
    importData()
  } else if (process.argv[2] === '-d'){
    deleteData()
  }