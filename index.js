require('dotenv').config();
const mongoose = require('mongoose');
console.log(process.env.CONNECTION_STRING);

//Installing and setting up Mongoose:
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

let PersonModel = require('./person')

//Create a person with this prototype:
let person = new PersonModel({
    name: 'sherine',
    age: 24,
    favoritefoods: ['pasta','sushi','pizza']
})

//Create and Save a Record of a Model
person.save(function(err,data){
    if(err)
    console.error(err)
    else
    console.log(data)
})


const callback = (data) => 
{
    const favoritefood = data.favoritefoods;
    favoritefood.push('Hamburger');
    PersonModel.findByIdAndUpdate(data._id,{favoritefood}).then(data => console.log(data)).catch(err=> console.error(err));
}

//Create Many Records with model.create()
PersonModel.create([{name:'ahmed',age: 22 , favoritefoods: ['pizza', 'pasta']},{name:'habiba',age: 23 , favoritefoods: ['fish', 'chicken']}]);
PersonModel.create([{name:'mohamed',age: 10 , favoritefoods: ['pizza', 'burritos']},{name:'nada',age: 9 , favoritefoods: ['burritos', 'chicken']}]);

//Use model.find() to Search Your Database
PersonModel.find({name: 'ahmed'}).then(data => console.log(data)).catch(err=> console.error(err)); 
//Use model.findOne() to Return a Single Matching Document from Your Database
PersonModel.findOne({ favoritefoods: 'chicken' }).then(data => console.log(data)).catch(err=> console.error(err));
//Use model.findById() to Search Your Database By _id
PersonModel.findById('60a786368b57560eb8f6debc').then(data => console.log(data)).catch(err=> console.error(err));
//Perform Classic Updates by Running Find, Edit, then Save
PersonModel.findById('60a786368b57560eb8f6debc')
    .then(callback).catch(err=> console.error(err));
//Perform New Updates on a Document Using model.findOneAndUpdate()
PersonModel.findOneAndUpdate({name: 'sherine'},{age: 22},{new:true, useFindAndModify:false}).then(data => console.log(data)).catch(err=> console.error(err));
//Delete One Document Using model.findByIdAndRemove
PersonModel.findByIdAndRemove('60a786368b57560eb8f6debc').then(data => console.log(data)).catch(err=> console.error(err));
//MongoDB and Mongoose - Delete Many Documents with model.remove()
PersonModel.deleteMany({ name: 'ahmed' });

//Chain Search Query Helpers to Narrow Search Results
PersonModel.find({favoritefoods: 'burritos'}).sort({name:1}).limit(2).select({age:false}).exec().then(docs => {console.log(docs)}).catch(err => {console.error(err)});