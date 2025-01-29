import "./App.css";
import TikTacToe from "./Components/TikTacToe/TikTacToe";
import WaveAnimation from "./Components/Background/WaveAnimation";

function App() {
  return (
    <>
      <div>
        <WaveAnimation />
        <TikTacToe />
      </div>
    </>
  );
}

export default App;
