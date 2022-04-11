import { useState } from 'react';
import Login from './Login/Login';
import LockUnlockPost from './actions/LockUnlockPost';

function App() {
	const [token, setToken] = useState('');

	return (
		<main>
			<h1>Simple Kitsu Moderator Tools</h1>

			{!token ? <Login setToken={setToken} /> : <></>}

			{token ? (
				<>
					<LockUnlockPost token={token} type='lock' />
					<LockUnlockPost token={token} type='unlock' />
				</>
			) : (
				<></>
			)}
		</main>
	);
}

export default App;
