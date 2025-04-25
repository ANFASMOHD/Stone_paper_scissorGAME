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
    const [computer, setComputer] = useState();
    const [playerRes, setPlayerRes] = useState(0);
    const [computerRes, SetComputerres] = useState(0);


    const computerchoice = ["stone", "paper", "scissor"];

    const refreshBUt=()=>{
        window.location.reload()
      }

    const logic = (player, computer) => {
        if (player === computer) { 

            return 0;

        } else if (
            player == "stone" && computer == "scissor" ||
            player == "scissor" && computer == "paper" ||
            player == "paper" && computer == "stone"

        ) {
            return 1;
        } else 
        return -1
    }

    var handleChoice = (choice) => {

        const  newCounter=counter + 1
        setCounter(newCounter);



        if(newCounter === 5){

            let finalresult = "" ;

            if(playerRes===computerRes){

                finalresult="Match tie";

            }
            else if (playerRes > computerRes){

                finalresult  = "You win "

            } 
            else 
            {
                finalresult = "Computer Win"
            }
            
            

            Swal.fire({
                title:`<h1 style="color:#4CAF50;">🌟 ${finalresult} </h1>
             <h3>PlayerResult : ${playerRes}</h3>
             <h3> ComputerResult :${computerRes} </h3>`,

                imageUrl:"https://i.gifer.com/93Fi.gif",
                
                imageWidth:600,
                imageHeight:250 ,
                imageAlt:"Cute animation ",
                focusConfirm:false,
               confirmButtonText:"Congrats" 
                

            }).then((result)=>{
                console.log(result);
                
                if (result.isConfirmed) {
                    // Call your custom function here
                   refreshBUt();
 
                }
            })
            
            setPlayer("");
            setComputer("")
            setPlayerRes(0)
            SetComputerres(0)
            


        }else{

            const random = Math.floor(Math.random() * 3);
            const cc = computerchoice[random];
    
            // Set state
            setPlayer(choice);
            setComputer(cc);
    
            // Use local values, not state
            const result = logic(choice, cc);
    
            if (result === 1) {
                setPlayerRes(prev => prev + 1);
            } else if (result === -1) {
                SetComputerres(prev => prev + 1);
            }
            setCounter(counter + 1);

        }
    }
    useEffect(() => {

        if (counter === 5) {
            setStatus(false);
          

        }

    }, [counter])

   





    return (
        <div className='container-fluid ' >

            <h3 className='text-center text-white mt-5'> Stone  <span className='text-warning'>Paper</span>   Scissor</h3>

            <div className="container d-flex align-items-center justify-content-center">
                <div className="m-4">

                    <button
                        onClick={() => status && handleChoice("stone")}
                        className='p-4'
                        style={{ border: "2px solid grey", borderRadius: "50%" }}
                        disabled={!status}
                    >  <img style={{ width: "100px", borderRadius: "50%" }} src={stone} alt="" /></button>

                </div>
                <div className="m-4">

                    <button onClick={() => status && handleChoice("paper")} className='p-4' style={{ border: "2px solid grey", borderRadius: "50%" }}
                        disabled={!status} >  <img style={{ width: "100px", borderRadius: "50%" }} src={paper} alt="" /></button>

                </div>
                <div className="m-4">

                    <button onClick={() => status && handleChoice("scissor")} className='p-4' style={{ border: "2px solid grey", borderRadius: "50%" }}
                        disabled={!status} >  <img style={{ width: "100px", borderRadius: "50%" }} src={scirssor} alt="" /></button>

                </div>


            </div>


            <div className='text-center'>  <h3 className='text-white'>You Selected : <span className='text-primary'>{player}</span> </h3></div>

            <hr className='text-white' />
            <div className='text-center'>  <h3 className='text-white'>Computer Selected :   <span className='text-primary'>{computer}</span> </h3></div>
            <hr className='text-white' />
            <div className='text-center'>  <h3 className='text-white'>You Score : <span className='text-primary'>{playerRes}</span> </h3></div>
            <hr className='text-white' />
            <div className='text-center'>  <h3 className='text-white'>Computer Score  : <span className='text-primary'>{computerRes}</span> </h3></div>
            <hr className='text-white' />
           <div className='text-center'> <button onClick={()=>refreshBUt()} className='btn btn-warning w-25'>Restart</button></div>

        </div>
    )
}

export default Game