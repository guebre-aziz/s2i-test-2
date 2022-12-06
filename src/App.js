import "./App.css";
import Calendar from "./components/Calendar/Calendar";
import ProfileCard from "./components/ProfileCard/ProfileCard";

function App() {
  return (
    <div className="App">
      <div className="scheduler">
        <ProfileCard />
        <hr className="schedulerHr" />
        <Calendar />
      </div>
    </div>
  );
}

export default App;
