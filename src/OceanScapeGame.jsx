import { useEffect, useRef, useState } from 'react'
import oceanBackgroundImg from './assets/ocean.png'
import bubbleImg from './assets/animals/bubble.png'
import bubblesImg from './assets/animals/bubbles.png'
import treasureImg from './assets/animals/treasure.png'

const leftAnimalImages = import.meta.glob('./assets/animals/left/*.png', {
    eager: true,
    import: 'default',
})

const rightAnimalImages = import.meta.glob('./assets/animals/right/*.png', {
    eager: true,
    import: 'default',
})

function getAnimalImage(name, direction) {
    const folder = direction === 'right' ? rightAnimalImages : leftAnimalImages
    return folder[`./assets/animals/${direction}/${name}.png`]
}

const GAME_WIDTH = 760
const GAME_HEIGHT = 430

const fishNames = Array.from({ length: 14 }, (_, index) => `fish${index + 1}`)

const visitorNames = [
    'turtle',
    'dolphin',
    'shark',
]

function randomBetween(min, max) {
    return Math.random() * (max - min) + min
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function makeSwimmer(kind = 'fish', gameWidth = GAME_WIDTH) {
    const movingRight = Math.random() > 0.5
    const direction = movingRight ? 'right' : 'left'
    const animalName = kind === 'fish' ? pickRandom(fishNames) : pickRandom(visitorNames)
    const size = kind === 'fish' ? randomBetween(48, 78) : randomBetween(118, 170)
    const y = kind === 'fish' ? randomBetween(85, 275) : randomBetween(115, 250)
    const speed = kind === 'fish' ? randomBetween(0.45, 1.25) : randomBetween(0.55, 0.9)
    const startPadding = kind === 'fish' ? size + 60 : size + 120

    return {
        id: `${kind}-${Date.now()}-${Math.random()}`,
        kind,
        animalName,
        direction,
        img: getAnimalImage(animalName, direction),
        x: movingRight ? -startPadding : gameWidth + startPadding,
        y,
        size,
        speed: movingRight ? speed : -speed,
        movingRight,
        turnCooldown: randomBetween(90, 180),
        delay: randomBetween(0, 1.5),
    }
}

function makeBubble(index, gameWidth = GAME_WIDTH) {
    const side = Math.random() > 0.5 ? 'left' : 'right'
    const x = side === 'left' ? randomBetween(10, 85) : randomBetween(gameWidth - 105, gameWidth - 35)

    return {
        id: `bubble-${index}-${Date.now()}-${Math.random()}`,
        img: Math.random() > 0.45 ? bubblesImg : bubbleImg,
        x,
        y: randomBetween(GAME_HEIGHT + 20, GAME_HEIGHT + 210),
        size: randomBetween(24, 54),
        speed: randomBetween(0.35, 0.85),
        drift: randomBetween(-0.25, 0.25),
    }
}

function makeStartingSwimmers(gameWidth = GAME_WIDTH) {
    return [
        { ...makeSwimmer('fish', gameWidth), x: gameWidth * 0.18 },
        { ...makeSwimmer('fish', gameWidth), x: gameWidth * 0.44 },
        { ...makeSwimmer('fish', gameWidth), x: gameWidth * 0.72 },
        makeSwimmer('visitor', gameWidth),
    ]
}

export default function OceanScapeGame() {
    const [coins, setCoins] = useState(() => Number(localStorage.getItem('oceanCoins') || 0))
    const [swimmers, setSwimmers] = useState(makeStartingSwimmers)
    const [bubbles, setBubbles] = useState(() => Array.from({ length: 10 }, (_, index) => makeBubble(index)))
    const [coinBursts, setCoinBursts] = useState([])

    const gameRef = useRef(null)
    const swimmersRef = useRef(swimmers)
    const bubblesRef = useRef(bubbles)
    const lastFishSpawnRef = useRef(performance.now())
    const lastVisitorSpawnRef = useRef(performance.now())

    const collectTreasure = (event) => {
        event.stopPropagation()

        const earnedCoins = Math.floor(randomBetween(3, 8))
        const nextCoins = coins + earnedCoins

        setCoins(nextCoins)
        localStorage.setItem('oceanCoins', String(nextCoins))

        setCoinBursts((currentBursts) => [
            ...currentBursts,
            {
                id: `coin-${Date.now()}-${Math.random()}`,
                amount: earnedCoins,
            },
        ])
    }

    useEffect(() => {
        swimmersRef.current = swimmers
    }, [swimmers])

    useEffect(() => {
        bubblesRef.current = bubbles
    }, [bubbles])

    useEffect(() => {
        let animationFrame
        let lastTime = performance.now()

        const tick = (time) => {
            const delta = Math.min((time - lastTime) / 16.67, 2)
            const gameWidth = gameRef.current?.clientWidth || GAME_WIDTH

            lastTime = time

            setSwimmers(() => {
                let nextSwimmers = swimmersRef.current
                    .map((swimmer) => {
                        let nextSpeed = swimmer.speed
                        let nextDirection = nextSpeed > 0 ? 'right' : 'left'
                        let nextTurnCooldown = swimmer.turnCooldown - delta

                        const safelyInsideFrame = swimmer.x > 80 && swimmer.x < gameWidth - swimmer.size - 80

                        // Fish can occasionally turn around while still on screen.
                        // When that happens, the sprite swaps between the left/right folder versions.
                        if (swimmer.kind === 'fish' && safelyInsideFrame && nextTurnCooldown <= 0 && Math.random() > 0.992) {
                            nextSpeed *= -1
                            nextDirection = nextSpeed > 0 ? 'right' : 'left'
                            nextTurnCooldown = randomBetween(90, 180)
                        }

                        return {
                            ...swimmer,
                            x: swimmer.x + nextSpeed * delta,
                            speed: nextSpeed,
                            movingRight: nextSpeed > 0,
                            direction: nextDirection,
                            img: getAnimalImage(swimmer.animalName, nextDirection),
                            turnCooldown: nextTurnCooldown,
                        }
                    })
                    .filter((swimmer) => {
                        if (swimmer.movingRight) return swimmer.x < gameWidth + swimmer.size + 180
                        return swimmer.x > -swimmer.size - 180
                    })

                if (time - lastFishSpawnRef.current > randomBetween(1200, 2400) && nextSwimmers.filter((swimmer) => swimmer.kind === 'fish').length < 7) {
                    nextSwimmers = [...nextSwimmers, makeSwimmer('fish', gameWidth)]
                    lastFishSpawnRef.current = time
                }

                if (time - lastVisitorSpawnRef.current > randomBetween(8500, 14000) && !nextSwimmers.some((swimmer) => swimmer.kind === 'visitor')) {
                    nextSwimmers = [...nextSwimmers, makeSwimmer('visitor', gameWidth)]
                    lastVisitorSpawnRef.current = time
                }

                swimmersRef.current = nextSwimmers
                return nextSwimmers
            })

            setBubbles(() => {
                const nextBubbles = bubblesRef.current.map((bubble, index) => {
                    const nextY = bubble.y - bubble.speed * delta
                    const nextX = bubble.x + bubble.drift * delta

                    if (nextY < -120) {
                        return makeBubble(index, gameWidth)
                    }

                    return {
                        ...bubble,
                        x: nextX,
                        y: nextY,
                    }
                })

                bubblesRef.current = nextBubbles
                return nextBubbles
            })

            animationFrame = requestAnimationFrame(tick)
        }

        animationFrame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(animationFrame)
    }, [])

    useEffect(() => {
        if (coinBursts.length === 0) return undefined

        const timeout = setTimeout(() => {
            setCoinBursts((currentBursts) => currentBursts.slice(1))
        }, 900)

        return () => clearTimeout(timeout)
    }, [coinBursts])

    return (
        <div ref={gameRef} className="ocean-game" aria-label="Ocean treasure mini scene">
            <img src={oceanBackgroundImg} alt="" className="ocean-background" />

            <div className="ocean-hud">
                <span>coins: {coins}</span>
            </div>

            {bubbles.map((bubble) => (
                <img
                    key={bubble.id}
                    src={bubble.img}
                    alt=""
                    className="ocean-bubble"
                    style={{
                        left: `${bubble.x}px`,
                        top: `${bubble.y}px`,
                        width: `${bubble.size}px`,
                    }}
                />
            ))}

            {swimmers.map((swimmer) => (
                <img
                    key={swimmer.id}
                    src={swimmer.img}
                    alt=""
                    className={`ocean-swimmer ${swimmer.kind === 'visitor' ? 'ocean-visitor' : 'ocean-fish'}`}
                    style={{
                        left: `${swimmer.x}px`,
                        top: `${swimmer.y}px`,
                        width: `${swimmer.size}px`,
                        animationDelay: `${swimmer.delay}s`,
                    }}
                />
            ))}

            <button
                type="button"
                className="treasure-button"
                onClick={collectTreasure}
                aria-label="Open treasure chest and collect coins"
            >
                <img src={treasureImg} alt="Treasure chest" />
            </button>

            {coinBursts.map((burst) => (
                <span key={burst.id} className="coin-burst">+{burst.amount}</span>
            ))}
        </div>
    )
}
