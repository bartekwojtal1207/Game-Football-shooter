
  var game = new Phaser.Game(1200, 700, Phaser.AUTO, '', { preload: preload, create: create, update: update});

  //u gory, tworzenie obiektu phaser game (okreslenie jego szerokosci wysokosci, i funckje jakie obiekt zawiera ) przypistanie
  // tego do zmienej "game"
  function preload() {

    game.load.image("mainBg","assets/champions-league.jpg" );
    game.load.image("ageFoto","assets/pegi3.gif");
    game.load.image("startBtn","assets/start.png");//zaladowanie zdjec do pierwszego stanu gry
    game.load.image("pomoc","assets/pomocBtn.png");
    game.load.image("ustawienia","assets/ustawienia.png");
    game.load.image("koniec","assets/koniec.png");
//zdjecia menu
    game.load.image("ball","assets/ball5.png");
    game.load.image("gate","assets/gate.png");
    game.load.image("foster","assets/foster2.png");
    game.load.image("bandy","assets/1.png");
    game.load.image("bandy2","assets/2.png");
    game.load.image("sky","assets/sky.png");
    game.load.image("weed","assets/murawa2.png");
    game.load.image("arrow","assets/arrow.png");
    game.load.image("fans", "assets/audience.jpg");
    game.load.image("box","assets/box.png");
    game.load.image("star","assets/klepsydra.png");
    game.load.image("tablica","assets/tablica.png");
    game.load.image("prev","assets/prev.png");
    game.load.image("next","assets/next.png");
    game.load.image("power","assets/powerShoot.png");
// zdjecia rozgrywka
    game.load.image("lewy","assets/lewy2.png");
    game.load.image("ronaldo","assets/RONALDO.png");
    game.load.image("messi","assets/messi2.png");
    game.load.image("stadion","assets/stadion.jpg");
    game.load.image("messiBtn","assets/messiBtn.png");
    game.load.image("lewandowskiBtn","assets/lewandowskiBtn.png");
    game.load.image("ronaldoBtn","assets/ronaldoBtn.png");
    game.load.image("poland","assets/POLAND.png");
    game.load.image("spain","assets/spain.png");
    game.load.image("brazil","assets/brazil.png");
    game.load.image("germany","assets/germany.png");
    game.load.image("argentina","assets/argentina.png");
    game.load.image("portugal","assets/portugal.png");
    game.load.image("cup","assets/cup.png");
    game.load.image("winner","assets/winner.png");
    game.load.image("celeba","assets/celebration.jpg");
    game.load.image("looser","assets/Looser.png");
    game.load.image("looserFoto","assets/cry.jpg");

    game.load.audio("mainSong", ['assets/audio/uefa.mp3', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);
    game.load.audio("fansGoal", ['assets/fans.ogg', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);
};
  //game.load.audio("klik", ['assets/klik.mp3', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);

  function create() {
    var background = game.add.sprite(0,0,"mainBg");
    background.scale.setTo(2,2);
    game.add.button(500,250,"startBtn",playGame);
    game.add.button(495,350,"pomoc",helpPanel);
    game.add.button(500,450,"koniec",endGame);// dodanie 3 buttonow do glownego menu
    music = game.add.audio("mainSong");
    music.play();
  };
  function update() {
  };
  var firstLevel = {};
  firstLevel.First = function(game){
      var text;
      var ball;
      var gate;
      var box;
      var foster;
      var arrow;
      var bounds;
      var cursors;
      var fireButton;
      var star;
      var power;
  };
    var score = 0;
    var scoreAway = 0;
    var scoreText;
    var counter = 0;
//    do liczenie momentu ktora z pilek jest odpalana
    var counter_Power = 0;
    var counter_x  = 0;
    var counterLevel = 0;
    var przyklad ;//przyklad zwraca wartosc wybranego pilkarza
    // do liczenia sily strzalu
  firstLevel.First.prototype = {
     create: function() {

       var counter = 0;
       var counter_rund = 1 ;
       var counter_Power=0;
       var counter_x =0;
       var counterLevel = counter - 2 ;
          music.destroy();
        //usuniecie muzyki z poprzedniego stanu
          game.physics.startSystem(Phaser.Physics.ARCADE);
          this.add.sprite(0,0,"sky").scale.setTo(2,0.2);
          game.add.sprite(0,0,"fans").scale.setTo(1,0.45);
          game.add.sprite(615,0,"fans").scale.setTo(1,0.45);
          this.add.sprite(0,190,"weed");
          band = create_band(-5,82,"bandy")
          //band.scale.setTo(1,0.8);
          band2 = create_band(705,85,"bandy2")
          arrow =create_arrow(game.world.centerX, 650, "arrow");//strzalka
          gate = create_gate(game.world.centerX-250,0,"gate");//bramka
          box = create_box(game.world.centerX-230,game.world.centerY-120,"box");//s.scale.setTo(0.07,0.05); //140x 100
          box2 = create_box(game.world.centerX+100,game.world.centerY-330,"box");//s.scale.setTo(0.07,0.05); //140x 100
          box3 = create_box(game.world.centerX+100,game.world.centerY-330,"box");//s.scale.setTo(0.07,0.05); //140x 100// pudelka x3
          star = create_star(game.world.centerX- game.rnd.integerInRange(-120, 300), game.world.centerY-game.rnd.integerInRange(-100, -10),"star");
          star2 = create_star(game.world.centerX- game.rnd.integerInRange(-80, 320), game.world.centerY-game.rnd.integerInRange(-50, 50),"star");
          keaper = create_keaper(game.world.centerX,70,"foster");
          tablica = game.add.sprite(-100, -50, "tablica");
          //bramkarz, obrazek, cialo, skalowanie obraza, odbiajanie od scian gry
          keaper.body.velocity.x += 400;
          //dodanie ruchu bramkarza
          ball = create_ball(game.world.centerX-20,600,"ball");
          ball2 = create_ball(game.world.centerX-20,600,"ball");
          ball3 = create_ball(game.world.centerX-20,600,"ball");
          ball_velocity = 1200;
          ball_launched = false;
        // dodanie 3 pilek wiem ze to chyba nie powinno tak wygladac ale na razie nie znalazlem innego sposobu
          cursors = game.input.keyboard.createCursorKeys();
          fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
          //dodawanie zczytywania przyciskow
         scoreText = game.add.text(45, 106, score, { fontSize: '50px', fill: '#FFF' });
         scoreAwayText = game.add.text(180, 106, scoreAway, { fontSize: '50px', fill: '#FFF' });
     },
      First: function(){
        this.state.start('First');
    },
      update: function(){
        var counter_round = 1 ;
        runda = game.add.text(game.world.centerX+400,10, "Runda"+counter_round,{fill: "#fff"});
        runda.font = 'Arial';
        runda.fontSize = 42;
        var opponent = game.add.text(game.world.centerX+400,80,"vs",{fill:"#fff"});
        var spain  = game.add.sprite(game.world.centerX+ 450, 80,"spain").scale.setTo(0.2,0.2);
        game.physics.arcade.collide(ball, keaper, collisionHandler, null, this);
        game.physics.arcade.collide(ball2, keaper, collisionHandler, null, this);
        game.physics.arcade.collide(ball3, keaper, collisionHandler, null, this);
        function collisionHandler (ball, keaper) {
          ball.kill();
          counter ++;
          noGoal();
        };
        function collisionHandler (ball2, keaper) {
          ball2.kill();
          noGoal();
          counter ++;
      };
      function collisionHandler (ball3, keaper) {
          ball3.kill();
          noGoal();
          counter ++;
      };
      // dodanie 3 funkcji do wylapania momenutu gdy pilka 1,2 lub 3 odbija sie od bramkarza (var keaper)
      game.physics.arcade.collide(ball, gate, collisionHandlerGoal, null, this);
      game.physics.arcade.collide(ball2, gate, collisionHandlerGoal, null, this);
      game.physics.arcade.collide(ball3, gate, collisionHandlerGoal, null, this);
      function collisionHandlerGoal (ball, gate) {
          if (counter_x >= 3 ) {
            ball.body.velocity.setTo(30,-1200);
            goal();
            ball.kill();
            counter ++;
            counter_x = 0;
            counter_Power = 0;
          }else if(counter_x <3 ){
            goal();
            ball.kill();
            counter ++;
            counter_Power  = 0;
            counter_x = 0;
          };
      };
      // dodanie 3 funckji do wylapania momentu gdy pilka uderza w CIALO (!!! nie w sama bramke !!!) bramki
      game.physics.arcade.collide(ball, box, collisionHandlerBox, null, this);
      game.physics.arcade.collide(ball2, box, collisionHandlerBox, null, this);
      game.physics.arcade.collide(ball3, box, collisionHandlerBox, null, this);
      game.physics.arcade.collide(ball, box2, collisionHandlerBox, null, this);
      game.physics.arcade.collide(ball2, box2, collisionHandlerBox, null, this);
      game.physics.arcade.collide(ball3, box2, collisionHandlerBox, null, this);

        function collisionHandlerBox (ball, box){
          noGoal();
          counter ++;
          counter_Power  = 0;
          counter_x = 0;
          ball.kill();
        };
        function collisionHandlerBox2 (ball, box2){
          noGoal();
          counter ++;
          counter_Power  = 0;
          counter_x = 0;
          ball.kill();
        };
        game.physics.arcade.collide(ball, band, collisionHandlerBand, null, this);
        game.physics.arcade.collide(ball2, band, collisionHandlerBand, null, this);
        game.physics.arcade.collide(ball3, band, collisionHandlerBand, null, this);
        game.physics.arcade.collide(ball, band2, collisionHandlerBand, null, this);
        game.physics.arcade.collide(ball2, band2, collisionHandlerBand, null, this);
        game.physics.arcade.collide(ball3, band2, collisionHandlerBand, null, this);
        function collisionHandlerBand (ball, band){
          noGoal();
          counter ++;
          counter_Power  = 0;
          counter_x = 0;
          ball.kill();
        };
        function collisionHandlerBand (ball, band2){
          noGoal();
          counter ++;
          counter_Power  = 0;
          counter_x = 0;
          ball.kill();
        };
          game.physics.arcade.collide(ball, star, collisionHandlerStar, null, this);
          game.physics.arcade.collide(ball2, star, collisionHandlerStar, null, this);
          game.physics.arcade.collide(ball3, star, collisionHandlerStar, null, this);
          game.physics.arcade.collide(ball, star2, collisionHandlerStar2, null, this);
          game.physics.arcade.collide(ball2, star2, collisionHandlerStar2, null, this);
          game.physics.arcade.collide(ball3, star2, collisionHandlerStar2, null, this);
          function collisionHandlerStar (ball, star){
            star.kill();
          };
          function collisionHandlerStar2 (ball, star2){
            star2.kill();
          };
       keaper.body.velocity.y = 0 ;
       keaper.body.maxVelocity.x = 400 ;
       // dwie metody do ruszania bramkarza
       controlGame();
       if (keaper.body.x > 720) {
         keaper.body.velocity.x -=400;
       }else if (keaper.x < 340) {
        keaper.body.velocity.x +=400;
      };
      switch (przyklad) {
        case "messi":
          game.add.sprite(game.world.centerX+330, 80,'argentina').scale.setTo(0.2,0.2);
          ball.rotation +=320;
          ball2.rotation +=220;
          ball3.rotation +=220;
          break;
        case "lewy":
          game.add.sprite(game.world.centerX+330, 80,'poland').scale.setTo(0.13,0.13);
          keaper.scale.setTo(0.4,0.4);
          keaper.body.y = 100;
          break;
        case "ronaldo":
        game.add.sprite(game.world.centerX+330, 80,'portugal').scale.setTo(0.13,0.13);
        default:
      };
      if ((counter == 3)&&(score>scoreAway)) {
        game.add.button(game.world.centerX-100,game.world.centerY,"next",nextLevel)
        game.add.button(game.world.centerX-120,game.world.centerY+100,"koniec",endGame)
        counter = 0 ;
        scoreAway = 0;
        score = 0 ;
      }else if ((counter ==3)&&(score<scoreAway)) {
        game.add.button(game.world.centerX-100,game.world.centerY,"prev",actionOnClick)
        game.add.button(game.world.centerX-120,game.world.centerY+100,"koniec",endGame)
        score = 0 ;
        scoreAway = 0;
        counter = 0 ;
      };
    // ustawienie zasiegu dokad ma ruszac sie kepaer , niestety nie da sie wyciagnac tego w fukncje bo nie widzi poczatakuwego body.x
    return score;
    }//koniec update
  };//koniec first level prototype

//tworzenie stanu pomoc w glownym nmenu
firstLevel.Help = function (game) {
  var text;
};

firstLevel.Help.prototype = {
   create: function() {
     music.destroy();
     var style = { font: "20px Courier", fill: "#fff", tabs: [ 244, 320, 320 ] };
     var headings = [ 'Name', 'characters', 'Notes' ];
     text = game.add.text(42, 74, '', style);
     text.parseList(headings);
     var action = [
        [ 'LEFT ', "<=",  'Move the ball to the left' ],
        [ 'RIGHT', '=>',  'Move the ball to the right' ],
        [ 'SPACEBAR','|_____|',  'Set the power of the shot' ],
    ];
    var text2 = game.add.text(32, 120, '', style);
    text2.parseList(action);
    game.add.button(game.world.centerX,550,"startBtn",playGame);
   },
   Help: function(){
       this.state.start('Help');
 },
   update: function(){
   }// koniec update
};// koniec help prototype

firstLevel.SeccondRound = function (game) {
};
firstLevel.SeccondRound.prototype = {
   create: function() {
     music.destroy();
     var counter_Power=0;
     var counter_x =0;
     var counter = 0;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.add.sprite(0,0,"sky").scale.setTo(2,0.2);
    this.add.sprite(0,0,"fans").scale.setTo(1,0.45);
    this.add.sprite(615,0,"fans").scale.setTo(1,0.45);
    this.add.sprite(0,190,"weed");
    band = game.add.sprite(-5,82,"bandy").scale.setTo(1,0.8);
    band2 = game.add.sprite(705,85,"bandy2").scale.setTo(1,1);
    arrow = create_arrow(game.world.centerX, 650, "arrow");
    gate = create_gate(game.world.centerX-250,0,"gate");
    box = create_box(game.world.centerX-230,game.world.centerY-120,"box")//s.scale.setTo(0.07,0.05); //140x 100// liczone od lewej
    box2 = create_box(game.world.centerX-50,game.world.centerY-330,"box")//s.scale.setTo(0.07,0.05); //140x 10
    box3 = create_box(game.world.centerX+90,game.world.centerY-220,"box")//s.scale.setTo(0.07,0.05); //140x 100
    star =  create_star(game.world.centerX- game.rnd.integerInRange(-120, 300), game.world.centerY-game.rnd.integerInRange(-100, -10),"star");
    star2 = create_star(game.world.centerX- game.rnd.integerInRange(-80, 320), game.world.centerY-game.rnd.integerInRange(-50, 50),"star");
    keaper = create_keaper(game.world.centerX,70,"foster");
    keaper.body.velocity.x += 450;
    tablica = game.add.sprite(-100, -50, "tablica");
    ball = create_ball(game.world.centerX-20,600,"ball");
    ball2 = create_ball(game.world.centerX-20,600,"ball");
    ball3 = create_ball(game.world.centerX-20,600,"ball");
    ball_velocity = 1200;
    ball_launched = false;
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    scoreText = game.add.text(45, 106, score, { fontSize: '50px', fill: '#FFF' });
    scoreAwayText = game.add.text(180, 106, scoreAway, { fontSize: '50px', fill: '#FFF' });
   },
   SeccondRound: function(){
       this.state.start('drugaRunda');
    },
    update: function(){
      var counter_round = 2 ;
      runda = game.add.text(game.world.centerX+400,10, "Runda"+counter_round,{fill: "#fff"});
      runda.font = 'Arial';
      runda.fontSize = 42;
      var opponent = game.add.text(game.world.centerX+400,80,"vs",{fill:"#fff"});
      var brazil  = game.add.sprite(game.world.centerX+ 450, 80,"brazil").scale.setTo(0.15,0.15)

      game.physics.arcade.collide(ball, keaper, collisionHandler, null, this);
      game.physics.arcade.collide(ball2, keaper, collisionHandler, null, this);
      game.physics.arcade.collide(ball3, keaper, collisionHandler, null, this);
    function collisionHandler (ball, keaper) {
        ball.kill();
        counter ++;
        noGoal();
      };
    function collisionHandler (ball2, keaper) {
        ball2.kill();
        noGoal();
        counter ++;
      };
    function collisionHandler (ball3, keaper) {
        ball3.kill();
        noGoal();
        counter ++;
      };
      // dodanie 3 funkcji do wylapania momenutu gdy pilka 1,2 lub 3 odbija sie od bramkarza (var keaper)
      game.physics.arcade.collide(ball, gate, collisionHandlerGoal, null, this);
      game.physics.arcade.collide(ball2, gate, collisionHandlerGoal, null, this);
      game.physics.arcade.collide(ball3, gate, collisionHandlerGoal, null, this);
      function collisionHandlerGoal (ball, gate) {
          if (counter_x >= 3 ) {
            ball.body.velocity.setTo(30,-1000);
            goal();
            ball.kill();
            counter ++;
            counter_x = 0;
            counter_Power = 0;
          }else if(counter_x <3 ){
            goal();
            ball.kill();
            counter ++;
            counter_Power  = 0;
            counter_x = 0;
          }
      };
      // dodanie 3 funckji do wylapania momentu gdy pilka uderza w CIALO (!!! nie w sama bramke !!!) bramki
      game.physics.arcade.collide(ball, box, collisionHandlerBox, null, this);
      game.physics.arcade.collide(ball2, box, collisionHandlerBox, null, this);
      game.physics.arcade.collide(ball3, box, collisionHandlerBox, null, this);
      game.physics.arcade.collide(ball, box2, collisionHandlerBox2, null, this);
      game.physics.arcade.collide(ball2, box2, collisionHandlerBox2, null, this);
      game.physics.arcade.collide(ball3, box2, collisionHandlerBox2, null, this);
      game.physics.arcade.collide(ball, box3, collisionHandlerBox3, null, this);
      game.physics.arcade.collide(ball2, box3, collisionHandlerBox3, null, this);
      game.physics.arcade.collide(ball3, box3, collisionHandlerBox3, null, this);
        function collisionHandlerBox (ball, box){
          noGoal();
          counter ++;
          counter_Power  = 0;
          counter_x = 0;
           ball.kill();
        };
        function collisionHandlerBox2 (ball, box2){
          noGoal();
          counter ++;
          counter_Power  = 0;
          counter_x = 0;
          ball.kill();
        };
        function collisionHandlerBox3 (ball, box3){
          noGoal();
          counter ++;
          counter_Power  = 0;
          counter_x = 0;
           ball.kill();
        };
        game.physics.arcade.collide(ball, band, collisionHandlerBand, null, this);
        game.physics.arcade.collide(ball2, band, collisionHandlerBand, null, this);
        game.physics.arcade.collide(ball3, band, collisionHandlerBand, null, this);
        game.physics.arcade.collide(ball, band2, collisionHandlerBand, null, this);
        game.physics.arcade.collide(ball2, band2, collisionHandlerBand, null, this);
        game.physics.arcade.collide(ball3, band2, collisionHandlerBand, null, this);
        function collisionHandlerBand (ball, band){
          noGoal();
          counter ++;
          counter_Power  = 0;
          counter_x = 0;
           ball.kill();
        };
        function collisionHandlerBand (ball, band2){
          noGoal();
          counter ++;
          counter_Power  = 0;
          counter_x = 0;
           ball.kill();
        };
        game.physics.arcade.collide(ball, star, collisionHandlerStar, null, this);
        game.physics.arcade.collide(ball2, star, collisionHandlerStar, null, this);
        game.physics.arcade.collide(ball3, star, collisionHandlerStar, null, this);
        game.physics.arcade.collide(ball, star2, collisionHandlerStar2, null, this);
        game.physics.arcade.collide(ball2, star2, collisionHandlerStar2, null, this);
        game.physics.arcade.collide(ball3, star2, collisionHandlerStar2, null, this);
          function collisionHandlerStar (ball, box){
            star.kill();
          };
          function collisionHandlerStar2 (ball, box){
            star2.kill();
          };
       keaper.body.velocity.y = 0 ;
       keaper.body.maxVelocity.x = 550 ;
       controlGame();
      // dwie metody do ruszania bramkarza
       if (keaper.body.x > 720) {
         keaper.body.velocity.x -=520;
       }  else if (keaper.x < 340) {
        keaper.body.velocity.x +=520;
      };
      switch (przyklad) {
        case "messi":
          game.add.sprite(game.world.centerX+330, 80,'argentina').scale.setTo(0.2,0.2);
          ball.rotation +=320;
          ball2.rotation +=220;
          ball3.rotation +=220;
        break;
        case "lewy":
        game.add.sprite(game.world.centerX+330, 80,'poland').scale.setTo(0.13,0.13);
        keaper.scale.setTo(0.4,0.4);
        keaper.body.y = 100;
          break;
         case "ronaldo":
        game.add.sprite(game.world.centerX+330, 80,'portugal').scale.setTo(0.13,0.13);
           break;
        default:
      };
      if ((counter == 3)&&(score>scoreAway)) {
        game.add.button(game.world.centerX-100,game.world.centerY,"next",lastLevel);
          game.add.button(game.world.centerX-120,game.world.centerY+100,"koniec",endGame);
        counter = 0 ;
        scoreAway = 0;
        score = 0 ;
      }else if ((counter ==3)&&(score<scoreAway)) {
        game.add.button(game.world.centerX-100,game.world.centerY,"prev",actionOnClick);
        game.add.button(game.world.centerX-120,game.world.centerY+100,"koniec",endGame);
        score = 0 ;
        scoreAway = 0;
        counter = 0 ;
      };
    //  return score;
    }// koniec update
}// koneic seccod round prototpy
  firstLevel.ThridRound = function(game){
}
  firstLevel.ThridRound.prototype = {
    create: function() {
       music.destroy();
         var counter_Power=0;
         var counter_x =0;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.add.sprite(0,0,"sky").scale.setTo(2,0.2);
        this.add.sprite(0,0,"fans").scale.setTo(1,0.45);
        this.add.sprite(615,0,"fans").scale.setTo(1,0.45);
        this.add.sprite(0,190,"weed");
        band = game.add.sprite(-5,82,"bandy").scale.setTo(1,0.8);
        band2 = game.add.sprite(705,85,"bandy2").scale.setTo(1,1);
        arrow = create_arrow(game.world.centerX, 650, "arrow");
        gate = create_gate(game.world.centerX-250,0,"gate");
        box = create_box(game.world.centerX-230,game.world.centerY-120,"box");//s.scale.setTo(0.07,0.05); //140x 100
        box2 = create_box(game.world.centerX-50,game.world.centerY-330,"box");//s.scale.setTo(0.07,0.05); //140x 100
        box3 = create_box(game.world.centerX+50,game.world.centerY-220,"box");//s.scale.setTo(0.07,0.05); //140x 100
        star =  create_star(game.world.centerX- game.rnd.integerInRange(-120, 300), game.world.centerY-game.rnd.integerInRange(-100, -10),"star");
        star2 =create_star(game.world.centerX- game.rnd.integerInRange(-80, 320), game.world.centerY-game.rnd.integerInRange(-50, 50),"star");
        keaper = create_keaper(game.world.centerX,70,"foster");
        keaper.body.velocity.x += 500;
        tablica = game.add.sprite(-100, -50, "tablica");
        box3.body.velocity.x += 150;
        ball = create_ball(game.world.centerX-20,600,"ball");
        ball2 = create_ball(game.world.centerX-20,600,"ball");
        ball3 = create_ball(game.world.centerX-20,600,"ball");
        ball_velocity = 1300;
        ball_launched = false;
        cursors = game.input.keyboard.createCursorKeys();
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        scoreText = game.add.text(45, 106, score-score, { fontSize: '50px', fill: '#FFF' });
        scoreAwayText = game.add.text(180, 106, scoreAway-scoreAway, { fontSize: '50px', fill: '#FFF' });
  },
  ThridRound: function(){
    this.state.start('trzeciaRunda');
  },
  update: function(){
    var counter_round = 3 ;
    runda = game.add.text(game.world.centerX+400,10, "Runda"+counter_round,{fill: "#fff"});
    runda.font = 'Arial';
    runda.fontSize = 42;
    var opponent = game.add.text(game.world.centerX+400,80,"vs",{fill:"#fff"});
    var germany  = game.add.sprite(game.world.centerX+ 450, 80,"germany").scale.setTo(0.1,0.1)
    game.physics.arcade.collide(ball, keaper, collisionHandler, null, this);
    game.physics.arcade.collide(ball2, keaper, collisionHandler, null, this);
    game.physics.arcade.collide(ball3, keaper, collisionHandler, null, this);

  function collisionHandler (ball, keaper) {
      ball.kill();
      counter ++;
      noGoal();
    };
  function collisionHandler (ball2, keaper) {
      ball2.kill();
      noGoal();
      counter ++;
    };
  function collisionHandler (ball3, keaper) {
      ball3.kill();
      noGoal();
      counter ++;
    };
    // dodanie 3 funkcji do wylapania momenutu gdy pilka 1,2 lub 3 odbija sie od bramkarza (var keaper)
    game.physics.arcade.collide(ball, gate, collisionHandlerGoal, null, this);
    game.physics.arcade.collide(ball2, gate, collisionHandlerGoal, null, this);
    game.physics.arcade.collide(ball3, gate, collisionHandlerGoal, null, this);
    function collisionHandlerGoal (ball, gate) {
        if (counter_x >= 3 ) {
          ball.body.velocity.setTo(30,-1000);
          goal();
          ball.kill();
          counter ++;
          counter_x = 0;
          counter_Power = 0;
        }else if(counter_x <3 ){
          goal();
          ball.kill();
          counter ++;
          counter_Power  = 0;
          counter_x = 0;
        }
    };
    // dodanie 3 funckji do wylapania momentu gdy pilka uderza w CIALO (!!! nie w sama bramke !!!) bramki
    game.physics.arcade.collide(ball, box, collisionHandlerBox, null, this);
    game.physics.arcade.collide(ball2, box, collisionHandlerBox, null, this);
    game.physics.arcade.collide(ball3, box, collisionHandlerBox, null, this);
    game.physics.arcade.collide(ball, box2, collisionHandlerBox2, null, this);
    game.physics.arcade.collide(ball2, box2, collisionHandlerBox2, null, this);
    game.physics.arcade.collide(ball3, box2, collisionHandlerBox2, null, this);
    game.physics.arcade.collide(ball, box3, collisionHandlerBox2, null, this);
    game.physics.arcade.collide(ball2, box3, collisionHandlerBox2, null, this);
    game.physics.arcade.collide(ball3, box3, collisionHandlerBox2, null, this);
      function collisionHandlerBox (ball, box){
        noGoal();
        counter ++;
        counter_Power  = 0;
        counter_x = 0;
         ball.kill();
      };
      function collisionHandlerBox2 (ball, box2){
        noGoal();
        counter ++;
        counter_Power  = 0;
        counter_x = 0;
        ball.kill();
      };
      function collisionHandlerBox3 (ball, box3){
        noGoal();
        counter ++;
        counter_Power  = 0;
        counter_x = 0;
         ball.kill();
      };
      game.physics.arcade.collide(ball, band, collisionHandlerBand, null, this);
      game.physics.arcade.collide(ball2, band, collisionHandlerBand, null, this);
      game.physics.arcade.collide(ball3, band, collisionHandlerBand, null, this);
      game.physics.arcade.collide(ball, band2, collisionHandlerBand, null, this);
      game.physics.arcade.collide(ball2, band2, collisionHandlerBand, null, this);
      game.physics.arcade.collide(ball3, band2, collisionHandlerBand, null, this);
      function collisionHandlerBand (ball, band){
        noGoal();
        counter ++;
        counter_Power  = 0;
        counter_x = 0;
        ball.kill();
      };
      function collisionHandlerBand (ball, band2){
        noGoal();
        counter ++;
        counter_Power  = 0;
        counter_x = 0;
        ball.kill();
      };
        game.physics.arcade.collide(ball, star, collisionHandlerStar, null, this);
        game.physics.arcade.collide(ball2, star, collisionHandlerStar, null, this);
        game.physics.arcade.collide(ball3, star, collisionHandlerStar, null, this);
        game.physics.arcade.collide(ball, star2, collisionHandlerStar2, null, this);
        game.physics.arcade.collide(ball2, star2, collisionHandlerStar2, null, this);
        game.physics.arcade.collide(ball3, star2, collisionHandlerStar2, null, this);
        function collisionHandlerStar (ball, star){
          star.kill();
        };
        function collisionHandlerStar2 (ball, star2){
          star2.kill();
        };
     keaper.body.velocity.y = 0 ;
     keaper.body.maxVelocity.x = 600 ;
     box3.body.velocity.y = 0 ;
     box3.body.maxVelocity.x = 250 ;
     controlGame();
    // dwie metody do ruszania bramkarza
     if (keaper.body.x > 720) {
       keaper.body.velocity.x -=550;
     }
    else if (keaper.x < 340) {
      keaper.body.velocity.x +=550;
    };
     if (box3.body.x > 720) {
      box3.body.velocity.x -=150;
     }
    else if (box3.x < 340) {
      box3.body.velocity.x +=150;
    };
    switch (przyklad) {
      case "messi":
        game.add.sprite(game.world.centerX+330, 80,'argentina').scale.setTo(0.2,0.2);
        ball.rotation +=320;
        ball2.rotation +=220;
        ball3.rotation +=220;
      break;
      case "lewy":
      game.add.sprite(game.world.centerX+330, 80,'poland').scale.setTo(0.13,0.13);
      keaper.scale.setTo(0.4,0.4);
      keaper.body.y = 100;
        break;
       case "ronaldo":
      game.add.sprite(game.world.centerX+330, 80,'portugal').scale.setTo(0.13,0.13);
         break;
      default:
    };
    if ((counter == 3)&&(score>scoreAway)) {
      game.add.button(game.world.centerX,game.world.centerY,"koniec",finishLevelWin);
      counter = 0 ;
      scoreAway = 0;
      score = 0 ;
    }else if ((counter ==3)&&(score<scoreAway)) {
      game.add.button(game.world.centerX,game.world.centerY,"koniec",finishLevelLose);
      score = 0 ;
      scoreAway = 0;
      counter = 0 ;
    };
    // ustawienie zasiegu dokad ma ruszac sie kepaer , niestety nie da sie wyciagnac tego w fukncje bo nie widzi poczatakuwego body.x
    }// koniec update
}// koniec prototype 3 runda
firstLevel.ChoosePlayer = function(game){
}
firstLevel.ChoosePlayer.prototype = {
  create: function() {
    music.destroy();
    game.add.sprite(0,0,"stadion").scale.setTo(1.4,1.8);
    var player1 = game.add.button(150,550,"lewandowskiBtn",player1);
    var player2 = game.add.button(450,550,"ronaldoBtn",player2);
    var player3 = game.add.button(750,550,"messiBtn",player3);

    function player1 (){
      game.add.sprite(0,0,"stadion").scale.setTo(1.4,1.8);
      game.add.sprite(game.world.centerX-150,100,"lewy").scale.setTo(0.5,0.5);
      przyklad = 'lewy';
      game.add.button(game.world.centerX+150,600,"startBtn",actionOnClick);
      return przyklad;
    };
    function player2 (){
        game.add.sprite(0,0,"stadion").scale.setTo(1.4,1.8);
        game.add.sprite(game.world.centerX-150,100,"ronaldo").scale.setTo(0.8,0.8);
      przyklad = 'ronaldo';
      game.add.button(game.world.centerX+150,600,"startBtn",actionOnClick);

      return przyklad;
    };
    function player3(){
      game.add.sprite(0,0,"stadion").scale.setTo(1.4,1.8);
      game.add.sprite(game.world.centerX-150,100,"messi").scale.setTo(0.5,0.5);
      game.add.button(game.world.centerX+150,600,"startBtn",actionOnClick);
      przyklad = 'messi';
      return przyklad;
    };
  },
  choosePlayer: function(){},
  update: function(){
  }// KONIEC UPDATE choosePlayer
};// KONIEC PROTOTYPE CHHOOSEPLASYER
firstLevel.finishLevelWin = function(game){
  var cup;
};
firstLevel.finishLevelWin.prototype = {
  create: function(){
    celebrationFoto = game.add.sprite(10,10,"celeba");
    celebrationFoto.scale.setTo(2,1.7);
    console.log(celebrationFoto)
    winner = game.add.sprite(game.world.centerX-250,game.world.centerY-300,"winner");
    winner.scale.setTo(0.8,0.9)
    game.add.button(600,550,"prev",playGame);
    //finishText.fontSize = 62;
    cup =  game.add.sprite(game.world.centerX-100,game.world.centerY-100,"cup");
    game.physics.enable(cup, Phaser.Physics.ARCADE);
    cup.body.velocity.y=+50;
    game.add.button(300,550,"koniec",endGame)

  },
  finishLevelWin: function(){
    this.state.start("finishLevelWin");
  },
  update: function(){
     cup.body.maxVelocity.y = 200 ;
    if (cup.body.y < 220) {
      cup.body.velocity.y +=50;
    }
  else if (cup.body.y > 280) {
     cup.body.velocity.y -=50;
   };
  }// koniec update levelfinishWin
};// koniec prototype levelfinishWin
firstLevel.finishLevelLose = function(game){
};
firstLevel.finishLevelLose.prototype = {
  create:function(){
    cryFoto = game.add.sprite(game.world.centerX-300,game.world.centerY-200,"looserFoto");
    cryFoto.scale.setTo(0.5,0.5);
    looserText = game.add.image(game.world.centerX-150,game.world.centerY+200,"looser");
    looserText.scale.setTo(3,2)
    game.add.button(game.world.centerX-50,game.world.centerY+300,"prev",actionOnClick)
    game.add.button(300,550,"koniec",endGame)
  },
  finishLevelLose: function(){
    this.state.start("finishLevelLose");
  },
  update:function(){}
}
  game.state.add("start",firstLevel.First);
  game.state.add("help",firstLevel.Help);
  game.state.add("drugaRunda",firstLevel.SeccondRound);
  game.state.add("trzeciaRunda", firstLevel.ThridRound);
  game.state.add("choosePlayer", firstLevel.ChoosePlayer);
  game.state.add("finishLevelWin", firstLevel.finishLevelWin);
  game.state.add("finishLevelLose", firstLevel.finishLevelLose);
//dodanie stanu gry
  function playGame() {
      game.state.start("choosePlayer");
  };
  function actionOnClick () {
      game.state.start("start");
  };
  function helpPanel () {
      game.state.start("help");
  };
  function nextLevel () {
       game.state.start("drugaRunda");
  };
  function lastLevel(){
    game.state.start("trzeciaRunda");
  };
  function player(){
    game.state.start("choosePlayer");
  };
  function finishLevelWin(){
    game.state.start("finishLevelWin");
  };
  function finishLevelLose(){
    game.state.start("finishLevelLose");
  };
  //funkcje do uruchamiania stanu gry

  function create_ball(x,y){
    var ball = game.add.sprite(x,y,'ball');
    ball.anchor.setTo(0,0);
    game.physics.arcade.enable(ball);
    ball.scale.setTo(0.06,0.06)
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(0.3,0.3);
    return ball;
  };
  //funckaj ktora tworzy nam pilke
  //doadnie obrazka wlaczenie ciala odbijania sie itd
  //zwraca pilke :)
  function create_band(x,y){
    var band = game.add.sprite(x,y, "bandy");
    game.physics.arcade.enable(band);
    band.enableBody = true;
    band.body.immovable = true;
    band.body.setSize(450,1,0,0);
    return band;
  }
  function create_box(x,y){
    var box = game.add.sprite(x,y,"box")
    game.physics.arcade.enable(box);
    box.enableBody = true;
    box.body.immovable = true;
    box.scale.setTo(0.07,0.05);
    return box;
  };
  function create_star(x,y){
    var star = game.add.sprite(x,y,"star")
    star.scale.setTo(0.1,0.1);
    game.physics.arcade.enable(star);
    return star;
  };
  function create_gate(x,y) {
    var gate = game.add.sprite(x,y,"gate");
    game.physics.arcade.enable(gate);
    gate.enableBody = true;
    gate.body.setSize(500, 110,0,60);//60
    gate.body.immovable = true;
    return gate;
  };
  function create_arrow(x,y){
    var arrow = game.add.sprite(x, y, "arrow");
    arrow.anchor.set(0.5);
    game.physics.arcade.enable(arrow);
    arrow.body.drag.set(70);
    arrow.body.maxVelocity.set(200);
    return arrow;
    };
  function create_keaper(x,y){
    var keaper = game.add.sprite(x,y,"foster");
    keaper.enableBody = true;
    game.physics.arcade.enable(keaper);
    keaper.scale.setTo(0.4,0.5);
    keaper.body.collideWorldBounds = true;
    keaper.body.immovable = true;
    return keaper;
  };

  function launch_ball() {
    if (ball_launched) {
      if (counter<1){
        ball.body.velocity.setTo(30,-530);
        game.add.tween(ball).to( { angle: 175 }, 2000, Phaser.Easing.Linear.None, true);
        ball_launched = false;
      }else if (counter < 2 ){
        ball2.body.velocity.setTo(30,-530);
        game.add.tween(ball2).to( { angle: 175 }, 2000, Phaser.Easing.Linear.None, true);
        ball_launched = false;
      }else if (counter <3) {
        ball3.body.velocity.setTo(30,-530);
        ball_launched = false;
        game.add.tween(ball2).to( { angle: 175 }, 2000, Phaser.Easing.Linear.None, true);
      }
      ball_launched = false;
    }else{
      ball_launched = true;
    };
  };
  //funkcja launch_ball sluzy do zaladowania nowej pilki zczytuje poprzez counter czy poprzednia pilka jeszcze istnieje
  function controlGame(){
  if (cursors.left.isDown){
    arrow.body.angularVelocity = -60;
    ball.body.x -= 2;
    ball2.body.x-=2;
    ball3.body.x-=2
  }
  else if (cursors.right.isDown){
    arrow.body.angularVelocity = 60;
    ball.body.x += 2;
    ball2.body.x += 2;
    ball3.body.x += 2;
  }else{
    arrow.body.angularVelocity = 0;
    arrow.body.acceleration.set(0);
  };
  // zczytywanie ruchu
  //else zerowanie ruchu gdy brak nacisnietej klawisza
  if (fireButton.isDown){
     launch_ball();
     counter_Power ++;
     counter_x = counter_Power/5;
     counter_x = Math.floor(counter_x);
     var  power = game.add.sprite(450,game.world.centerY+200,"power");
     game.time.events.add(Phaser.Timer.SECOND , fadeText, this);
    function fadeText() {
      game.add.tween(power).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
   };
  if (counter_x >= 3) {
    fadeText();
  }else if (counter_x <=2) {
    power.visible = false;
  };
     if ((ball.exists == false)&&(ball2.exists == false)&&((counter_x >= 3))) {
        ball3.body.velocity.setTo(30,-1000);
        gate.body.setSize(500, 30,0,10);
        box.body.setSize(0.01,0.01,-200,-200);
        box3.body.setSize(0.01,0.01,-200,-200);
      }else if((ball.exists == false)&&(counter_x >= 3)){
        ball2.body.velocity.setTo(30,-1000);
        gate.body.setSize(500, 30,0,10);
        box.body.setSize(0.01,0.01,-200,-200);
        box3.body.setSize(0.01,0.01,-200,-200);
      }else if (counter_x >=3){
        ball.body.velocity.setTo(30,-1000);
        gate.body.setSize(500, 30,0,10)
        box.body.setSize(0.01,0.01,-200,-200);
        box3.body.setSize(0.01,0.01,-200,-200);
     }else{
       gate.body.setSize(500,110,0,60)
       box.body.setSize(2000,2000,0,0);
       box3.body.setSize(2000,2000,0,0);
       //power.destroy();
     };
  };

  };

  function goal(){
  text = game.add.text(game.world.centerX-200, game.world.centerY-100, "GOAL !!!");
  text.align = 'center';
   text.font = 'Arial';
   text.fontWeight = 'bold';
   text.fontSize = 140;
   var grd = text.context.createLinearGradient(0, 0, 0, text.height);
   grd.addColorStop(0, '#8ED6FF');
   grd.addColorStop(1, '#004CB3');
   text.fill = grd;
   game.load.audio("fans", ['assets/fans.ogg']);
   var fansGoal = game.add.audio("fansGoal");
   fansGoal.play();
   score += 1;
   scoreText.text =+ score;
   game.time.events.add(Phaser.Timer.SECOND , fadeText, this);
   function fadeText() {
    game.add.tween(text).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    };
  counter_x = 0 ;
  counter_Power = 0 ;
  };

  function noGoal(){
  text2 = game.add.text(game.world.centerX-250, game.world.centerY-100, "PUDŁO !");
  text2.align = 'center';
  text2.font = 'Arial';
  text2.fontWeight = 'bold';
  text2.fontSize = 140;
   var grd2 = text2.context.createLinearGradient(0, 0, 0, text2.height);
   grd2.addColorStop(0, '#8ED6FF');
   grd2.addColorStop(1, '#004CB3');
   text2.fill = grd2;
   game.time.events.add(Phaser.Timer.SECOND , fadeText2, this);
   function fadeText2() {
    game.add.tween(text2).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    };
    counter_x = 0 ;
    counter_Power = 0 ;
    scoreAway += 1;
    scoreAwayText.text =+ scoreAway;

  };
  function endGame(){
    window.location.href = "http://www.google.com";
  };
  //funkcja w menu na klikniecie start
