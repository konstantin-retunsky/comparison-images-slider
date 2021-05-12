const inputDown = ('ontouchstart' in document.documentElement)
	? 'touchstart'
	: 'mousedown'
const inputMove = ('ontouchmove' in document.documentElement)
	? 'touchmove'
	: 'mousemove'
const inputUp = ('ontouchend' in document.documentElement)
	? 'touchend'
	: 'mouseup'

const slider = document.querySelector(".comparison-images-slider__images-block")
const comparisonImage = document.querySelector(".comparison-images-slider__comparison-img-wrapper")

const sliderRange = document.querySelector('.comparison-images-slider__range-block')
const circle = document.querySelector('.comparison-images-slider__range-circle')
const leftSide = circle.previousElementSibling

let x = 0
let leftWidth = 0

const changeWidth = (newWidth) => {
  leftSide.style.width = `${newWidth}%`
	comparisonImage.style.width = `${newWidth}%`
}

const sliderMouseDownHandler = function(eventDown) {
	slider.addEventListener('mousemove', sliderMouseMoveHandler);
	slider.addEventListener('mouseup', sliderMouseUpHandler);
}

const sliderMouseMoveHandler = function(eventMove) {
	let newWidth = Math.min(Math.max(((eventMove.pageX - this.offsetLeft) / this.offsetWidth) * 100, 0), 100)
	changeWidth(newWidth)
}

const sliderMouseUpHandler = function(eventClickUp) {
	slider.removeEventListener('mousemove', sliderMouseMoveHandler);
	slider.removeEventListener('mouseup', sliderMouseUpHandler);
}

slider.addEventListener(inputDown, sliderMouseDownHandler)

const mouseDownHandler = function(e) {
  x = e.clientX
  leftWidth = leftSide.getBoundingClientRect().width

  document.addEventListener(inputMove, mouseMoveHandler)
  document.addEventListener(inputUp, mouseUpHandler)
}

const mouseMoveHandler = function(e) {
  const dx = e.clientX - x

  const containerWidth = circle.parentNode.getBoundingClientRect().width
  let newWidth = Math.min(Math.max((leftWidth + dx) * 100 / containerWidth, 0), 100)

	changeWidth(newWidth)
}

const mouseUpHandler = function() {
  document.removeEventListener(inputMove, mouseMoveHandler)
  document.removeEventListener(inputUp, mouseUpHandler)
}

circle.addEventListener(inputDown, mouseDownHandler)
// slider.addEventListener('focus', (event) => {
// });