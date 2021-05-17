document.addEventListener("DOMContentLoaded", function (e) {
	const inputDown =
		"ontouchstart" in document.documentElement ? "touchstart" : "mousedown"
	const inputMove =
		"ontouchmove" in document.documentElement ? "touchmove" : "mousemove"
	const inputUp =
		"ontouchend" in document.documentElement ? "touchend" : "mouseup"

	const slider = document.querySelector(
		".comparison-images-slider__images-block"
	)
	const comparisonImage = document.querySelector(
		".comparison-images-slider__comparison-img-wrapper"
	)

	const sliderRange = document.querySelector(
		".comparison-images-slider__range-block"
	)
	const circle = document.querySelector(
		".comparison-images-slider__range-circle"
	)
	const leftSide = circle.previousElementSibling

	const changeWidth = (eventMove) => {
		let newWidthImg =
			(slider.offsetWidth - (eventMove.pageX - slider.offsetLeft)) / slider.offsetWidth *	100

		let newWidthRange =
			(eventMove.pageX - sliderRange.offsetLeft - circle.offsetWidth / 2) /	sliderRange.offsetWidth *	100

		leftSide.style.width = `${Math.min(Math.max(newWidthRange, 0), 100)}%`
		comparisonImage.style.width = `${Math.min(Math.max(newWidthImg, 0), 100)}%`
	}

	const MouseMoveHandler = function (eventMove) {
		changeWidth(eventMove)
	}

	const MouseUpHandler = function (eventUp) {
		this.removeEventListener(inputMove, MouseMoveHandler)
		this.removeEventListener(inputUp, MouseUpHandler)
	}

	const DownHandler = function (eventDown) {
		if (this === slider) {
			changeWidth(eventDown)
			slider.addEventListener(inputMove, MouseMoveHandler)
			slider.addEventListener(inputUp, MouseUpHandler)
		} else {
			document.addEventListener(inputMove, MouseMoveHandler)
			document.addEventListener(inputUp, MouseUpHandler)
		}
	}

	slider.addEventListener(inputDown, DownHandler)
	circle.addEventListener(inputDown, DownHandler)

	
	// circle.addEventListener('focus', (event) => {
	// 	comparisonImage.style.transition = "width 2s"
	// 	document.addEventListener('keypress', (event) => {})
	// 	circle.addEventListener('focusout', (event) => {})
	// })
})
