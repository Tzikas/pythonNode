$('form.answer').submit(e => {
    e.preventDefault()
    console.log($(e.target).find('input').val())

    $.post('answer', 
      { 
        answer: $(e.target).find('input').val() ,
        id: $('#counter').text()
      }).then(res => {
        console.log(res)
        $('.sly li:nth-child(2)').text(res.memory)
        $(`#${res.originalId} span`).text(res.retention)
        // trace1.x.push(Math.floor(Math.random() * 5))
        // trace1.y.push(Math.floor(Math.random() * 5))
        console.log(data)
        //Plotly.redraw('myDiv', data)
    })
  })

  $('form.new_game').submit(e => {
    e.preventDefault()
    console.log(
        $(e.target).serialize(),
        
    )
    // console.log($(e.target).find('input'), '9999')
    $.post('new-game', serializeToJSON( $(e.target).serialize()) ).then(res => {
      console.log(res)

      $('form.new_game').hide()
      console.log('wewewe?')
      //trace1.x.push(Math.floor(Math.random() * 5))
      //trace1.y.push(Math.floor(Math.random() * 5))
      createSlides(res.data)
      sly()
      console.log(data)

      //Plotly.redraw('myDiv', data) //This may kill something 
    })
  })


  const createSlides = (data) => {
    let cards = ``
    //let score = ``
    const answers = []
    $('#counter').text(data[1]._id)
    data.forEach(card => {
        answers.push({
          _id: card._id,
          memory: card.memory  
        })
        cards += `<li data-mem_id=${card._id}>${card.memory}</li>`
        //score += `<li id=${card._id}>${card._id} : <span>0</span></li>`
    });
    console.log(cards)
    $('.sly ul').html(cards)
    //$('ul#score').html(score)

  }


  const serializeToJSON = str => 
  str.split('&')
    .map(x => x.split('='))
    .reduce((acc, [key, value]) => ({
      ...acc,
      [key]: isNaN(value) ? value : Number(value)
    }), {})


  var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'lines+markers'
  };

  /* setInterval(function(){
     console.log('hi',data)
       //Plotly.newPlot('myDiv', data, layout, { showSendToCloud: true });
       return 
   },500)*/
  /*
    var trace2 = {
      x: [2, 3, 4, 5],
      y: [16, 5, 11, 10],
      mode: 'lines'
    };
  
    var trace3 = {
      x: [1, 2, 3, 4],
      y: [12, 9, 15, 12],
      mode: 'lines+markers'
    };
  */
  var data = [trace1];

  var layout = {};

  //Plotly.newPlot('myDiv', data, layout, { showSendToCloud: true });



  /*setInterval(()=>{
     trace1.x.push(Math.floor(Math.random()*5))
     trace1.y.push(Math.floor(Math.random()*5))
     console.log(data)
     Plotly.redraw('myDiv', data)
   },1000) */