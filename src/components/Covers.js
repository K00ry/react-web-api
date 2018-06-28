import React from 'react';


const Covers = props => {

    return (
        <li className='covers'
            onClick={props.Show}>
            <img src={props.url} alt={props.alt}/>
            <span className="cover-span">{props.alt}</span>
        </li>

    );


};

export default Covers;