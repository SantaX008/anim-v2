const photos = [];

const images = document.querySelectorAll('.teammate-circle');

images.forEach(img => {
	const photoObj = {
		img: img.getAttribute('src'),
	};
	photos.push(photoObj)
	photos.push(photoObj)
	photos.push(photoObj)
});

let container = document.querySelector('.container-img');
let containerRect = container.getBoundingClientRect();

let currentIndex = 0;
let lastUpdateTime = 0;
let lastX = 0;
let lastY = 0;
let delay = 50; // Задержка между появлениями фото по умолчанию
let windowSize = window.innerWidth; // Ширина экрана
let width = windowSize * 10 / 100; // Ширина фото
let height = windowSize * 10 / 100; // Высота фото
let margin = windowSize * 1.5 / 100; // Расстояние, при котором не генерировать фото
const screenTime = 800; // Время через которое фото пропадет

let containerLeft = containerRect.left + window.pageXOffset + (margin * 2);
let containerRight = containerRect.right + window.pageXOffset - (margin * 2);
let containerTop = containerRect.top + window.pageYOffset + (margin * 2);
let containerBottom = containerRect.bottom + window.pageYOffset - (margin * 2);

window.addEventListener('resize', function (e) {
	containerRect = container.getBoundingClientRect();
	windowSize = window.innerWidth; // Ширина экрана
	containerLeft = containerRect.left + window.pageXOffset + (margin * 2);
	containerRight = containerRect.right + window.pageXOffset - (margin * 2);
	containerTop = containerRect.top + window.pageYOffset + (margin * 2);
	containerBottom = containerRect.bottom + window.pageYOffset - (margin * 2);
});

container.addEventListener('mousemove', function (e) {
	hr(e);
});

window.addEventListener('scroll', function (e) {
	containerRect = container.getBoundingClientRect();
	windowSize = window.innerWidth; // Ширина экрана
	containerLeft = containerRect.left + window.pageXOffset + (margin * 2);
	containerRight = containerRect.right + window.pageXOffset - (margin * 2);
	containerTop = containerRect.top + window.pageYOffset + (margin * 2);
	containerBottom = containerRect.bottom + window.pageYOffset - (margin * 2);
});

function hr(e) {
	const currentTime = Date.now();
	let x = e.pageX;
	let y = e.pageY;
	// const speed = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));

	if (currentTime - lastUpdateTime < delay) {
		return
	}

	let containerLeft = containerRect.left + window.pageXOffset + (margin * 2);
	let containerRight = containerRect.right + window.pageXOffset - (margin * 2);
	let containerTop = containerRect.top + window.pageYOffset + margin;
	let containerBottom = containerRect.bottom + window.pageYOffset - margin;

	// console.log(x > containerLeft,
	// 	x < containerRight,
	// 	y > containerTop,
	// 	y < containerBottom)

	if (
		!(x > containerLeft &&
			x < containerRight &&
			y > containerTop &&
			y < containerBottom)
		// ||
		// speed < 30
	) {
		return
	}

	const photo = document.createElement('div');
	const img = document.createElement('img');
	photo.classList.add('photo');
	photo.style.height = 10 + 'vw';
	photo.style.width = 10 + 'vw';

	img.classList.add('img');
	img.src = photos[currentIndex].img;

	const centerX = width / 2;
	const centerY = height / 2;

	photo.style.position = 'absolute';
	photo.style.left = x - centerX + 'px';
	photo.style.top = y - centerY + 'px';

	photo.appendChild(img);
	container.appendChild(photo);

	currentIndex++;
	if (currentIndex === photos.length) {
		currentIndex = 0
	}

	setTimeout(() => {
		photo.classList.add('photo-show')
	}, 10);

	setTimeout(() => {
		photo.classList.add('photo-hide');
		setTimeout(() => {
			photo.remove()
		}, screenTime)
	}, screenTime);

	lastUpdateTime = currentTime;
	lastX = x;
	lastY = y;

	// Уменьшаем delay в зависимости от скорости перемещения курсора
	// delay = Math.max(50, 150 - speed * 2)
}
