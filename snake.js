 const gameBoard = document.getElementById('game-board');
        const snakeElement = document.getElementById('snake');
        const foodElement = document.getElementById('food');
        const scoreElement = document.getElementById('score');

      
        const cellSize = 20;

      
        let snakeX = 0;
        let snakeY = 0;
        let foodX = 0;
        let foodY = 0;

       
        let dx = cellSize;
        let dy = 0;

        
        let score = 0;

        
        initialize();

        
        function initialize() {
          
            snakeX = 0;
            snakeY = 0;

           
            foodX = generateRandomPosition(gameBoard.clientWidth);
            foodY = generateRandomPosition(gameBoard.clientHeight);

            
            score = 0;
            updateScore();

        
            dx = cellSize;
            dy = 0;

         
            while (snakeElement.firstChild) {
                snakeElement.removeChild(snakeElement.firstChild);
            }
            const initialSegment = createSnakeSegment(snakeX, snakeY);
            snakeElement.appendChild(initialSegment);

       
            foodElement.style.left = `${foodX}px`;
            foodElement.style.top = `${foodY}px`;

           
            gameLoop();
        }

        function createSnakeSegment(x, y) {
            const segment = document.createElement('div');
            segment.classList.add('snake');
            segment.style.left = `${x}px`;
            segment.style.top = `${y}px`;
            return segment;
        }

        
        function moveSnake() {
           
            snakeX += dx;
            snakeY += dy;

           
            if (snakeX < 0 || snakeY < 0 || snakeX >= gameBoard.clientWidth || snakeY >= gameBoard.clientHeight) {
                gameOver();
                return;
            }

            
            if (snakeX === foodX && snakeY === foodY) {
               
                score++;
                updateScore();

                
                const newSegment = createSnakeSegment(snakeX, snakeY);
                snakeElement.appendChild(newSegment);

                
                foodX = generateRandomPosition(gameBoard.clientWidth);
                foodY = generateRandomPosition(gameBoard.clientHeight);
                foodElement.style.left = `${foodX}px`;
                foodElement.style.top = `${foodY}px`;
            } else {
                
                const lastSegment = snakeElement.lastChild;
                snakeElement.removeChild(lastSegment);
            }

            
            const newSegment = createSnakeSegment(snakeX, snakeY);
            snakeElement.insertBefore(newSegment, snakeElement.firstChild);
        }

       
        function generateRandomPosition(max) {
            return Math.floor(Math.random() * max / cellSize) * cellSize;
        }

       
        function updateScore() {
            scoreElement.innerText = `ניקוד: ${score}`;
        }

        
        function gameOver() {
            alert(`המשחק נגמר! ניקוד סופי: ${score}`);
            initialize();
        }

      
        function gameLoop() {
            setTimeout(function () {
                moveSnake();
                gameLoop();
            }, 200);
        }

       
        document.addEventListener('keydown', function (event) {
            const key = event.key;
            const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

           
            if (arrowKeys.includes(key) && !(key === 'ArrowUp' && dy === cellSize) && !(key === 'ArrowDown' && dy === -cellSize) &&
                !(key === 'ArrowLeft' && dx === cellSize) && !(key === 'ArrowRight' && dx === -cellSize)) {
                switch (key) {
                    case 'ArrowUp':
                        dx = 0;
                        dy = -cellSize;
                        break;
                    case 'ArrowDown':
                        dx = 0;
                        dy = cellSize;
                        break;
                    case 'ArrowLeft':
                        dx = -cellSize;
                        dy = 0;
                        break;
                    case 'ArrowRight':
                        dx = cellSize;
                        dy = 0;
                        break;
                }
            }
        });
