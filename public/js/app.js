// console.log('Client side javascript file is loaded.');

// fetch('http://localhost:3000/weather?location=boston').then((response) => {
// 	response.json().then((data) => {
// 		if (data.error) {
// 			console.log(data.error);
// 		} else {
// 			console.log(data.location);
// 			console.log(data.forecast);
// 		}
// 	})
// })

const weatherform = document.querySelector('form')
const input = document.getElementById('locationField')
const messageLocation = document.getElementById('messageLocation')
const messageForecast = document.getElementById('messageForecast')
const messageError = document.getElementById('messageError')

weatherform.addEventListener('submit', (e) => {
	e.preventDefault()

	let location = input.value

	fetch(`/weather?location=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageError.textContent = data.error
			} else {
				messageLocation.textContent = data.location
				messageForecast.textContent = data.forecast
			}
		})
	})
})