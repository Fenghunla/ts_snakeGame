class Snake {
    head: HTMLElement;
    bodies: HTMLCollection;
    snake: HTMLElement;


    constructor() {
        this.snake = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = this.snake.getElementsByTagName('div');
    }

    get X() {
        return this.head.offsetLeft
    }
    get Y() {
        return this.head.offsetTop
    }

    set X(value) {
        if (this.X == value) {
            return;
        }

        if (value < 0 || value > 290) {
            throw new Error('蛇撞墙了')
        }

        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            if (value > this.X) {
                value = this.X - 10
            } else {
                value = this.X + 10
            }
        }

        this.moveBody()
        this.head.style.left = value + 'px'
        this.checkHeadBody()
    }
    set Y(value) {
        if (this.Y == value) {
            return;
        }

        if (value < 0 || value > 290) {
            throw new Error('蛇撞墙了')
        }

        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if (value > this.Y) {
                value = this.Y - 10
            } else {
                value = this.Y + 10
            }
        }

        this.moveBody()
        this.head.style.top = value + 'px'
        this.checkHeadBody()
    }

    addBody() {
        this.snake.insertAdjacentHTML("beforeend", "<div></div>")
    }

    moveBody() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }
    checkHeadBody() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let X = (this.bodies[i] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i] as HTMLElement).offsetTop;
            if (this.X === X && this.Y === Y) {
                throw new Error('撞到身体了！')
            }
        }
    }

}

export default Snake
// const snake = new Snake()
// snake.X = 60
// snake.Y = 60
