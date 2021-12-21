console.log('Client side javascript file is loaded.');

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

weatherform.addEventListener('submit', (e) => {
	e.preventDefault()

	let location = input.value

	fetch(`http://localhost:3000/weather?location=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				console.log(data.error)
			} else {
				console.log(data.location);
				console.log(data.forecast);
			}
		})
	})
})