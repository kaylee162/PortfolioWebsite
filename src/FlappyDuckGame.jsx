import { useEffect, useRef, useState } from 'react'
import duckImg from './assets/duck.png'
import backgroundImg from './assets/flappy-bird-background.png'

const GAME_WIDTH = 760
const GAME_HEIGHT = 430

const DUCK_X = 140
const DUCK_SIZE = 78

const GRAVITY = 0.45
const FLAP_POWER = -7.8

const PIPE_WIDTH = 78
const STARTING_PIPE_GAP = 240
const MIN_PIPE_GAP = 165

const STARTING_PIPE_SPACING = 330
const MIN_PIPE_SPACING = 215

const STARTING_PIPE_SPEED = 3
const MAX_PIPE_SPEED = 5.2

function getDifficulty(score) {
    const gap = Math.max(MIN_PIPE_GAP, STARTING_PIPE_GAP - score * 5)
    const spacing = Math.max(MIN_PIPE_SPACING, STARTING_PIPE_SPACING - score * 4)
    const speed = Math.min(MAX_PIPE_SPEED, STARTING_PIPE_SPEED + score * 0.08)
    
    return { gap, spacing, speed }
}

function makePipe(x, score = 0) {
    const { gap } = getDifficulty(score)

    const minTop = 45
    const maxTop = GAME_HEIGHT - gap - 85

    return {
        x,
        gap,
        topHeight: Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop,
        passed: false,
    }
}

function makeStartingPipes(gameWidth = GAME_WIDTH) {
    const startX = gameWidth + PIPE_WIDTH + 80

    return [
        makePipe(startX, 0),
        makePipe(startX + STARTING_PIPE_SPACING, 0),
        makePipe(startX + STARTING_PIPE_SPACING * 2, 0),
    ]
}

export default function FlappyDuckGame() {
    const [duckY, setDuckY] = useState(180)
    const [velocity, setVelocity] = useState(0)
    const [pipes, setPipes] = useState(makeStartingPipes)
    const [score, setScore] = useState(0)
    const [best, setBest] = useState(() => Number(localStorage.getItem('flappyDuckBest') || 0))
    const [gameOver, setGameOver] = useState(false)
    const [started, setStarted] = useState(false)

    const gameRef = useRef(null)

    const flap = () => {
        if (gameOver) {
            restart()
            return
        }

        setStarted(true)
        setVelocity(FLAP_POWER)
    }

    const restart = () => {
        const gameWidth = gameRef.current?.clientWidth || GAME_WIDTH

        setDuckY(180)
        setVelocity(0)
        setPipes(makeStartingPipes(gameWidth))
        setScore(0)
        setGameOver(false)
        setStarted(false)
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Space') {
                event.preventDefault()
                flap()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [gameOver])

    useEffect(() => {
        if (gameOver) return

        const gameLoop = setInterval(() => {
            if (!started) return
                const { speed, spacing } = getDifficulty(score)

                setVelocity((currentVelocity) => currentVelocity + GRAVITY)

                setDuckY((currentY) => {
                    const nextVelocity = velocity + GRAVITY
                    const nextY = currentY + nextVelocity

                    // Top of screen: stop the duck instead of killing it.
                    if (nextY <= 0) {
                        setVelocity(0)
                        return 0
                    }

                    // Bottom of screen: game over.
                    if (nextY + DUCK_SIZE >= GAME_HEIGHT) {
                        setGameOver(true)
                        return GAME_HEIGHT - DUCK_SIZE
                    }

                return nextY
            })

            setPipes((currentPipes) => {
                let nextPipes = currentPipes
                .map((pipe) => ({
                    ...pipe,
                    x: pipe.x - speed,
                }))
                .filter((pipe) => pipe.x + PIPE_WIDTH > -20)

                const lastPipe = nextPipes[nextPipes.length - 1]
                
                const gameWidth = gameRef.current?.clientWidth || GAME_WIDTH
                const spawnX = gameWidth + PIPE_WIDTH + 80

                if (!lastPipe || lastPipe.x < gameWidth - spacing) {
                    nextPipes.push(makePipe(spawnX, score))
                }

                return nextPipes
            })
        }, 16)

        return () => clearInterval(gameLoop)
    }, [started, velocity, gameOver, score])

    useEffect(() => {
        if (gameOver || !started) return

        pipes.forEach((pipe) => {
            const duckLeft = DUCK_X
            const duckRight = DUCK_X + DUCK_SIZE
            const duckTop = duckY
            const duckBottom = duckY + DUCK_SIZE

            const pipeLeft = pipe.x
            const pipeRight = pipe.x + PIPE_WIDTH
            const gapTop = pipe.topHeight
            const gapBottom = pipe.topHeight + pipe.gap

            const isHorizontallyTouching = duckRight > pipeLeft && duckLeft < pipeRight
            const isVerticallyTouching = duckTop < gapTop || duckBottom > gapBottom

            if (isHorizontallyTouching && isVerticallyTouching) {
                setGameOver(true)
            }

            if (!pipe.passed && pipeRight < DUCK_X) {
                pipe.passed = true

                setScore((currentScore) => {
                    const nextScore = currentScore + 1

                    if (nextScore > best) {
                        setBest(nextScore)
                        localStorage.setItem('flappyDuckBest', String(nextScore))
                    }

                    return nextScore
                })
            }
        })
    }, [pipes, duckY, gameOver, started, best])

    return (
        <div
        ref={gameRef}
        className="flappy-game"
        onMouseDown={flap}
        role="button"
        tabIndex={0}
        aria-label="Flappy duck game"
        >
            <div className="flappy-hud">
                <span>score: {score}</span>
                <span>best: {best}</span>
            </div>

            <img
                src={backgroundImg}
                alt=""
                className="flappy-background"
            />

            <img
                src={duckImg}
                alt="Flying duck"
                className={`duck ${velocity < 0 ? 'duck-flap' : ''}`}
                style={{ top: `${duckY}px`, left: `${DUCK_X}px` }}
            />

            {pipes.map((pipe, index) => (
                <div key={index}>
                    <div
                        className="cute-pipe pipe-top"
                        style={{
                        left: `${pipe.x}px`,
                        height: `${pipe.topHeight}px`,
                        }}
                    >
                        <span className="pipe-flower flower-one">✿</span>
                    </div>

                    <div
                        className="cute-pipe pipe-bottom"
                        style={{
                        left: `${pipe.x}px`,
                        top: `${pipe.topHeight + pipe.gap}px`,
                        }}
                    >
                        <span className="pipe-flower flower-two">✿</span>
                    </div>
                </div>
            ))}

            {!started && !gameOver && (
                <div className="game-message">
                    <h2>flappy duck</h2>
                    <p>press space or click to fly</p>
                </div>
            )}

            {gameOver && (
                <div className="game-message game-over">
                <h2>game over</h2>
                <p>score: {score}</p>
                <button type="button" onClick={restart}>
                    restart
                </button>
                </div>
            )}
        </div>
    )
}