
console.log($)

$('.slider').each(function(){
	const $this = $(this);
	const $group = $this.find('.slide-group');
	const $slides = $this.find('.slide');
	let buttonArray = [];
	let currentIndex = 0;
	let timeout;

	// move() - the function to move the slides goes here (see next page)
	function move(newIndex) {
		let animateLeft, slideLeft;

		advance();

		// If curren slide is showing or a slide is animating, then do nothing
		if ($group.is(':animated') || currentIndex === newIndex) {
			return;
		}

		buttonArray[currentIndex].removeClass('.active');
		buttonArray[newIndex].addClass('.active');

		if (newIndex > currentIndex || currentIndex === $slides.length-1 && newIndex === 0) {
			slideLeft = '100%';
			animateLeft = '-100%';
		} else {
			slideLeft = '-100%';
			animateLeft = '100%';
		}
		// Position new slide to left (if less) or right (if more) of current
		$slides.eq(newIndex).css( {left: slideLeft, display: 'block'} );
		$group.animate( {left: animateLeft} , function() {
			$slides.eq(currentIndex).css( {display: 'none'} );
			$slides.eq(newIndex).css( {left: 0} );
			$group.css( {left: 0} );
			currentIndex = newIndex;
		});
	}

	function advance() {
		clearTimeout(timeout);
		// Start timer to run an anonymous function every 4 seconds
		timeout = setTimeout(function(){
			if (currentIndex < ($slides.length - 1)) {
				move(currentIndex + 1);
			} 
			else {
				move(0);
			}
		}, 4000);
	}

	$.each($slides, function(index){
		//Create a button element for the button
		const $button = $('<button type="button" class="slide-btn">&bull;</button>');
		if (index === currentIndex) {
			$button.addClass('.active');
		}
		$button.on('click', function(e){
			move(index);
		}).appendTo($this.find('.slide-buttons'));
		buttonArray.push($button);
	});

	advance();

})

