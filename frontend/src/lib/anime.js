import anime from 'animejs';

/**
 * Choff element to the side
 * @param {*} element 
 * @param {Number} n 
 */
export function translate(element, n) {
  anime({
    targets: element,
    translateX: n
  });
}