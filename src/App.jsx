import {useState, useEffect} from 'react'
import './App.css'


const options = {
  method: 'GET',
  
  headers: {
    'Accept' : 'application/json'
  }
}

export default function App() {
  const [items,setItems] = useState([]);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    fetch('https://valorant-api.com/v1/playercards', options)
    .then((response) => response.json())
    .then((json) => {setItems(json.data); setHasData(true); console.log(json)})
  },[]);

  if(!hasData) {
    return(
      <div>
        <h1 className="processing-data">Loading....</h1>
      </div> 
    );
  }

  return(
    <div>
      <h1 className="title">Valorant Player Cards</h1>
      <div className="container">
      {items.map((item) => (
        <ul key={item.uuid}>
          <li>
            <img className="player-id" src={item.largeArt}></img>
            <p className="display-name">{item.displayName}</p>
            <img className="wide-banner" src={item.wideArt}></img>
          </li>
          <img className="desc" src={item.displayIcon}></img>
        </ul>
      ))}
    </div>
    </div>
  );
}