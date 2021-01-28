import React from 'react';
import Header from './Header'
import ImageElem from './ImageElem'
import Spinner from './Spinner'
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: false,
      breedList: [],
      breed: '',
      prevY: 0
    }
  }

  filterBy = (breed)  => {
    this.setState({breed: breed, photos: []}, () => {
          this.getPhotos(10);
    })
  }

  getPhotos(batchSize) {
    this.setState({loading: true});
    let url = `https://dog.ceo/api/breed/${this.state.breed}/images/random/${batchSize}`
    fetch(url)
    .then((resp)=> resp.json())
    .then((data) => {
      let filteredData = data.message.filter((item,ind) => !this.state.photos.includes(item))
      this.setState({photos: [...this.state.photos, ...filteredData]})
      this.setState({loading: false})
    })
  }

  intitalSetup() {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then((resp) => resp.json())
    .then((data) => {
      this.setState({breedList: Object.keys(data.message), breed: Object.keys(data.message)[0]})
      this.getPhotos(10)
    })
  }

  componentDidMount() {
    this.intitalSetup()
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };

    this.observer = new IntersectionObserver((entities,observer) => {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
          this.getPhotos(10);
        }
        this.setState({ prevY: y });
    },options);
    this.observer.observe(this.loadingRef);
  }

  render() {
    return (
      <div className="container">
        <Header breedList={this.state.breedList} filterBy={this.filterBy}/>
        <main>
          <div className="wrapper">
            {this.state.photos.map((item, ind) => {
              return(<ImageElem key={ind} src={item}/>)
            })}
            <div className="spinnerContainer" ref={loadingRef => (this.loadingRef = loadingRef)}>
              { this.state.loading ? <Spinner/> : <p></p>}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
