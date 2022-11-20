import axios from 'axios';
import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
  
    this.state = {
      animeChars: [],
      searchField: '',
    };
    console.log('constructor');
  }

  componentDidMount() {
    console.log('componentDidMount');
    axios.get('https://raw.githubusercontent.com/Savvytar/anime-characters-rolodex/main/.mockend.json')
      .then((users) => 
        this.setState(
          () => {
            return { animeChars: users};
          },
          () => {
            console.log(this.state);
          }
        )
      );
  }

  onSearchChange= (event) => {
    console.log(event.target.value);
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return {searchField};
    }); 
  }

  render() {
    console.log('render');

    const {animeChars, searchField} = this.state;
    const {onSearchChange} = this;
    const filteredAnimeChars = animeChars.filter((animeChar) => {
      return animeChar.name.toLocaleLowerCase().includes(searchField);
    });

    return (
    <div className="App">
      <input
        className='search-box'
        type='search'
        placeholder='Search anime characters'
        onChange={onSearchChange}
      />
      {filteredAnimeChars.map((animeChars) => {
          return (
            <div key={animeChars.id}>
              <h1>{animeChars.name}</h1>
            </div>
            );
        })}                  
    </div>
  );
}
}

export default App;
