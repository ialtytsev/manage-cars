import CarList from "./components/CarList";
import CarContextProvider from "./contexts/CarContext";

function App() {
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <CarContextProvider>
            <CarList />
          </CarContextProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
