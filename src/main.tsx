import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';

const root = document.getElementsByTagName('html')[0];
if (root) {
	root.className = 'theme-dark';
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
