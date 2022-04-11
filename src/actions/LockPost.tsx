import { FormEvent, useState } from 'react';
import useAxios from 'axios-hooks';
import { Card } from 'components/Card';
import styles from './styles.module.css';
import { TextInput } from 'components/TextInput';
import { Button, ButtonKind } from 'components/Button';
import { DropdownInput } from 'components/DropdownInput';

interface Props {
	token: string;
}

type Reason = 'SPAM' | 'TOO_HEATED' | 'CLOSED';
const reasons: Reason[] = ['SPAM', 'TOO_HEATED', 'CLOSED'];

const lockQuery = `
mutation lockPost($id: ID!, $lockedReason: LockedReasonEnum!){
  post {
    lock (input: {
      id: $id,
      lockedReason: $lockedReason,
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
	lockedReason: Reason;
}

export default function LockPost({ token }: Props) {
	const [url, setUrl] = useState('');
	const [reason, setReason] = useState<Reason>('CLOSED');

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
			lockedReason: reason,
		};

		console.log(variables);

		execute({
			data: {
				query: lockQuery,
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
				<legend>Lock Post</legend>
				<label>
					Url
					<TextInput
						type='text'
						value={url}
						onChange={(e) => setUrl(e.currentTarget.value)}
					/>
				</label>

				<label>
					Reason
					<DropdownInput
						value={reason}
						onChange={(e) => setReason(e.currentTarget.value as Reason)}>
						{reasons.map((reasoning, i) => (
							<option key={reasoning + i} value={reasoning}>
								{reasoning}
							</option>
						))}
					</DropdownInput>
				</label>

				<Button kind={ButtonKind.PRIMARY}>Submit</Button>
			</form>
		</Card>
	);
}
