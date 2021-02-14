import anime from 'animejs';

/**
 * Choff element to the side
 * @param {*} element 
 * @param {Number} n 
 */
export function translate(element, n) {
  anime({
    targets: element,
    translateX: n,
    opacity:1.0,
  });
}

export function hide(element, n, duration) {
  anime({
    targets: element,
    translateX: n,
    opacity:0,
    easing: 'easeInOutSine',
    duration:duration,
    //direction: 'alternate',
    //loop: true,
  });
}

export function test(element) {
  anime({
    targets: element,
    opacity:[
      { value: 0.0, duration: 100, delay: 0 },
      { value: 1, delay: 100 },
    ]
  })
}