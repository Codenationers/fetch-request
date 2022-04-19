import { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [characters, setCharacters] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCharacters = async () => {
			try {
				const response = await fetch(
					'https://www.breakingbadapi.com/api/characters?limit=10&offset=10',
				);
				if (!response.ok) {
					throw new Error(response.statusText);
				}

				const data = await response.json();
				setCharacters(data);
			} catch (err) {
				setError('Could not fetch data');
				console.log(err.message);
			}
		};
		fetchCharacters();
	}, []);

	return (
		<div className="App">
			{characters.map((character, index) => (
				<div key={index}>
					{error && <p>{error}</p>}
					<h1>{character.name}</h1>
					<img src={character.img} alt="breaking bad" />
				</div>
			))}
		</div>
	);
}

export default App;
