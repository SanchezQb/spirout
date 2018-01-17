var express = require('express')
var router = express.Router()
var Content = require('../models/content')
var Category = require('../models/category')
var Session = require('../models/session')
var User = require('../models/user')

router.get('/', function(req, res){
Category.find({}, function(err, categories){
  if(err){
    console.log(err)}
else {res.json({categories: categories})}})})


router.get('/category/:id', function(req, res){
  console.log('hello you called me')
Category.findById(req.params.id, function(err, selectedcategory){
if(err) {
console.log(err)}
else {
  console.log(selectedcategory)
if(selectedcategory !== null) {
  
Content.find({category: selectedcategory.name}, function(err, category_content){
if(err) {
console.log(err)}
else {
  console.log(category_content)
  res.json({category: selectedcategory, content: category_content, status: 500 })}})}
else { res.json({ category:null, content: null, status:504 })}}})})


router.delete('/category/:id', function(req, res){
Category.findById(req.params.id, function(err, category){
if(err){
console.log(err)
} else {
Content.find({category: category.name}, function(err, contents){
if(err){
console.log(err)
} else {
if(contents.length > 0){
contents.forEach(content => {
content.remove()})
category.remove()
res.json({message: 'Successfully popped it off and its content'})}
else {
category.remove()
res.json({message: 'Successfully popped it off'})}}})}})})


module.exports = router
