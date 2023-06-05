import './App.css';
import styled from "styled-components";

const BIRD_SIZE = 20;
const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;

function App() {
  return (
    <Div className="App">
      <GameBox height={GAME_HEIGHT} width={GAME_WIDTH}>
        <Bird size={BIRD_SIZE}/>
      </GameBox>
    </Div>
  );
}

export default App;


const Bird = styled.div`
  position: absolute;
  background-color: gold;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  top: ${(props) => props.size}px;
  border-radius: 50%;
  `;

const Div = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const GameBox = styled.div`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: blue;
`;