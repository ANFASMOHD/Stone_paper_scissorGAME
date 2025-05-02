import React, { useEffect, useState } from 'react'
import "./Game.css"
import stone from '../assets/rock-emoji.png'
import paper from '../assets/paper-emoji.png'
import scirssor from '../assets/scissors-emoji.png'
import Swal from 'sweetalert2'

function Game() {
  const [counter, setCounter] = useState(0)
  const [status, setStatus] = useState(true)
  const [player, setPlayer] = useState()
  const [computer, setComputer] = useState()
  const [playerRes, setPlayerRes] = useState(0)
  const [computerRes, SetComputerres] = useState(0)

  const computerchoice = ["stone", "paper", "scissor"]
  const choiceImages = {
    stone: stone,
    paper: paper,
    scissor: scirssor
  }

  const refreshBut = () => {
    window.location.reload()
  }

  const logic = (player, computer) => {
    if (player === computer) return 0
    if (
      (player === "stone" && computer === "scissor") ||
      (player === "scissor" && computer === "paper") ||
      (player === "paper" && computer === "stone")
    ) {
      return 1
    }
    return -1
  }

  const handleChoice = (choice) => {
    const newCounter = counter + 1
    setCounter(newCounter)

    const random = Math.floor(Math.random() * 3)
    const cc = computerchoice[random]

    setPlayer(choice)
    setComputer(cc)

    const result = logic(choice, cc)
    if (result === 1) setPlayerRes(prev => prev + 1)
    else if (result === -1) SetComputerres(prev => prev + 1)

    if (newCounter === 10) {
      setStatus(false)

      let finalResult = "Match tie"
      if (playerRes > computerRes) finalResult = "You win"
      else if (playerRes < computerRes) finalResult = "Computer wins"

      Swal.fire({
        title: `<h1 style="color:#4CAF50;">🌟 ${finalResult} </h1>
                <h3>Player: ${playerRes}</h3>
                <h3>Computer: ${computerRes}</h3>`,
        imageUrl: "https://i.gifer.com/93Fi.gif",
        imageWidth: 600,
        imageHeight: 250,
        imageAlt: "Cute animation",
        focusConfirm: false,
        confirmButtonText: "Congrats"
      }).then((result) => {
        if (result.isConfirmed) refreshBut()
      })
    }
  }

  useEffect(() => {
    if (counter === 10) setStatus(false)
  }, [counter])

  return (
    <div className='container-fluid'>
      <h3 className='text-center text-white mt-2'>
        Stone <span className='text-warning'>Paper</span> Scissor
      </h3>

      <div className="container d-flex align-items-center justify-content-center">
        {["stone", "paper", "scissor"].map(item => (
          <div className="m-4" key={item}>
            <button
              onClick={() => status && handleChoice(item)}
              className='p-4'
              style={{ border: "2px solid grey", borderRadius: "50%" }}
              disabled={!status}
            >
              <img
                style={{ width: "40px", borderRadius: "30%" }}
                src={choiceImages[item]}
                alt={item}
              />
            </button>
          </div>
        ))}
      </div>

      <hr className='text-white' />
      <div className='text-center text-white'>
        <h3>You Selected:
        {player && (
          <div>
            <img
              src={choiceImages[player]}
              alt={player}
              style={{ width: "40px", borderRadius: "30%" }}
            />
            <h5 className='text-primary mt-2'>{player}</h5>
          </div>
        )}</h3>
      </div>

      <hr className='text-white' />
      <div className='text-center text-white'>
        <h3>Computer Selected:</h3>
        {computer && (
          <div>
            <img
              src={choiceImages[computer]}
              alt={computer}
              style={{ width: "40px", borderRadius: "30%" }}
            />
            <h4 className='text-primary mt-2'>{computer}</h4>
          </div>
        )}
      </div>

      <hr className='text-white' />
      <div className='text-center text-white'>
        <h3>Your Score: <span className='text-primary'>{playerRes}</span></h3>
      </div>

      <hr className='text-white' />
      <div className='text-center text-white'>
        <h3>Computer Score: <span className='text-primary'>{computerRes}</span></h3>
      </div>

      <hr className='text-white' />
      <div className='text-center'>
        <button onClick={refreshBut} className='btn btn-warning w-25'>Restart</button>
      </div>
    </div>
  )
}

export default Game
