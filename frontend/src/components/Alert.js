import React from "react";

function Alert(props) {
  let capitaliseFirst = (word) => {
    if(word==="danger"){
      word = "error"; 
    }
    word = word.toLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <div style={{height: '60px'}}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          {capitaliseFirst(props.alert.type)} : {props.alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
