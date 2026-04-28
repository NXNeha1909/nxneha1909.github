var pool = [
  { q: "How many players in a cricket team?",              opts: ["9","10","11","12"],                                                                   ans: 2 },
  { q: "How many balls in one over?",                      opts: ["4","5","6","8"],                                                                      ans: 2 },
  { q: "What does LBW stand for?",                         opts: ["Left Before Wicket","Leg Before Wicket","Last Ball Win","Length Before Width"],        ans: 1 },
  { q: "What is a duck?",                                  opts: ["Scoring 10 runs","Out for 0","A wide ball","Hitting 4 sixes"],                        ans: 1 },
  { q: "Which format lasts up to 5 days?",                 opts: ["T20","ODI","T10","Test Match"],                                                       ans: 3 },
  { q: "Runs when ball clears boundary without bouncing?", opts: ["2","4","6","8"],                                                                      ans: 2 },
  { q: "Who has the most ODI centuries?",                  opts: ["Virat Kohli","Ricky Ponting","AB de Villiers","Sachin Tendulkar"],                     ans: 3 },
  { q: "Who took 800 Test wickets?",                       opts: ["Shane Warne","Glenn McGrath","Anil Kumble","Muralitharan"],                           ans: 3 }
];

var qs, i, score, done;

function start() {
  qs    = pool.slice().sort(() => Math.random() - 0.5).slice(0, 5);
  i     = 0;
  score = 0;
  document.getElementById('quizBox').style.display  = 'block';
  document.getElementById('scoreBox').style.display = 'none';
  show();
}

function show() {
  done = false;
  var q = qs[i];
  document.getElementById('count').textContent    = 'Question ' + (i + 1) + ' of 5';
  document.getElementById('question').textContent = q.q;
  document.getElementById('feedback').className   = 'feedback';
  document.getElementById('feedback').textContent = '';
  document.getElementById('nextBtn').className    = 'next';

  document.getElementById('options').innerHTML = q.opts
    .map((o, n) => '<button class="opt" onclick="pick(this,' + n + ')">' + o + '</button>')
    .join('');
}

function pick(btn, n) {
  if (done) return;
  done = true;

  var q   = qs[i];
  var all = document.querySelectorAll('.opt');
  var fb  = document.getElementById('feedback');

  all.forEach(b => b.style.pointerEvents = 'none');
  all[q.ans].classList.add('correct');

  if (n === q.ans) {
    score++;
    fb.textContent = 'Correct!';
    fb.className   = 'feedback show ok';
  } else {
    btn.classList.add('wrong');
    fb.textContent = 'Wrong! It was: ' + q.opts[q.ans];
    fb.className   = 'feedback show err';
  }

  document.getElementById('nextBtn').className = 'next show';
}

function next() {
  i++;
  if (i < qs.length) show();
  else end();
}

function end() {
  document.getElementById('quizBox').style.display  = 'none';
  document.getElementById('scoreBox').style.display = 'block';
  document.getElementById('finalScore').textContent = score + '/5';
  var msgs = ['Keep practising!','Keep practising!','Not bad!','Good effort!','Excellent!','Perfect!'];
  document.getElementById('msg').textContent = msgs[score];
}

