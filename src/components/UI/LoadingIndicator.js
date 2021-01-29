import React from 'react';

import './LoadingIndicator.css';

const LoadingIndicator = (props) => {

  if(props.loading){

    
    return(<div className="lds-ring">
    <div />
    <div />
    <div />
    <div />
    </div>);
    
  }
  else{

    return null;

  }
  
}

  

;

export default LoadingIndicator;
