import React from 'react';


const FlickrShow = props => {
  return <div className="Flick-cover">
        <img src={props.url} alt={props.title}/>
  </div>
};

export default FlickrShow;
