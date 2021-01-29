import React,{useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from "../UI/LoadingIndicator";

const IngredientForm = React.memo(props => {

  const [InputState,SetInputState] = useState({
    // id:'',
    title:'',
    amount:''
  })

  const formHandeler = (event) =>{
    
    let value = event.target.value;
    value = value.trim();

    if(value){

      const id = event.target.id;
      // const key = Math.random().toString();

      if(id == 'title'){

        SetInputState((PrevInputState) => {

          let InputStateUpdate = {...PrevInputState};

          // InputStateUpdate.id = key;
          InputStateUpdate.title = value;

          return(InputStateUpdate);

        });

      }
      else if(id == 'amount'){

        SetInputState((PrevInputState) => {

          let InputStateUpdate = {...PrevInputState};

          // InputStateUpdate.id = key;
          InputStateUpdate.amount = value;

          return(InputStateUpdate);

        });

      }
      else{

        alert('invalid input');

      }

    }
    else{
      
      const id = event.target.id;

      let InputStateUpdate = {...InputState};

      if(id == 'title'){

        SetInputState((PrevInputState) => {

          let InputStateUpdate = {...PrevInputState};

          // InputStateUpdate.id = '';
          InputStateUpdate.title = '';

          return(InputStateUpdate);

        });

      }
      else if(id == 'amount'){

        SetInputState((PrevInputState) => {

          let InputStateUpdate = {...PrevInputState};

          // InputStateUpdate.id = '';
          InputStateUpdate.amount = '';

          return(InputStateUpdate);

        });

      }
      else{

        alert('invalid input');

      }

    }
  }

  const submitHandler = event => {
    event.preventDefault();

    if(InputState.title && InputState.amount){

      props.submit(InputState);

    }
    else{
      
      alert('Fill the form');

    }

  };


  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={InputState.title} onChange={event => formHandeler(event)} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={InputState.amount} onChange={event => formHandeler(event)} />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit" onClick={submitHandler}>Add Ingredient</button>
            <LoadingIndicator loading={props.loading}/>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
