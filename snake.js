function init() {
    canvas = document.getElementById('mycanvas');
    canvas.width = 1000;
    canvas.height = 1000;
    score=0;
    W = 1000;
    gameover=false;
    pen = canvas.getContext('2d');

    cs = 66;
    img=new Image();
    img.src="Assets/apple.png";
   trophy=new Image();
   trophy.src="Assets/trophy.png";
 
    fruit={
        x:0,
        y:0,
        newCord:function()
        {
            this.x=Math.floor((Math.random()*(W-cs)/cs));
            this.y=Math.floor((Math.random()*(W-cs)/cs));

        },
        render:function()
        {
            //console.log("in");
            
                pen.drawImage(img,this.x*cs,this.y*cs,cs,cs);
        
          
              

        }
    }

    snake = {
        length: 3,
        color: 'red',
        body: [],
        direction: 'R',
        pd: 'R',

        start: function () {
            for (let i = this.length - 1; i >= 0; i--) {
                this.body.push({
                    x: i,
                    y: 0
                });
            }


        },
        draw: function () {
            for (let i = 0; i < this.body.length; i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.body[i].x * cs, this.body[i].y * cs, cs, cs);
            }
        },

        gameover: function (head) {
            if (head.x < 0 || head.y < -0 || head.x * cs > (W-20) || head.y * cs > (W)) {
              gameover=true;
            } else {
                this.body.forEach(function (value, idx) {
                    if (head.x === value.x && head.y === value.y) {
                        gameover=true;
                        return;

                    }

                });
            }
        },
        valid:function(x,y)
        {
            if(x<=2&&y<=2)
            return false;
           for(i=0;i<this.body.length;i++)
           {
               if(x===this.body[i].x&&y===this.body[i].y)
               return false;
           }
          
return true;


        },



        caneat:function(head)
        {
            //console.log(head,fruit);
           if(head.x===fruit.x&&head.y===fruit.y)
           {
               score++;
               fruit.newCord();
               while(this.valid(fruit.x,fruit.y)===false)
               fruit.newCord();
               return true;
           }
           return false;
        },
          
        update: function () {

            let head = {
                ...this.body[0]
            };
          
            if (this.direction === 'R') {

                head.x+=1;
                this.gameover(head);
                this.body.unshift({
                    x: head.x,
                    y: head.y
                });
                if(!this.caneat(head))
                {
                    this.body.pop();
                }
            

             

            } else if (this.direction === "L") {
                head.x-=1;
                this.gameover(head);
                this.body.unshift({
                    x: head.x,
                    y: head.y
                });
                if(!this.caneat(head))
                {
                    this.body.pop();
                }

            } else if (this.direction === "U") {
                head.y-=1;
                this.gameover(head);
                this.body.unshift({
                    x: head.x,
                    y: head.y
                });
                if(!this.caneat(head))
                {
                    this.body.pop();
                }

            } else if (this.direction === "D") {
                head.y+=1;
                this.gameover(head);
                this.body.unshift({
                    x: head.x,
                    y: head.y
                });
                if(!this.caneat(head))
                {
                    this.body.pop();
                }

            }
            

        }
    }
    snake.start();
    fruit.newCord();
    console.log(cs);
   
    document.addEventListener('keydown', function () {
       // console.log(snake.direction);
        snake.pd = snake.direction;
        if (event.key === "ArrowUp" && snake.direction != "D")
            snake.direction = "U";
        else if (event.key === "ArrowDown" && snake.direction != "U")
            snake.direction = "D";
        else if (event.key === "ArrowLeft" && snake.direction != "R")
            snake.direction = "L";
        else if (event.key === "ArrowRight" && snake.direction != "L")
            snake.direction = "R";
        //console.log(snake.pd);

    });
}
init();

function draw() {
    pen.clearRect(0, 0, W, W);
    pen.drawImage(trophy,20,15,cs+40,cs+40);
    pen.font="25px Arial";
    if(score*10<100)
    pen.fillText(score*10,60,60);
    else
    pen.fillText(score*10,50,60);
    fruit.render();
    snake.draw();
}

function update() {



    snake.update();
}

gameloop = function () {
    console.log(score);
    draw();
    if(gameover===true)
    {
        clearInterval(f);
        alert("Game Over");
        return;
    }
    update();
}
const f = setInterval(gameloop, 100);