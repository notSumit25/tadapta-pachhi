import { Bird } from "./Bird";
import { Obstacle } from "./Obstacles";

export class GameManager{
    bird: Bird;
    context: CanvasRenderingContext2D;
    canvasHeight: number;
    canvasWidth: number;
    backgroundImage: HTMLImageElement;
    birdImage: HTMLImageElement;
    upperPipeImage: HTMLImageElement;
    lowerPipeImage: HTMLImageElement;
    obstacles: Array<Obstacle>;
    score: number;
    obstacleSpeed: number;
    obstacleInterval: number;
    gameOver: boolean;
    lastObstacleTime: number;



    constructor(context: CanvasRenderingContext2D, canvasHeight: number, canvasWidth: number){
        this.bird = new Bird(100, 100);
        this.obstacles = [];
        this.score = 0;
        this.obstacleSpeed = 2;
        this.obstacleInterval = 2000;
        this.gameOver = false;
        this.lastObstacleTime = Date.now();
        this.backgroundImage = new Image();
        this.backgroundImage.src = "/images/background.png";
        this.birdImage = new Image();
        this.birdImage.src = "/images/bird.png";
        this.upperPipeImage = new Image();
        this.upperPipeImage.src = "/images/upper.png";
        this.lowerPipeImage = new Image();
        this.lowerPipeImage.src = "/images/lower.png";
        this.context = context;
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.context.canvas.addEventListener("click", () => {
            console.log('Clicked');
            this.flap();
        });
    }
    
    update(){
        this.bird.update();
        this.bird.checkBoundaries();
    }
    
    draw(ctx: CanvasRenderingContext2D, image: HTMLImageElement){
        this.bird.draw(ctx, image);
    }
    
    flap(){
        this.bird.flap();
    }

    drawBackground(){
        this.context.drawImage(this.backgroundImage, 0, 0, this.canvasWidth, this.canvasHeight);
    }

    updateObstacles() {
        const now = Date.now();
        if (now - this.lastObstacleTime > this.obstacleInterval) {
            this.addObstacle();
            this.lastObstacleTime = now;
        }
        this.obstacles.forEach(obstacle => {
            obstacle.move(this.obstacleSpeed);
        });
        this.obstacles = this.obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
        
    }
    
    addObstacle() {
        const gap = 250;
        const upperHeight = Math.random() * (this.canvasHeight / 2);
        const lowerHeight = this.canvasHeight - upperHeight - gap;

        const upperObstacle = new Obstacle(
            this.context.canvas.width,
            0,
            this.upperPipeImage.width,
            upperHeight,
            '/images/upper.png'
        );

        const lowerObstacle = new Obstacle(
            this.context.canvas.width,
            this.canvasHeight - lowerHeight,
            this.lowerPipeImage.width,
            lowerHeight,
            '/images/lower.png'
        );

        this.obstacles.push(upperObstacle, lowerObstacle);

    }
    drawObstacles() {
        this.obstacles.forEach(obstacle => obstacle.draw(this.context));
    }
    checkCollisions(){
        this.obstacles.forEach(obstacle => {
            if(this.bird.x + this.bird.radius > obstacle.x && this.bird.x - this.bird.radius < obstacle.x + obstacle.width){
                if(this.bird.y + this.bird.radius > obstacle.y && this.bird.y - this.bird.radius < obstacle.y + obstacle.height){
                    this.gameOver = true;
                }
            }
        });
    }

    checkScore(){
        this.obstacles.forEach(obstacle => {
            if(!obstacle.passed && obstacle.x + obstacle.width < this.bird.x){
                this.score++;
                obstacle.passed = true;
            }
        });
    }

    updateScore(){
        this.context.font = "30px Arial";
        this.context.fillText(this.score.toString(), this.canvasWidth / 2, 50);
    }

    updateGameOver(){
        this.context.font = "30px Arial";
        this.context.fillText("Game Over", this.canvasWidth / 2, this.canvasHeight / 2);
    }

    updateGame(){
        this.drawBackground();
        this.update();
        this.draw(this.context, this.birdImage);
        this.updateObstacles();
        this.drawObstacles();
        this.checkCollisions();
        this.checkScore();
        this.updateScore();
        
        if(this.gameOver){
            this.updateGameOver();
        }
        if(!this.gameOver){
            requestAnimationFrame(this.updateGame.bind(this));
        }
    }

    startGame(){
        this.updateGame();
    }

    resetGame(){
        this.bird = new Bird(100, 100);
        this.obstacles = [];
        this.score = 0;
        this.gameOver = false;
        this.lastObstacleTime = Date.now();
        // this.startGame();
    }


}