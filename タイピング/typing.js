const wordlist = [
  "aaiebakouiu","isogabamaware","uogokoroarebamizugokoro","ennositanotikaramoti","oninomenimonamida","kaiinunitewokamareru","kyuusiniissyouwoeru","kutihawazawainomoto","geizyutuhanagakuzinseihamizikasi","koukaisakinitatazu","sarumokikaraotiru","siranugahotoke","suimoamaimokamiwaketa","zenhaisoge","daihasyouwokaneru","tirimotumorebayamatonaru","turuhasennenkamehamannen","tenhanibutuwoataezu","tokihakanenari","nagaimononihamakarero","nidoarukotohasandoaru","nukanikugi","nekonotemokaritai","norenniudeosi","hayaokihasanmonnotoku","hinonaitokoronikemurihatatanu","hukusuibonnikaerazu","benkeinonakidokoro","hotokenokaomosando","mayugewoyomareru","mikaradetasabi","musumehitorinimukohatinin","menihame,hanihaha","motonosayaniosamaru","yakeisinimizu","yudantaiteki","yowarimenitatarime","rakuhakunotane,kuharakunotane","ryouyakuhakutininigasi","ruihatomowoyobu","reiniyottereinogotosi","rongoyominorongosirazu","waraukadonihahukukitaru","unnkohakusai","kyabetunosenngiri","onnwoadadekaesu","soutyourannninngu","uekarayonndemosinnbunnsi","eigakanndehirune","tapiokamirukutexi-","wareomouyueniwareari","tyourisimennkyo","gannbattekudasai","nettaiteikiatu","hitoridekakaekomanaide","makkuhaumai","puroguraminngu","taipinngu","suma-tohoxonn","pa-sonarukonnpyu-ta","huyuhasamui","natuhaatui","kutusitahakusai","tyuukazinnminnkyouwakoku","daikannminnkoku","amerikagassyuukoku","o-sutoraria"
];

const wordlistJapanese = [
  "ああ言えばこう言う","急がば回れ","魚心あれば水心","縁の下の力持ち","鬼の目にも涙","飼い犬に手を噛まれる","九死に一生を得る","口は禍の元","芸術は長く人生は短し","後悔先に立たず","猿も木から落ちる","知らぬが仏","酸いも甘いも噛み分けた","善は急げ","大は小を兼ねる","塵も積もれば山となる","鶴は千年亀は万年","天は二物を与えず","時は金なり","長い物には巻かれろ","二度あることは三度ある","糠に釘","猫の手も借りたい","暖簾に腕押し","早起きは三文の徳","火のないところに煙は立たぬ","覆水盆に反らず","弁慶の泣き所","仏の顔も三度","眉毛を読まれる","身から出た錆","娘一人に婿八人","目には目、歯には歯","元の鞘に納まる","焼け石に水","油断大敵","弱り目に祟り目","楽は苦の種、苦は楽の種","良薬は口に苦し","類は友を呼ぶ","例によって例の如し","論語読みの論語知らず","笑う門には福来たる","うんこは臭い","キャベツの千切り","恩を仇で返す","早朝ランニング","上から読んでも新聞紙","映画館で昼寝","タピオカミルクティー","我思う故に我あり","調理師免許","頑張ってください","熱帯低気圧","一人で抱え込まないで","マックはうまい","プログラミング","タイピング","スマートフォン","パーソナルコンピュータ","冬は寒い","夏は暑い","靴下は臭い","中華人民共和国","大韓民国","アメリカ合衆国","オーストラリア"
];

let time_limit = 90;
let readytime = 3;
let score;
let correct;
let mistake;
let char_num = 0;
let word_char;
let random;

function ready(){
  readytime = 3;
  scoredis.innerHTML="";
  start_button.style.visibility ="hidden";
  var readytimer = setInterval(function(){
  count.innerHTML=readytime;
  readytime--;
  if(readytime < 0){
    clearInterval(readytimer);
    gameStart();
  }
  },1000);
};

function gameStart(){
  
  score = 0.0;
  mistake = 0;
  correct = 0;
  wordDisplay();
  var time_remaining = time_limit;
  var gametimer = setInterval(function(){
    count.innerHTML="残り時間："+time_remaining;
    const $conut = document.getElementById("count");
    $conut.style.display = 'none';
  },1000);
}

function wordDisplay(){
  random = Math.floor( Math.random() * wordlist.length );
  word.innerHTML=wordlist[random];
  japanese.innerHTML=wordlistJapanese[random];
  charInsort();
}
function charInsort(){
  word_char = wordlist[random].charAt(char_num);
}

document.onkeydown = function(e) {
  if(e.keyCode == 189){
    keyStr = "-";
  }else if(e.keyCode == 188){
    keyStr = ","
  }else{
    var keyStr = String.fromCharCode(e.keyCode);
    keyStr = keyStr.toLowerCase();
  };

  const correcttext = document.getElementById("correct");
  correcttext.textContent = correct;
  const mistaketext = document.getElementById("mistake");
  mistaketext.textContent = mistake;
  const Accuracy_ratetext = document.getElementById("Accuracy-rate");
  Accuracy_ratetext.textContent = Math.floor(100 - mistake / correct * 100) + "%";

  if(keyStr == word_char){

    document.getElementById('missaudio').pause();
    document.getElementById('missaudio').currentTime = 0;
    document.getElementById('correctaudio').pause();
    document.getElementById('correctaudio').currentTime = 0;
    document.getElementById('correctaudio').play();
    word.innerHTML="<span style='color: red;'>"+wordlist[random].substr(0,char_num+1)+"</span>"+wordlist[random].substr(char_num+1,wordlist[random].length);
    char_num++;
    correct++;
    charInsort();
  }else{
    document.getElementById('missaudio').pause();
    document.getElementById('missaudio').currentTime = 0;
    document.getElementById('correctaudio').pause();
    document.getElementById('correctaudio').currentTime = 0;
    mistake++;
    document.getElementById('missaudio').play();
  }
  if(char_num == wordlist[random].length){
    char_num=0;
    wordDisplay();
  }
};