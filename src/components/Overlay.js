import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal, Glyphicon } from 'react-bootstrap';
import FlickrShow from './FlickrShow';

// import TagsGenres from './Tags';




export default class Overlay extends Component {



  render() {
      const Background = styled.div`
      display:flex;
      flex-direction:row;
      justify-content: space-between;
      width:100%;
      align-items:center;
     height: 100%;
     background: url('${this.props.dataInfo.coverSrc}');
     background-repeat: no-repeat;
    background-position: center;
    background-size:cover;
    &:before{
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    }
    
    `;
    let ghaderi = this.props.data.map((info, index) => {
      return (
        <FlickrShow
          key={index}
          url={`https://farm${info.farm}.staticflickr.com/${info.server}/${
            info.id
          }_${info.secret}_q.jpg`}
          title={info.title}
        />
      );
    });
    // let tagsList = this.props.tags.forEach((tag,index) => {
    //     return (
    //         <TagsGenres
    //             key={index}
    //             tags={tag.name}
    //         />
    //     );
    // });

    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        {/*<div id="overlay" className="overlay">*/}
            <Background>
          <span
            className="left-arrow"
            onClick={() => this.props.onNext_Prev('left')}
          >
            <Glyphicon glyph="menu-left" />
          </span>
          <div className="overlay-content">
            <Modal.Header closeButton />
              <div className="flickr-div">
                  <h2 id="flickr-h">
                      <span className="big-title">{this.props.dataInfo.CoverAlt}</span>
                  </h2>
              </div>



            <div className="last-fm-info">
                <div className="genres-bar">
                    <h3>Genres</h3>
                    <ul className="genres">{this.props.tags}</ul>
                </div>
              <img
                src={this.props.dataInfo.coverSrc}
                alt={this.props.dataInfo.CoverAlt}
              />
              <p>{this.props.dataInfo.content}</p>

            </div>
              <div className="flickr-div">
                  <h2 id="flickr-h">
                      <span className="big-flickr">Flickr</span> results.
                  </h2>
              </div>
              <div className="content-holder">{ghaderi}</div>
          </div>
          <span
            className="right-arrow"
            onClick={() => this.props.onNext_Prev('right')}>
              <Glyphicon glyph="menu-right" />
          </span>
            </Background>
        {/*</div>*/}
      </Modal>
    );
  }
}

// export default Overlay;
