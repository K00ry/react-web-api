import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default class SearchForm extends Component {
  state = {
    searchText: ' ',
  };

  onSearchChange = e => {
    this.setState({
      searchText: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    e.currentTarget.reset();
    this.props.onSearch(this.state.searchText);
  };
  render() {
    return (
      <div className="main-wrapper">
        <form className="lastFm" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>search widget for spotify</legend>
            <label>Artist Search</label>
            <h3>
              <span>bonus: </span>you get up to 9 <b>Flickr</b> related
              picture's to your chosen artist.{' '}
            </h3>
            <div className="input-wrapper">
              <input
                onChange={this.onSearchChange}
                id="flickr-search"
                type="text"
                name="search"
                data-search
              />
              <Button bsSize="small" id="flickr-submit" type="submit">
                <Glyphicon glyph="search" />
              </Button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
