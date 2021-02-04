$('#menu').hide();

var retrievedData = localStorage.getItem('storedResults');
if (retrievedData){
  $('.modal-bg').hide();
  $('.modal').hide();
}

$('#submit').on('click', function() {
  $('.modal-bg').toggle();
  $('.modal').toggle();
});

$('#dropdown').on('click', function(){
  $('#menu').fadeToggle(500);
});

// send to baby page
$('#underage').on('click', function() {
  window.location.href = 'https://babiesrus.com/';
});

// LOCAL STORAGE
var stringifiedResults = JSON.stringify(['hello', 'true']);
localStorage.setItem('storedResults', stringifiedResults);
