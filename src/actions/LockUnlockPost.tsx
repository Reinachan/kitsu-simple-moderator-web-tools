import { FormEvent, useMemo, useState } from 'react';
import useAxios from 'axios-hooks';
import { Card } from 'components/Card';
import styles from './styles.module.css';
import { TextInput } from 'components/TextInput';
import { Button, ButtonKind } from 'components/Button';
import { DropdownInput } from 'components/DropdownInput';

interface Props {
	token: string;
	type: 'lock' | 'unlock';
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
	lockedReason?: Reason;
}

export default function LockUnlockPost({ token, type }: Props) {
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

		const variables: Variables = {
			id: parseInt(urlId),
			lockedReason: reason,
		};

		execute({
			data: {
				query: type === 'lock' ? lockQuery : unlockQuery,
				variables,
			},
		});
	};

	const uppercasedType = useMemo(
		() => type.charAt(0).toUpperCase() + type.slice(1),
		[type]
	);

	return (
		<Card className={styles.card}>
			<form onSubmit={onSubmit}>
				<legend>{uppercasedType} Post</legend>
				<label>
					Url
					<TextInput
						type='text'
						value={url}
						onChange={(e) => setUrl(e.currentTarget.value)}
					/>
				</label>

				{type === 'lock' ? (
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
				) : (
					<></>
				)}

				<Button kind={ButtonKind.PRIMARY} loading={loading}>
					{uppercasedType}
				</Button>
			</form>

			{!loading && data?.errors?.[0]?.message && (
				<p>{data.errors[0].message}</p>
			)}

			{!loading && data && !data?.errors?.[0]?.message && (
				<p>successfully {type}ed post</p>
			)}
		</Card>
	);
}
