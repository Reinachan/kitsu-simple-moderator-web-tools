import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { Button, ButtonKind } from 'components/Button';
import { TextInput } from 'components/TextInput';
import { Card } from 'components/Card';
import styles from './styles.module.css';

interface TokenQueryResponse {
	access_token: string; // Token used in Authorization header
	created_at: number;
	expires_in: number; // Seconds until the access_token expires (30 days default)
	refresh_token: string; // Token used to get a new access_token
	scope: 'public';
	token_type: 'bearer';
}

interface TokenQueryError {
	error:
		| 'invalid_request'
		| 'invalid_client'
		| 'invalid_grant'
		| 'invalid_scope'
		| 'unauthorized_client'
		| 'unsupported_grant_type';
	error_description: string;
}

interface LoginProps {
	setToken: React.Dispatch<React.SetStateAction<string>>;
}

export default function Login({ setToken }: LoginProps) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [{ data, loading, error }, execute] = useAxios<TokenQueryResponse>(
		{
			url: 'https://kitsu.io/api/oauth/token',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		},
		{ manual: true }
	);

	const onSubmit = () => {
		execute({
			data: {
				grant_type: 'password',
				username: username,
				password: password, // RFC3986 URl encoded string
			},
		});
	};

	useEffect(() => {
		if (data) {
			setToken(data.access_token);
		}
	}, [data]);

	if (loading) {
		return <p>loading</p>;
	}

	if (error) {
		return <p>{JSON.stringify(error)}</p>;
	}

	if (data) {
		return <p>Got the token, carry on</p>;
	}

	return (
		<Card className={styles.card}>
			<form onSubmit={onSubmit}>
				<label>
					Username
					<TextInput
						type='text'
						value={username}
						onChange={(e) => setUsername(e.currentTarget.value)}></TextInput>
				</label>

				<label>
					Password
					<TextInput
						type='password'
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}></TextInput>
				</label>

				<Button kind={ButtonKind.PRIMARY}>Submit</Button>
			</form>
		</Card>
	);
}
