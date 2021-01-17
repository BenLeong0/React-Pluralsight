
// Component (React function/class) names need to start with an uppercase
function Button(props) {
  // [getter, setter] = useState(initialState)
  const handleClick = () => {props.onClickFunction(props.increment)}
  
  // The inline () => notation is required because we need to pass a variable
  // through the function, but we are meant to declare a pointer to the function
  // rather than invoke it - ie. we want to write {f} rather than {f()}
  return (
    <button onClick={handleClick}>
      +{props.increment}
    </button>
  );
}


// [props] calls from its parent (App() in this case)
function Display(props) {
  return (
    <div>{props.message}</div>
  );
}

function App() {
  const [counter, setCounter] = useState(5);
  const incrementCounter = (n) => setCounter(counter+n);
  return (
    <div>
      <Button onClickFunction={incrementCounter} increment={1} />
      <Button onClickFunction={incrementCounter} increment={5} />
      <Button onClickFunction={incrementCounter} increment={10} />
      <Button onClickFunction={incrementCounter} increment={100} />
      <Display message={counter}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('mountNode'),
);
