import React, { Component } from 'react';
import axios from 'axios';
import SearchForm from './components/SearchForm';
import Gallery from './components/Gallery';
import Overlay from './components/Overlay';
const lastfmApiKey = process.env.REACT_APP_Last_key;
const flickrApiKey = process.env.REACT_APP_Flick_key;

export default class App extends Component {
  state = {
    show: false,
    retrieved: [],
    retrievedFlickr: [],
    retrievedInfo: [],
    rightIndex: 0,
    noResults: false,
  };

  submitClicked = query => {
    axios
      .get(
        `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${query}&api_key=${lastfmApiKey}&format=json&limit=10`,
      )

      .then(response => {
        let dataArr = response.data.results.artistmatches.artist;
        let filtered = dataArr.filter(arr => arr.image[4]['#text'] !== '');

        this.setState({
          retrieved: filtered,
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  };

  handleShow = (artist, index) => {
    this.setState({
      show: true,
      rightIndex: index,
    });

    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrApiKey}&tags=${artist}&per_page=4&format=json&nojsoncallback=1`,
      )
      .then(response => {
        let dataArray = response.data.photos.photo;
        // let cantFind;
        if (dataArray.length === 0) {
          this.setState({
            retrievedFlickr: dataArray,
            noResults: true,
          });
        }

        this.setState({
          retrievedFlickr: dataArray,
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });

    ///////////////////////////////////////////
    axios
      .get(
        `https://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=${artist}&api_key=${lastfmApiKey}&format=json&limit=10`,
      )

      .then(response => {
        console.log(response.data.artist);
        let jaber = {};
        let dataArr = response.data.artist;
        jaber.coverSrc = dataArr.image[4]['#text'];
        jaber.CoverAlt = dataArr.name;
        jaber.content = dataArr.bio.content.slice(0, 300);
        jaber.tagArr = dataArr.tags.tag.map((kos, index) => {
          return (
            <li className="genres-tags" key={index}>
              {kos.name}
            </li>
          );
        });

        // console.log(jaber);
        this.setState({
          retrievedInfo: jaber,
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  };

  clickFlick = arrow => {
    if (arrow === 'right') {
      let rightCover = this.state.rightIndex + 1;

      if (rightCover === this.state.retrieved.length) {
        rightCover = 0;
      }
      let rightName = this.state.retrieved[rightCover].name;
      this.handleShow(rightName, rightCover);
    } else {
      let rightCover = this.state.rightIndex - 1;
      if (rightCover === -1) {
        rightCover = this.state.retrieved.length - 1;
      }
      let rightName = this.state.retrieved[rightCover].name;
      this.handleShow(rightName, rightCover);
    }
  };

  handleClose = () => {
    this.setState({
      show: false,
      rightIndex: 0,
      retrievedFlickr: [],
      retrievedInfo: [],
      noResults: false,
    });
  };

  render() {
    return (
      <div className="root-wrapper">
        <SearchForm onSearch={this.submitClicked} />
        <Gallery data={this.state.retrieved} overlayShow={this.handleShow} />

        <Overlay
          data={this.state.retrievedFlickr}
          dataInfo={this.state.retrievedInfo}
          tags={this.state.retrievedInfo.tagArr}
          show={this.state.show}
          onHide={this.handleClose}
          onNext_Prev={this.clickFlick}
          noResults={this.state.noResults}
        />
      </div>
    );
  }
}
