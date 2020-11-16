import React from 'react';

const Rating = ({ value, text }) => {
  return (
    <div className='rating'>
      <span>
        <i // first star 
          className={
            value >= 1 // if 
              ? 'fas fa-star' // show full star
              : value >= 0.5 // else if 
              ? 'fas fa-star-half-alt' // show half star
              : 'far fa-star' // else - show empty star
          }
        ></i>
      </span>
      <span>
        <i // second star 
          className={
            value >= 2 
              ? 'fas fa-star' 
              : value >= 1.5  
              ? 'fas fa-star-half-alt' 
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i // third star 
          className={
            value >= 3
              ? 'fas fa-star' 
              : value >= 2.5  
              ? 'fas fa-star-half-alt' 
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i // four star 
          className={
            value >= 4 
              ? 'fas fa-star' 
              : value >= 3.5  
              ? 'fas fa-star-half-alt' 
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i // fifth star
          className={
            value >= 5
              ? 'fas fa-star' 
              : value >= 4.5  
              ? 'fas fa-star-half-alt' 
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>{ text && text }</span>
    </div>
  );
};

export default Rating;
