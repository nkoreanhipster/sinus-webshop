let slogos = [
    "Um nost aut velesto beratur sitio vellabo itas nis et pr",
    "Carpe Diem",
    "Paint the Town Red",
    "Let Bygones Be Bygones",
    "Making dreams come to life",
    "Plan to action",
    "We’ll get it done",
    "We take pride in your work",
    "Put us to test",
    "Making your vision come true",
    "Quality is what we pursue",
    "Our reputation is the proof.",
    "You can sleep at night",
    "We’re on the top of everything",
    "We work to impress",
    "For every mood, and every move.",
    "Generic Business Slogans",
    "Making dreams come to life",
    "Plan to action",
    "We’ll get it done",
    "Let’s nail your next project",
    "We take pride in your work",
    "Put us to test",
    "Making your vision come true",
    "Quality is what we pursue",
    "Our reputation is the proof.",
    "You can sleep at night",
    "We’re on the top of everything",
    "We work to impress",
    "We’re better than the rest",
    "Getting shit done",
    "You dream it. We build it.",
    "Strategy before tactics.",
    "Marketing is a habit, not an event.",
    "Fix the problem, not the blame.",
    "Starting is easy, finishing is hard.",
    "Compete on value, not on price.",
    "For every mood, and every move.",
    "Beauty lies within",
    "Get in the zone",
    "Think outside the bun",
    "The happiest place on earth",
    "We find ways",
    "You’re in good hands.",
    "Save money, live better",
    "Maxwell House",
    "Good to the last drop",
    "Its everywhere you want to be",
    "Buy it, sell it, love it.",
    "Have you met your life today?",
    "Keeps going and going and going",
    "XXXX_INSERT_SLOGAN_HERE_XXXX",
]

/**
 * Random company slogo
 * @returns String
 */
export const getRandomSlogo =()=>{
    return slogos[(0).randomIntInclusive(0, slogos.length-1)];
}

export default{
    getRandomSlogo
}