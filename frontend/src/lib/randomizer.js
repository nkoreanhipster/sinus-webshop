let slogos = [
    "Carpe Diem",
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
    "Making dreams come to life",
    "Plan to action",
    "We take pride in your work",
    "Put us to test",
    "Making your vision come true",
    "Quality is what we pursue",
    "Our reputation is the proof.",
    "You can sleep at night",
    "We’re on the top of everything",
    "We work to impress",
    "We’re better than the rest",
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
    "Good to the last drop",
    "Its everywhere you want to be",
    "Have you met your life today?",
    "Keeps going and going and going",
]

/**
 * Random company slogo
 * @returns String
 */
export const getRandomSlogo =()=>{
    return slogos[(0).randomIntInclusive(0, slogos.length-1)];
}

export const randomVersionNumber=()=>{
    let prefix = (0).randomComboIntInclusive(0,9,1).join('')
    let suffix = (0).randomComboIntInclusive(0,9,12).join('')
    return `?v=${prefix}.${suffix}`
}

export default{
    getRandomSlogo
}