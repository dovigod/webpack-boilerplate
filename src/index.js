import './main.css';
import './style.scss';
window.onload = () => {
	const img = new Image(200, 200);
	img.src = '/svg/goog.svg';

	const body = document.querySelector('body');

	body.appendChild(img);
};
