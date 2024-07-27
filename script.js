document.addEventListener('DOMContentLoaded', () => {
    console.log('Page is fully loaded');

    const canvas = document.getElementById('pong');
    const context = canvas.getContext('2d');

    // Ball
    const ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 4,
        speed: .2,
        dx: 1,
        dy: 1
    };

    // Paddle objects
    const leftPaddle = {
        width: 5,
        height: 35,
        x: 10, // left-side paddle
        y: canvas.height / 2 - 30,
        speed: 1,
        dy: 0,
        direction: 1 // 1 for down, -1 for up
    };

    const rightPaddle = {
        width: 5,
        height: 35,
        x: canvas.width - 20, // right-side paddle
        y: canvas.height / 2 - 30,
        speed: 1,
        dy: 0,
        direction: 1 // 1 for down, -1 for up
    };

    // Score variables
    let leftScore = 0;
    let rightScore = 0;

    // Draw ball
    function drawBall() {
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        context.fillStyle = '#fff';
        context.fill();
        context.closePath();
    }

    // Draw paddles
    function drawPaddles() {
        context.fillStyle = '#fff';
        context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
        context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    }

    // Draw scores
    function drawScores() {
        context.font = '10px Arial';
        context.fillStyle = '#fff';
        context.textAlign = 'center';
        context.textBaseline = 'top';
        context.fillText(`Player 1:  ${leftScore}`, canvas.width / 4, 10);
        context.fillText(`Player 2:  ${rightScore}`, (3 * canvas.width) / 4, 10);
    }

    // Move ball
    function moveBall() {
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Wall collision (top/bottom)
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
            ball.dy *= -1;
        }

        // Paddle collision
        if ((ball.x - ball.radius < leftPaddle.x + leftPaddle.width && 
             ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height) ||
            (ball.x + ball.radius > rightPaddle.x && 
             ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height)) {
            ball.dx *= -1;
        }

        // Ball out of bounds (left side)
        if (ball.x - ball.radius < 0) {
            rightScore++; // Right player scores
            resetBall();
        }

        // Ball out of bounds (right side)
        if (ball.x + ball.radius > canvas.width) {
            leftScore++; // Left player scores
            resetBall();
        }
    }

    // Reset ball position
    function resetBall() {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = -ball.dx; // Change direction
    }

    // Move paddles
    function movePaddles() {
        // Update left paddle position
        if (leftPaddle.direction === 1) {
            leftPaddle.y += leftPaddle.speed;
            if (leftPaddle.y + leftPaddle.height >= canvas.height) {
                leftPaddle.direction = -1; // Change direction to up
            }
        } else if (leftPaddle.direction === -1) {
            leftPaddle.y -= leftPaddle.speed;
            if (leftPaddle.y <= 0) {
                leftPaddle.direction = 1; // Change direction to down
            }
        }

        // Update right paddle position
        if (rightPaddle.direction === 1) {
            rightPaddle.y += rightPaddle.speed;
            if (rightPaddle.y + rightPaddle.height >= canvas.height) {
                rightPaddle.direction = -1; // Change direction to up
            }
        } else if (rightPaddle.direction === -1) {
            rightPaddle.y -= rightPaddle.speed;
            if (rightPaddle.y <= 0) {
                rightPaddle.direction = 1; // Change direction to down
            }
        }
    }

    // Update canvas
    function update() {
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        drawScores();
        drawBall();
        drawPaddles();
        moveBall();
        movePaddles();

        requestAnimationFrame(update);
    }

    // Start game
    update();
});
