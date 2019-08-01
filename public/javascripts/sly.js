const blanks = [] 

function sly(){

var counter = 0;  //Set default image
function foo() {
    if (0 < counter) {
        counter--
        classes();
    }
    window.setTimeout(foo, 1);
}

foo()
$('#gallery_btn-next').click(function (e) {
    counter++;
    let text = $('.sly li:nth-child(2)').text()
    let id = $('.sly li:nth-child(2)').data("mem_id")
    console.log(text, id)
    let currentId = $('.sly li:nth-child(3)').data("mem_id")
    $('#counter').text(currentId )
    //window.location.search = `id=${currentId}`; 
    if(text != ''){
        $('#score').append(`<li id=${id}>${id} : <span>0</span></li>`)
    }
    $('.sly li:nth-child(2)').text('') 
})

$('#gallery_btn-prev').click(function (e) {
    counter--;
    let text = $('.sly li:nth-child(2)').text()
    let id = $('.sly li:nth-child(2)').data("mem_id")
    console.log(text, id)
    //  $('#counter').text( $('.sly li:nth-child(1)').data("mem_id"))
    let currentId = $('.sly li:nth-child(1)').data("mem_id")
    $('#counter').text(currentId )
    //window.location.search = `&id=${currentId}`; 
    if(text != ''){
        $('#score').append(`<li id=${id}>${id} : <span>0</span></li>`)
    }
    $('.sly li:nth-child(2)').text('') 

})

function classes() {
    $('.sly ul').append($('.sly li:first-child'))
}

function backClasses() {
    $('.sly ul').prepend($('.sly li:last-child'))
}

function bar() {
    if (0 > counter) {
        counter++;
        backClasses();
    }
    window.setTimeout(bar, 1);
}

function clearAfterSeen(){

}

bar()


var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
var viewPortWidth = Math.round((parseInt($(".sly li").css('width'), 10) / w) * 100);
var viewPortHeight = Math.round((parseInt($(".sly li").css('height'), 10) / h) * 100);


var stylez = ''
for (var i = 0; i < $('.sly ul').children().length; i++) {

    stylez += ".sly li:nth-child(" + (i + 1) + "){left:" + ((i * viewPortWidth - viewPortWidth)) + "vw;}"

}


var sheet = document.createElement('style')
sheet.innerHTML = stylez;
document.body.appendChild(sheet);


}


