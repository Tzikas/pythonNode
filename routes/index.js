var express = require('express');
var router = express.Router();
const { PythonShell } = require('python-shell')
const Word = require('../models/word.js')
const pseudoword = require('pseudoword');
// const app = express()




router.get('/wtf', (req, res, next) => {
  console.log("something is affot!!!!")

  console.log(pseudoword(7))
  //=> 'noorija'

  console.log(pseudoword(5))
  //=> 'atuyo'
  res.send('yaya')
})



router.post('/answer', (req, res, next) => {
  console.log("in answer", req.body)
  Word.findById(req.body.id).then(word=>{ //I would limit this to the ids relevant, right now it's all
      console.log("word ",word)
      if(word.memory.includes(req.body.answer)){
        console.log('correct',req.body.answer)
        let answers = req.body.answer.split(' ')
        let words = word.memory.split(' ')
        let score = 0; 
        answers.forEach(answer => {
          if(words.includes(answer)){ //Doesnt account for repeats
            score++; 
          }
        })
        Word.create({
          memory:word.memory,
          retention: score/words.length,
          originalId: req.body.id
        }).then(result=>{
          res.json(result)
        }).catch(err => console.error(err))
      } else {
        res.json(word)
      } 
  })

  // let word = new Word({
  //   name: 'coolbeans'
  // })
  // word.save().then(response => {
  //   res.json({ hollar: true })
  //   //res.redirect('back')
  //   //res.render('game')
  // }).catch(err => {
  //   console.error('err', err)
  // })
})


router.post('/new-game', (req, res, next) => {
  Word.remove({}).then(wordsRemoved => {
    console.log("new game",req.body)
    words = []
    promises = []
    let lines = Number(req.body.lines)
    let w = Number(req.body.words)
    let letters = Number(req.body.letters)
    
    for (let i = 0; i < lines; i++) { //Number of lines
      let str = pseudoword(letters)
      for(let j = 1; j < w; j++){ //Number of words in each memory 
        str+=' '+pseudoword(letters)
      }
      word = new Word({
        memory: str
      })
      promises.push(
        new Promise((resolve, reject) => word.save((err, w) => {
          words.push(w)
          resolve(w)
        })
        )
      )
    }
    Promise.all(promises).then(function (data) {
      console.log(data, words, 'in promise');
      console.log('word!!!s', data)
      res.json({ data })

    });
  })

})


router.get('/', (req, res) => {
  console.log('in hereeee')

  console.log('in here')
  // Use child_process.spawn method from
  // child_process module and assign it
  // to variable spawn
  var spawn = require("child_process").spawn;

  // Parameters passed in spawn -
  // 1. type_of_script
  // 2. List containing Path of the script
  //    and arguments for the script

  // E.g.: http://localhost:3000/name?firstname=Mike&lastname=Will
  // So, first name = Mike and last name = Will
  var process = spawn('python', ["regression.py",
    'niko',
    'tzikas']);


  // Takes stdout data from script which executed
  // with arguments and send this data to res object
  process.stdout.on('data', function (data) {
    console.log(data, 'data')
    //res.send(data.toString() + ' hihihihih');
    res.render('index', { data: data.toString() })
  })

})

var pyshell = new PythonShell('script.py');


router.get('/shell', (req, res, next) => {
  console.log('hi')
  const options = {
    mode: 'text',
    pythonPath: 'python2.7',
    pythonOptions: ['-u'],
    scriptPath: '',
  };
  // var PythonShell = require('python-shell');

  //pyshell.send(JSON.stringify([1, 2, 3, 4, 5, 6, 7]));
  Word.find({}).then(words => {
    console.log('hihihih', words)
    pyshell.send(JSON.stringify(words));

    pyshell.on('message', function (message) {
      // received a message sent from the Python script (a simple "print" statement)
      console.log('in node', message);
    });
  
    // end the input stream and allow the process to exit
    pyshell.end(function (err) {
      if (err) {
        throw err;
      };
      console.log('finished');
      res.render('game')
    });
  })

})







  //PythonShell
  // PythonShell.run('hello.py', options, function (err, r) {
  //   //PythonShell.runString('x=1+1;print(x)', options, function (err, r) {

  //   if (err) throw err;
  //   console.log('finished???', r);
  //   res.send(r)
  // });

  // let pyshell = new PythonShell('hello.py');

  // // sends a message to the Python script via stdin
  // pyshell.send('hello');

  // pyshell.on('message', function (message) {
  //   // received a message sent from the Python script (a simple "print" statement)
  //   console.log(message);
  // })

  // PythonShell.run('my_script.py', null, function (err, results) {
  //   if (err) throw err;
  //   console.log('finished');
  // });
  // console.log("results ",results)

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });




module.exports = router;
