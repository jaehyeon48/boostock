import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import Socket from './Socket';
import App from './App';

ReactDOM.render(
	<RecoilRoot>
		<Socket>
			<App />
		</Socket>
	</RecoilRoot>,
	document.getElementById('app')
);
