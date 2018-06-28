import React from 'react';
import Covers from './Covers'


const Gallery = props => {

    const results = props.data;
    let covers =  results.map((cover,index) =>
        <Covers Show={()=>props.overlayShow(cover.name,index)}
                key={index}
                url={cover.image[3]["#text"]}
                alt={cover.name}
                text={cover.name}/>);

    return (
        <ul className="gallery">
            {covers}
        </ul>
    );
};

export default Gallery;