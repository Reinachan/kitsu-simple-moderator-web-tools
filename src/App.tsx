import { useState } from 'react';
import './App.css';
import Login from './Login/Login';
import LockPost from './actions/LockPost';
import UnlockPost from './actions/UnlockPost';

function App() {
	const [token, setToken] = useState('');

	return (
		<main>
			<h1>Simple Kitsu Moderator Tools</h1>
			<Login setToken={setToken} />

			{token ? (
				<>
					<LockPost token={token} />
					<UnlockPost token={token} />
				</>
			) : (
				<></>
			)}
		</main>
	);
}

export default App;
