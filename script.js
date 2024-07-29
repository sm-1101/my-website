document.addEventListener('DOMContentLoaded', () => {
    console.log('Page is fully loaded');

    const canvas = document.getElementById('pong');
    const context = canvas.getContext('2d');

    // Ball
    const ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 4,
        speed: 1,
        dx: 1,
        dy: 1
    };

    // Paddles
    const leftPaddle = {
        width: 5,
        height: 30,
        x: 10,
        y: canvas.height / 2 - 30,
        speed: 1,
        dy: 0,
        direction: 1
    };

    const rightPaddle = {
        width: 5,
        height: 30,
        x: canvas.width - 20,
        y: canvas.height / 2 - 30,
        speed: 1,
        dy: 0,
        direction: 1
    };

    let leftScore = 0;
    let rightScore = 0;

    function drawBall() {
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        context.fillStyle = '#fff';
        context.fill();
        context.closePath();
    }

    function drawPaddles() {
        context.fillStyle = '#fff';
        context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
        context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    }

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
    
        // Paddle collision (left paddle)
        if (
            ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
            ball.x + ball.radius > leftPaddle.x &&
            ball.y + ball.radius > leftPaddle.y &&
            ball.y - ball.radius < leftPaddle.y + leftPaddle.height
        ) {
            ball.dx *= -1;
    
            // Adjust ball position to prevent it from getting stuck
            ball.x = leftPaddle.x + leftPaddle.width + ball.radius;
        }
    
        // Paddle collision (right paddle)
        if (
            ball.x + ball.radius > rightPaddle.x &&
            ball.x - ball.radius < rightPaddle.x + rightPaddle.width &&
            ball.y + ball.radius > rightPaddle.y &&
            ball.y - ball.radius < rightPaddle.y + rightPaddle.height
        ) {
            ball.dx *= -1;
    
            // Adjust ball position to prevent it from getting stuck
            ball.x = rightPaddle.x - ball.radius;
        }
    
        // Ball out of bounds (left side)
        if (ball.x - ball.radius < 0) {
            rightScore++;
            resetBall();
        }
    
        // Ball out of bounds (right side)
        if (ball.x + ball.radius > canvas.width) {
            leftScore++;
            resetBall();
        }
    }
    

    // Reset ball
    function resetBall() {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = -ball.dx;
    }

    // Move paddles
    function movePaddles() {
        // Left paddle logic
        if (Math.random() > 0.5) {
            if (ball.y > leftPaddle.y + leftPaddle.height / 2) {
                leftPaddle.y += leftPaddle.speed;
            } else {
                leftPaddle.y -= leftPaddle.speed;
            }
        }

        // Right paddle logic
        if (Math.random() > 0.5) {
            if (ball.y > rightPaddle.y + rightPaddle.height / 2) {
                rightPaddle.y += rightPaddle.speed;
            } else {
                rightPaddle.y -= rightPaddle.speed;
            }
        }

        // keep paddles in canvas
        leftPaddle.y = Math.max(Math.min(leftPaddle.y, canvas.height - leftPaddle.height), 0);
        rightPaddle.y = Math.max(Math.min(rightPaddle.y, canvas.height - rightPaddle.height), 0);
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
