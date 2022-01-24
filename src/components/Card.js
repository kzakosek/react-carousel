import React  from 'react'
import "../components/Card.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Card({backgroundImage, title, size, gameName, matchInfo, matchInfoColor, home, away, score, homeTeamImage , awayTeamImage}) {
    return (
        <div className="container" style={{background: "linear-gradient(0deg, rgba(0, 0, 0, 0.5),  rgba(0, 0, 0, 0.5)), url("+backgroundImage+")"}}>
            <div className="row">
                <div className="col"> 
                    <h1 className="match_title">{title}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h2 className="match_location">{gameName}</h2> 
                </div>
            </div>
            <div className="row" id="details"> 
                <div className="col">
                    <div className="text-center">
                        <img src={homeTeamImage} className="team_logo" alt="FLAG"/>
                        <h3 className="team_name">{home}</h3>
                    </div>
                </div>
                <div className="col">
                    <p className="score" style={{fontSize: size}}>{score}</p>
                </div>
                <div className="col"> 
                    <div className="text-center">
                        <img src={awayTeamImage} className="team_logo" alt="FLAG"/>
                        <h3 className="team_name">{away}</h3>
                    </div>
                </div> 
            </div>
            <div className="row justify-content-center" id="info"> 
                <div className="col">
                    <div className="text-center">
                        <p><span className="halftime" style={{backgroundColor: matchInfoColor, borderColor: matchInfoColor}}>{matchInfo}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}