import React, { FormEvent, useState } from 'react';
import useAxios from 'axios-hooks';
import { Card } from 'components/Card';
import styles from './styles.module.css';
import { TextInput } from 'components/TextInput';
import { Button, ButtonKind } from 'components/Button';

interface Props {
	token: string;
}

const unlockQuery = `
mutation unlockPost($id: ID!){
  post {
    unlock (input: {
      id: $id,
    }) {
      errors {
        code
        message
        path
      }
    }
  }
}
`;

interface Variables {
	id: number;
}

export default function UnlockPost({ token }: Props) {
	const [url, setUrl] = useState('');

	const [{ data, loading, error }, execute] = useAxios(
		{
			url: 'https://kitsu.io/api/graphql',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		},
		{ manual: true }
	);

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();

		const trimmedUrl = url.split('/');

		const urlId = trimmedUrl[trimmedUrl.length - 1].split('?')[0];

		console.log(urlId);

		const variables: Variables = {
			id: parseInt(urlId),
		};

		console.log(variables);

		execute({
			data: {
				query: unlockQuery,
				variables,
			},
		});
	};

	if (loading) {
		return <p>loading</p>;
	}

	if (error) {
		return <p>{JSON.stringify(error.message)}</p>;
	}

	if (data) {
		return <p>{JSON.stringify(data.data)}</p>;
	}

	return (
		<Card className={styles.card}>
			<form onSubmit={onSubmit}>
				<legend>Unlock Post</legend>
				<label>
					Url
					<TextInput
						type='text'
						value={url}
						onChange={(e) => setUrl(e.currentTarget.value)}
					/>
				</label>

				<Button kind={ButtonKind.PRIMARY}>Submit</Button>
			</form>
		</Card>
	);
}
