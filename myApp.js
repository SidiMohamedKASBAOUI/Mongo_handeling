require('dotenv').config();
const dotenv = require('dotenv');
const mongoose = require('mongoose');


// #1 
mongoose.connect(process.env.MONGO_URI);

// #2
let personSchema  = new mongoose.Schema({
  name: {
        type : String,
        required: true
  },
  age: Number,
  favoriteFoods : [String]
});

let Person;

Person = mongoose.model('Person', personSchema);
//module.exports = Person;
const createAndSavePerson = (done) => {
  
  var mohamed = new Person({
    name:'mohamed',
    age:30,
    favoriteFoods:['pasta', 'lasagna']
  });
  mohamed.save(function(err, data) {
    done(err, data)
  });
};
let arrayOfPeople = [
    
  {
    name: 'Mohamed',
    age: 30,
    favoriteFoods: ['pasta', 'lasagna']
  },
  {
    name: 'Sara',
    age: 25,
    favoriteFoods: ['sushi', 'ramen']
  },
  {
    name: 'John',
    age: 28,
    favoriteFoods: ['pizza']
  }
  
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    done(err, data)})
};
let personName = 'john';
const findPeopleByName = (personName, done) => {
  Person.find({ name: `${personName}` }, function(err, data) {
    done(err, data)})
  
};
let food ='pizza'; 
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:`${food}`}, function(err, data) {
    done(err, data)} )
};
let personId = 'genericId'
const findPersonById = (personId, done) => {
  Person.findById({_id:`${personId}`}, function(err, data) {
    done(err, data)})
  
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id:`${personId}`}, function(err, data) {
    data.favoriteFoods.push(foodToAdd);
    data.save((err,data)=>{done(err,data)});
    })

  
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName}, {$set:{age:ageToSet} },{ new: true } , (err, data)=>{
    done(err,data);
  })

  
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id:`${personId}`}, (err, data)=>{done(err,data)})
  
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, (err,data)=>{
    done(err,data);
  })

  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort('name').limit(2).select('-age').exec((err,data)=>{done(err,data)});


};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
