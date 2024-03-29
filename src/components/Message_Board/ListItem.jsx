import React from "react";

export default function ListItem(props) {
  const { listItem /*, onDeleteListItem*/ } = props;
  var tm = new Date(listItem.time);
  return (
    <div className="col-12 mb-3 border">
      <div className="row">
        <div className="col-11">
          <p className="mt-3"><b>From:</b> {listItem.author}</p>
        </div>
        <div className="col-11">
          <p className="mt-3"><b>Time:</b> {tm.toString()} </p>
        </div>
        <div className="col-11">
          <p className="mt-3">{listItem.text}</p>
        </div>
      {/*  
        <div className="col-1">
          <button
            type="button"
            className="close py-2"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => onDeleteListItem(listItem)}
          >
            <div aria-hidden="true">&times;</div>
          </button>
        </div>
      */}  
      </div>
    </div>
  );
}
