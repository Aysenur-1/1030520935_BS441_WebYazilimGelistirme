import React, { Component } from "react";
import "./Game.css";
import happyFace from './picture/happy.jpeg';
import sadFace from './picture/sad.jpeg';
import tieImage from './picture/tie.jpeg';
import rockImage from './picture/rock.png';
import paperImage from './picture/paper.png';
import scissorsImage from './picture/scisso.png';

class Game extends Component {
  state = {
    playerVal: null,
    computerVal: null,
    playerScore: 0,
    compScore: 0,
    buttonImages: {
      ROCK: rockImage,
      PAPER: paperImage,
      SCISSORS: scissorsImage,
    },
  };

  choices = ["ROCK", "PAPER", "SCISSORS"];

  logic = (playerVal, computerVal) => {
    if (playerVal === computerVal) return 0;
    if (
      (playerVal === "ROCK" && computerVal === "SCISSORS") ||
      (playerVal === "SCISSORS" && computerVal === "PAPER") ||
      (playerVal === "PAPER" && computerVal === "ROCK")
    ) {
      return 1;
    }
    return -1;
  };

  makeDecision = (playerChoice) => {
    const compChoice =
      this.choices[Math.floor(Math.random() * this.choices.length)];
    const result = this.logic(playerChoice, compChoice);

    this.setState((prevState) => ({
      playerVal: playerChoice,
      computerVal: compChoice,
      playerScore: prevState.playerScore + (result === 1 ? 1 : 0),
      compScore: prevState.compScore + (result === -1 ? 1 : 0),
    }));
  };

  render() {
    const { playerVal, computerVal, playerScore, compScore, buttonImages } = this.state;
    const message =
      playerScore > compScore
        ? "Tebrikler, kazandınız!!"
        : playerScore < compScore
        ? "Üzgünüm, kaybettiniz :("
        : playerScore === compScore
        ? "Berabere!"
        : "";

    const buttonContainerStyle = {
      display: "flex",
      justifyContent: "center",
    };

    const buttonStyle = {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      margin: "0 0.5cm",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: 'relative',
    };

    const imageStyle = {
      width: "60px", 
      height: "60px", 
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };

    const congratsStyle = {
      textAlign: "center",
    };

    const welcomeStyle = {
      textAlign: "center",
    };

    return (
      <div className="container">
        <h1 style={welcomeStyle}>Taş - Kağıt - Makas</h1>
        <div style={buttonContainerStyle}>
          {this.choices.map((choice) => (
            <button
              key={choice}
              onClick={() => this.makeDecision(choice)}
              style={buttonStyle}
            >
              <img
                src={buttonImages[choice]}
                alt={choice}
                style={imageStyle}
              />
            </button>
          ))}
        </div>
        <div className="content">
          {playerVal && (
            <p>Sen: 
              <img
                src={buttonImages[playerVal]}
                alt={playerVal}
                style={{ width: "30px", height: "30px", marginLeft: "5px" }}
              />
            </p>
          )}
          {computerVal && (
            <p>Bilgisayar: 
              <img
                src={buttonImages[computerVal]}
                alt={computerVal}
                style={{ width: "30px", height: "30px", marginLeft: "5px" }}
              />
            </p>
          )}
         
          <h2>Senin Skorun: {playerScore}</h2>
          <h2>Bilgisayarın Skoru: {compScore}</h2>
          <h2 style={congratsStyle}>{message}</h2>
          {playerScore > compScore && (
            <img
              src={happyFace}
              alt=""
              style={{ ...imageStyle, position: 'absolute', top: '65%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />
          )}
          {playerScore < compScore && (
            <img
              src={sadFace}
              alt=""
              style={{ ...imageStyle, position: 'absolute', top: '65%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />
          )}
          {playerScore === compScore && (
            <img
              src={tieImage}
              alt=""
              style={{ ...imageStyle, position: 'absolute', top: '65%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Game;