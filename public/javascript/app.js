$('#menu').hide();

var retrievedData = localStorage.getItem('storedResults');
if (retrievedData) {
  $('.modal-bg').hide();
  $('.modal').hide();
}

$('#submit').on('click', function () {
  $('.modal-bg').toggle();
  $('.modal').toggle();
});


$('#dropdown').on('click', function(){
  $('#menu').fadeToggle(500);

});

// send to baby page
$('#underage').on('click', function () {
  window.location.href = 'https://babiesrus.com/';
});

// LOCAL STORAGE
var stringifiedResults = JSON.stringify(['hello', 'true']);
localStorage.setItem('storedResults', stringifiedResults);


// DAD JOKE
const jokeEl = document.getElementById('joke');
const get_joke = document.getElementById('get_joke');
get_joke.addEventListener('click', generateJoke);
generateJoke();
async function generateJoke() {
  const jokeRes = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      'Accept': 'application/json'
    }
  });
  const joke = await jokeRes.json();
  console.log(joke);
  jokeEl.innerHTML = joke.joke;
}

// 5 0'clock somewhere function
const fivePm = 24 - moment().format('H');
const placeRes = document.getElementById('place');
let render = function (num){
  console.log(num);
  $('#place').innerHTML(place[num]);};

  

  // render(fivePm);

let place = [
  'U.S. Minor Outlying Islands',
  'American Samoa',
  'Hawaii',
  'French Polynesia',
  'Alaska',
  'California',
  'Colorado',
  'Illinois',
  'New York',
  'Nova Scotia',
  'Nuuk, Greenland',
  'Cape Verde',
  'Iceland',
  'England',
  'Germany',
  'Finland',
  'Armenia',
  'Uzbekistan',
  'Bhutan',
  'Thailand',
  'China',
  'Japan',
  'Guam',
  'New Zealand'
];
