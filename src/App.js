import "./App.css";
import ReactMovie from "./components/react-movie/ReactMovie";

require("dotenv").config();

function App() {
  return (
    <div className="App">
      <ReactMovie />
    </div>
  );
}

export default App;
