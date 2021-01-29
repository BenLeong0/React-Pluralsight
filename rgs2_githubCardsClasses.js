// 'key' assigns a key to each element, so it knows what to sort them by should you want to later
const CardList = props => (
  <div>
    {props.profiles.map(profile => (
      <Card key={profile.id} {...profile} />
    ))}
  </div>
);

// render() is COMPULSORY for React classes - defines the HTML declaration
class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

// Could use React.createRef() = userNameInput
// Then in input, have ref={userNameInput}
// However, in this case it would be controlled by the browser rather than react
// Instead, we have a state prop that is updated whenever a new character is typed
class Form extends React.Component {
  state = { userName: "" };
  handleSubmit = async event => {
    event.preventDefault();
    const resp = await axios.get(
      `https://api.github.com/users/${this.state.userName}`
    );
    // using ` => template string
    this.props.onSubmit(resp.data);
    this.setState({ userName: "" }); // Reset field after getting data
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="GitHub username"
          required
        />
        <button>Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: []
  };
  // Could instead use constructor (props) => {super(props); self.state={profiles: []}}
  // Be sure to include super (else not a react component)!
  // Note: declaring outside constructor is not official yet (?)

  addNewProfile = profileData => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }));
  };

  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

ReactDOM.render(<App title="The GitHub Cards App" />, mountNode);
