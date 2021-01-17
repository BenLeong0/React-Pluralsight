const CardList = (props) => (
	<div>
  	{props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
	</div>
);

const Card = (props) => (
  <div className="github-profile">
    <img src={props.avatar_url} />
    <div className="info">
      <div className="name">{props.name}</div>
      <div className="company">{props.company}</div>
    </div>
  </div>
)

const Form = (props) => {
	const [userName, setUserName] = useState('');
	const handleSubmit = async (event) => {
  	event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${userName}`);
      // using ` => template string
    props.onSubmit(resp.data);
    console.log(userName)
		setUserName('')
  };
	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={userName}
				onChange={event => setUserName(event.target.value)}
				placeholder="GitHub username"
				required
			/>
			<button>Add card</button>
		</form>
	);
}

const App = (props) => {
  const [profiles, setProfiles] = useState([])
  const addNewProfile = (profileData) => {setProfiles([...profiles, profileData])}
  return (
    <div>
      <div className="header">{props.title}</div>
      <Form onSubmit={addNewProfile}/>
      <CardList profiles={profiles} />
    </div>
  );
};

ReactDOM.render(
	<App title="The GitHub Cards App" />,
  mountNode,
);
