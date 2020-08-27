const locoScroll = new LocomotiveScroll({
	el: document.querySelector('.smooth-scroll'),
	smooth: true,
	smoothMobile: true,
	lerp: 0.07,
});

locoScroll.on('scroll', ScrollTrigger.update);
ScrollTrigger.scrollerProxy('.smooth-scroll', {
	scrollTop(value) {
		return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
	},
	getBoundingClientRect() {
		return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
	},
	pinType: document.querySelector('.smooth-scroll').style.transform ? 'transform' : 'fixed',
});

ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
ScrollTrigger.refresh();

/**
 * ANIMATE IMAGES
 */
document.querySelectorAll('.images').forEach((image) => {
	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: image,
			scroller: '.smooth-scroll',
			scrub: true,
			end: '+=200%',
		},
	});

	tl.set(image, {
		autoAlpha: 0,
		scale: 0.8,
	})

		.fromTo(
			image,
			{
				autoAlpha: 0,
			},
			{
				autoAlpha: 1,
				scale: 1,
			}
		)

		.to(image, { autoAlpha: 0, scale: 1 });
});
