import App from './components/app/app';
import './style.css';

try {
  await App.start();
} catch (error) {
  console.log(`%c Error: ${String(error)}`, 'background: grey;color:#e9ed09;font-weight:bold');
}
