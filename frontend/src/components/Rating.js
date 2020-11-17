import React from 'react';
import PropTypes from 'prop-types'

// PropTypes are basically type checking - to verify correct data types
// Prop types are a great way to validate the data types
// which will check props passed to your components against those definitions,
// and warn in development if they don’t match.
// It's also great way to document a component
const Rating = ({ value, text, color }) => {

  const style = { color: color}

  return (
    <div className='rating'>
      <span>
        <i // first star 
          style={style}
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
          style={style}
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
          style={style}
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
          style={style}
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
          style={style}
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

// To run typechecking on the props for a component, you can assign the special propTypes property
// PropTypes exports a range of validators that can be used to make sure the data you receive is valid.
Rating.propTypes = { // giving a propTypes object to our component
  value: PropTypes.number.isRequired, // isRequired - must provide
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

// component default props
Rating.defaultProps = {
  color: '#E9B44C'
}

export default Rating;
