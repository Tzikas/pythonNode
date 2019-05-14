var express = require('express');
var router = express.Router();
const {PythonShell} = require('python-shell')

// const app = express()

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
  var process = spawn('python',["hello.py",
                          'niko',
                          'tzikas'] );


  // Takes stdout data from script which executed
  // with arguments and send this data to res object
  process.stdout.on('data', function(data) {
    console.log(data)
      res.send(data.toString());
  })

})


router.get('/shell', (req,res,next) =>{
  console.log('hi')
  const options = {
      mode: 'text',
      pythonPath: 'python2.7',
      pythonOptions: ['-u'],
      scriptPath: '',
    };
    

    PythonShell.run('hello.py', options, function (err,r) {
    //PythonShell.runString('x=1+1;print(x)', options, function (err, r) {

          if (err) throw err;
          console.log('finished???', r);
          res.send(r)
  });

  // PythonShell.run('my_script.py', null, function (err, results) {
  //   if (err) throw err;
  //   console.log('finished');
  // });
  // console.log("results ",results)
})

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });




module.exports = router;
