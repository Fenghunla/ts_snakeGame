import Food from "./Food"
import GameMenu from "./GameMemu";
import Snake from "./Snake";

class GameControl {
    food: Food;
    gameMenu: GameMenu;
    snake: Snake;
    direction = '';
    isLive = true;


    constructor() {
        this.food = new Food();
        this.gameMenu = new GameMenu(10, 1);
        this.snake = new Snake();

        this.init()
    }

    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.run()
    }

    keydownHandler(e: KeyboardEvent) {
        e.preventDefault();
        this.direction = e.key
    }
    // ArrowLeft
    // ArrowDown
    // ArrowRight
    // ArrowUp
    run() {

        let X = this.snake.X;
        let Y = this.snake.Y;
        switch (this.direction) {
            case 'ArrowLeft':
            case 'Left':
                X = X - 10
                break;
            case 'ArrowRight':
            case 'Right':
                X = X + 10
                break;
            case 'ArrowUp':
            case 'Up':
                Y = Y - 10
                break;
            case 'ArrowDown':
            case 'Down':
                Y = Y + 10
                break;
        };

        this.checkEat();

        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (error: any) {
            alert(error.message + 'Game Over!')
            this.isLive = false
        }

        this.isLive && setTimeout(this.run.bind(this), 300 - (this.gameMenu.level - 1) * 30);
    }

    checkEat() {
        if (this.snake.X == this.food.X && this.snake.Y == this.food.Y) {
            this.food.change();
            this.gameMenu.addScore();
            this.snake.addBody()
        }
    }
}

export default GameControl