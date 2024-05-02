import React, { useEffect, useContext, useReducer, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Counter context
const CounterContext = React.createContext();

// Reducer function for managing counter state
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return { count: action.count, myCount: action.myCount };
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'INCREMENT_MY_COUNT':
      return { ...state, myCount: state.myCount + 1 };
    case 'DECREMENT_MY_COUNT':
      return { ...state, myCount: state.myCount - 1 };
    default:
      return state;
  }
};

const Home = () => {
  const { state } = useContext(CounterContext);

  return (
    <div>
      <h1>Counter Value: {state.count}</h1>
      <h1>myCounter Value: {state.myCount}</h1>
      <Link to="/counter">Counter</Link><br></br>
      <Link to="/MyCounter">myCounter</Link>
    </div>
  );
};

const Counter = () => {
  const { state, dispatch } = useContext(CounterContext);
  const navigate = useNavigate();

  const incrementCounter = async () => {
    try {
      await axios.post("https://reactcounter-functional.onrender.com/api/email/increment/your-email@example.com");
      dispatch({ type: 'INCREMENT' });
    } catch (err) {
      console.error(err);
    }
  };

  const decrementCounter = async () => {
    try {
      await axios.post("https://reactcounter-functional.onrender.com/api/email/increment/your-email@example.com");
      dispatch({ type: 'DECREMENT' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Counter</h2>
      <p>Count: {state.count}</p>
      <button onClick={incrementCounter}>Increment Count</button>
      <button onClick={decrementCounter}>Decrement Count</button>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};
const MyCounter = () => {
  const { state, dispatch } = useContext(CounterContext);
  const navigate = useNavigate();

  const incrementMyCount = async () => {
    try {
      await axios.post("https://reactcounter-functional.onrender.com/api/email/incrementMyCount/your-email@example.com");
      dispatch({ type: 'INCREMENT_MY_COUNT' });
    } catch (err) {
      console.error(err);
    }
  };

  const decrementMyCount = async () => {
    try {
      await axios.post("https://reactcounter-functional.onrender.com/api/email/incrementMyCount/your-email@example.com");
      dispatch({ type: 'DECREMENT_MY_COUNT' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>myCounter</h2>
      <p>MyCount: {state.myCount}</p>
      <button onClick={incrementMyCount}>Increment MyCount</button>
      <button onClick={decrementMyCount}>Decrement MyCount</button>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};
const App = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, myCount: 0 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/counter">Counter</Link>
              </li>
              <li>
                <Link to="/myCounter">myCounter</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/myCounter" element={<MyCounter />} />
          </Routes>
        </div>
      </Router>
    </CounterContext.Provider>
  );
};

export default App;
