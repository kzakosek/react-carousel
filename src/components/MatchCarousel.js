import React, { useEffect, useState } from 'react'
import Carousel  from 'react-elastic-carousel';
import Card from './Card';
import axios from 'axios'
import imageStart from '../assets/bg-prematch.jpg';
import imageLive from '../assets/bg-live.jpg';
import imageEnd from '../assets/bg-postmatch.jpg';
import germanyFlag from '../assets/germany-flag.png';
import italyFlag from '../assets/italy-flag.png';

export default function MatchCarousel(){

    const [responseData, setResponseData] = useState([]); 
    var cards = []
    var list = [];
    const url = 'https://lmt.fn.sportradar.com/demolmt/en/Etc:UTC/gismo/event_fullfeed/0/1/12074';
    var sport_id = 0; //if set display only matches for particular sport.  Defaults to none
    var max = 10; // maximum no. of matches displayed in carousel. Defaults to 10.
    
    const carouselRef = React.useRef(null);
    const Loop = (nextItem) => {
        if (nextItem.index == list.length - 1) { // we hit the last item, go to first item
          setTimeout(() => {
            carouselRef.current.goTo(0);
          }, 3000); 
        }
      };

    useEffect(() => {
        axios.get(url) 
        .then((response) => {
            setResponseData(response.data.doc[0].data);
          });
    }, [])    
   
 console.log(responseData);
    if(responseData.length > 0){
        for(var i = 0; i < responseData.length; i++){
            var sportCategories = null;

            if(sport_id != 0){
                if(responseData[i]._id == sport_id){
                    sportCategories = responseData[i].realcategories;
                }
            }else{
                sportCategories = responseData[i].realcategories;
            }

            if(sportCategories != null){ 
                for(var sportCategory = 0; sportCategory < sportCategories.length; sportCategory++){
                    var tournaments = sportCategories[sportCategory].tournaments;
                    for(var tournament = 0; tournament < tournaments.length; tournament++){
                        var allMatches = tournaments[tournament].matches;

                        for(var match = 0; match < allMatches.length; match++){
                            if(list.length < max){
                                list.push({
                                    categoryName: sportCategories[sportCategory].name,
                                    tournamentTile : tournaments[tournament].name + "-" + tournaments[tournament].seasontypename,
                                    matchStatus: allMatches[match].status._id,
                                    matchStatusName: allMatches[match].status.name,
                                    teamHomeName: allMatches[match].teams.home.name,
                                    teamAwayName: allMatches[match].teams.away.name,
                                    teamHomeShortName: allMatches[match].teams.home.abbr,
                                    teamAwayShortName: allMatches[match].teams.away.abbr,
                                    teamHomeImage: "http://ls.betradar.com/ls/crest/big/"+allMatches[match].teams.home.uid+".png",
                                    teamAwayImage: "http://ls.betradar.com/ls/crest/big/"+allMatches[match].teams.away.uid+".png",
                                    resultHome: allMatches[match].result.home,
                                    resultAway: allMatches[match].result.away,   
                                    matchDate: allMatches[match]._dt.date,
                                    matchTime: allMatches[match]._dt.date 
                                });
                            }
                        }
                    }
                }
            }
        }
    }
  
    for(var card = 0; card < list.length; card++){
        if(list[card].matchStatus == 0){
            cards.push(
            <Card key={card} backgroundImage={imageStart} title = {list[card].tournamentTile} size="3vh" gameName={list[card].categoryName} 
            matchInfo={list[card].matchStatusName} home={list[card].teamHomeName} away={list[card].teamAwayName} score={"VS\n" + list[card].matchTime+"\n"+list[card].matchDate} 
            homeTeamImage={germanyFlag} awayTeamImage={italyFlag} matchInfoColor={"#474747"}/>
            );
        }else if(list[card].matchStatus == 100){
            cards.push(
            <Card key={card} backgroundImage={imageEnd} title = {list[card].tournamentTile} size="6vh" gameName={list[card].categoryName} 
            matchInfo={list[card].matchStatusName} home={list[card].teamHomeName} away={list[card].teamAwayName} score={list[card].resultHome+":"+list[card].resultAway} 
            homeTeamImage={germanyFlag} awayTeamImage={italyFlag} matchInfoColor={"#05832f"}/>,
            );
        }else{
            cards.push(
            <Card key={card} backgroundImage={imageLive} title = {list[card].tournamentTile} size="6vh" gameName={list[card].categoryName} 
            matchInfo={list[card].matchStatusName} home={list[card].teamHomeName} away={list[card].teamAwayName} score={list[card].resultHome+":"+list[card].resultAway} 
            homeTeamImage={germanyFlag} awayTeamImage={italyFlag} matchInfoColor={"#ff9100"}/>
            );
        }
    }
    if (!responseData || responseData.length === 0) return <p>No response, sorry</p>;
 
    return (
        <div className="App">
            {cards.length > 0 && (
                <Carousel
                    ref={carouselRef}
                    initialActiveIndex={0}
                    enableAutoPlay={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    onChange={Loop}
                    showArrows={false}
                    showStatus={false}
                    showThumbs={false}
                    >

                    {cards}
                </Carousel>
            )}   
        </div>    
    );
}          

/*
 <Carousel 
            ref={carouselRef}
            enableAutoPlay={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            onChange={Loop}
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            >
            {list.slice(0, max).map((item, i) => { 
                if(item.matchStatus == 0){
                    return ( 
                    <Card key={i} backgroundImage={imageStart} title = {item.tournamentTile} size="3vh" gameName={item.categoryName} 
                    matchInfo={item.matchStatusName} home={item.teamHomeName} away={item.teamAwayName} score={"VS\n" + item.matchTime+"\n"+item.matchDate} 
                    homeTeamImage={germanyFlag} awayTeamImage={italyFlag} matchInfoColor={"#474747"}/>
                )}else if(item.matchStatus == 100){ 
                    return (
                    <Card key={i} backgroundImage={imageEnd} title = {item.tournamentTile} size="6vh" gameName={item.categoryName} 
                    matchInfo={item.matchStatusName} home={item.teamHomeName} away={item.teamAwayName} score={item.resultHome+":"+item.resultAway} 
                    homeTeamImage={germanyFlag} awayTeamImage={italyFlag} matchInfoColor={"#05832f"}/>
                )}else{
                    return (
                    <Card key={i} backgroundImage={imageLive} title = {item.tournamentTile} size="6vh" gameName={item.categoryName} 
                    matchInfo={item.matchStatusName} home={item.teamHomeName} away={item.teamAwayName} score={item.resultHome+":"+item.resultAway} 
                    homeTeamImage={germanyFlag} awayTeamImage={italyFlag} matchInfoColor={"#ff9100"}/>
                )}
            })}
            </Carousel>
*/