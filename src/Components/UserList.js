import React from "react";


const UsersList = (props) => {
  return (
    <div>
      <h2>Previous Orders</h2>
      <ul>
        {props.users.map((user) => {
          return <div className="user">{user.name}</div>;
        })}
      </ul>
    </div>
  );
};

export default UsersList;