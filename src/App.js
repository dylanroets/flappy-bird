import './App.css';
import styled from "styled-components";
import { useEffect, useState } from 'react';

const BIRD_SIZE = 20;
const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;
const GRAVITY = 6;
const JUMP_HEIGHT = 80;
const OBSTACLE_WIDTH = 40;
const OBSTACLE_GAP = 200;

function App() {

  const [birdPosition, setBirdPosition] = useState(250);
  const [gameStarted, setGameStarted] = useState(false);
  const [obstacleHeight, setObstacleHeight] = useState(200);
  const [obstacleLeft, setObstacleLeft] = useState(GAME_WIDTH - OBSTACLE_WIDTH);
  const [score, setScore] = useState(0)
  
  const bottomObstacleHeight = GAME_HEIGHT - OBSTACLE_GAP - obstacleHeight;

  // Handling bird location and height/jumping

  useEffect(() => {

    let timeId;
      if (gameStarted && birdPosition < GAME_HEIGHT - BIRD_SIZE) {
        timeId = setInterval(() => {
          setBirdPosition(birdPosition => birdPosition + GRAVITY)
        }, 24);
      }
    
    return () => {
      clearInterval(timeId);
    }
  }, [birdPosition, gameStarted]);

  //This useEffect will handle pipes/obstacles scrolling left and randomizing in location

  useEffect(() => {
    let obstacleId;
      if (gameStarted && obstacleLeft >= -OBSTACLE_WIDTH) {
        obstacleId = setInterval(() => {
          setObstacleLeft((obstacleLeft) => obstacleLeft - 5);
        }, 24);

        return () => {
          clearInterval(obstacleId);
        };
      } else {
        setObstacleLeft(GAME_WIDTH - OBSTACLE_WIDTH);
        setObstacleHeight(Math.floor(Math.random() * (GAME_HEIGHT - OBSTACLE_GAP)));
        //Setting Score
        if (gameStarted) {setScore((score) => score + 1)}
      };
  }, [gameStarted, obstacleLeft]);

  // This useEffect is our collision tracking useEffect to see if the bird has hit the bottom or top pbstacle

  useEffect(() => {
    const hasCollideWithTopObstacle = 
      birdPosition >= 0 && birdPosition < obstacleHeight;
    const hasCollideWithBottomObstacle = 
      birdPosition <= 500 && birdPosition >= 500 - bottomObstacleHeight;

    if (obstacleLeft >= 0 &&
        obstacleLeft <= OBSTACLE_WIDTH && 
        (hasCollideWithTopObstacle || hasCollideWithBottomObstacle)) {
      setGameStarted(false);
      setScore(0);
    }
  }, [birdPosition, obstacleHeight, bottomObstacleHeight, obstacleLeft])

  // Handles clicking on the game box to get the bird to jump and start the game movement

  const handleClick = () => {
    let newBirdPosition = birdPosition - JUMP_HEIGHT;
    if (!gameStarted) {
      setGameStarted(true)
    }
    else if (newBirdPosition < 0) {
      setBirdPosition(0)
    } else {
    setBirdPosition(newBirdPosition)
    }
  }

  return (
    <Div className="App" onClick={handleClick}>
      <GameBox height={GAME_HEIGHT} width={GAME_WIDTH}>
        <Obstacle 
          top={0}
          width={OBSTACLE_WIDTH}
          height={obstacleHeight}
          left={obstacleLeft}
        />

<Obstacle 
          top={GAME_HEIGHT - (obstacleHeight + bottomObstacleHeight)}
          width={OBSTACLE_WIDTH}
          height={bottomObstacleHeight}
          left={obstacleLeft}
        />
        <Bird size={BIRD_SIZE} top={birdPosition} />
      </GameBox>
      <span> {score} </span>
    </Div>
  );
}

export default App;


const Bird = styled.div`
  position: absolute;
  background-color: gold;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  top: ${(props) => props.top}px;
  border-radius: 50%;
  `;
//Span styling/ score styling here
const Div = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  & span{
    color: white;
    font-size: 24px;
    position: absolute;
  }
`;

// overflow hidden allows for pipes to hide after they move left outside of the gamebox
const GameBox = styled.div`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-image: url('https://user-images.githubusercontent.com/18351809/46888871-624a3900-ce7f-11e8-808e-99fd90c8a3f4.png');
  overflow: hidden;
`;

const Obstacle = styled.div`
  position: relative;
  top: ${(props) => props.top}px;
  background-color: green;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  left: ${(props) => props.left}px;
`;