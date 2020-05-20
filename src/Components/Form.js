import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import UserList from "./UserList";

const formSchema = yup.object().shape({
  name: yup.string().length(2).required("Name is a required field"),
  size: yup.string().required("Please select size"),
  instructions: yup.string("Any Special Instructions?"),
  pepperoni: yup.boolean().oneOf([true], "Please select one"),
  mushroom: yup.boolean().oneOf([true], "Please select one"),
  olive: yup.boolean().oneOf([true], "Please select one"),
  anchovi: yup.boolean().oneOf([true]),
  
});

export default function Form() {
  

  const [formState, setFormState] = useState({
    name: "",
    size: "",
    instructions: "",
    pepperoni: false,
    mushroom: false,
    olive: false,
    anchovi: false

  });

 
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [user, setUser] = useState([]);
  
  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const [errors, setErrors] = useState({
    name: "",
    size: "",
    instructions: "",
    pepperoni: "",
    mushroom: "",
    olive: "",
    anchovi: ""
  });

  const [post, setPost] = useState([]);
  const [users, setUsers] = useState([]);
  const submit = (newOrder) => setUsers(...formState, newOrder);
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

 

  const validateChange = (event) => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [event.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [event.target.name]: err.errors[0]
        })
      })
  };

  const inputChange = (event) => {
    event.persist();
    validateChange(event);
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormState({ ...formState, [event.target.name]: value });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    // console.log("formSubmit", formSubmit);
    axios.post("https://reqres.in/api/users",  formState)
    .then(response => {
        setUser([...user, response.data]);
        setFormState({
        name: "",
        size: "",
        instructions: "",
        pepperoni: false,
        mushroom: false,
        olive: false,
        anchovi: false
        })
      })

      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        Name:
        <br />
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange}
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>
      <br />

      <label htmlFor="size">
        Size:
        <br />
        <select
          value={formState.size}
          id="size"
          name="size"
          onChange={inputChange}
        >
          <option value="regular">Regular</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="xl">Extra Large</option>
        </select>
      </label>
      <br />

      <label htmlFor="instructions">
        Special Instructions:
        <br />
        <textarea
          name="instructions"
          placeHolder="Anything we should know of?"
          value={formState.instructions}
          onChange={inputChange}
        />
        {errors.instructions.length > 0 ? (
          <p className="error">{errors.instructions}</p>
        ) : null}
      </label>
      <br />
      <p>Choose your toppings:</p> 
      <label htmlFor="pepperoni">
        pepperonis
        <input
          type="checkbox"
          name="pepperoni"
          checked={formState.terms}
          onChange={inputChange}
        />
      </label>
      <br />
      <label htmlFor="mushroom">
        mushrooms
        <input
          type="checkbox"
          name="mushroom"
          checked={formState.terms}
          onChange={inputChange}
        />
      </label>
      <br />
      <label htmlFor="olive">
        olives
        <input
          type="checkbox"
          name="olive"
          checked={formState.terms}
          onChange={inputChange}
        />
      </label>
      <br />
      <label htmlFor="anchovi">
        anchovis
        <input
          type="checkbox"
          name="anchovi"
          checked={formState.terms}
          onChange={inputChange}
        />
      </label>
      <br />
      <button type="submit">Add to Order</button>
      
      <UserList user={user} />
    </form>
  );
}