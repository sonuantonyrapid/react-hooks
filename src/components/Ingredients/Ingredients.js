import React,{useState,useReducer,useEffect,useCallback} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from "../UI/ErrorModal";

import useHttp from "../../hooks/http";

const ingredientReducer = (currentingredients,action) =>{

  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentingredients,{...action.ingredient,id:action.id}];
    case 'DELETE':

      const updatedIngredients = currentingredients.filter(item=>{

        return item.id != action.ingredientId;

      });

      return updatedIngredients;

    default:
      throw new Error('Invaild request!');
  }

};

// const httpReducer = (currentHttpState,action)=>{

//   switch (action.type) {
//     case 'SEND':
//       return {...currentHttpState,isLoading:true,error:null};
//     case 'RESPONSE':
//       return {...currentHttpState,isLoading:false,error:null};
//     case 'ERROR':
//       return {...currentHttpState,isLoading:false,error:action.error};
//     case 'CLEAR':
//       return {...currentHttpState,isLoading:false,error:null};
//     default:
//       throw new Error('Invaild request!');
//   }

// };

function Ingredients() {

  const [ingredientsState,dispatch] = useReducer(ingredientReducer,[]);

  const {isLoading,error,httpData,sendRequest} = useHttp();

  // const [httpState,dispatchHttp] = useReducer(httpReducer,{isLoading:false,error:null});

  // const [ingredientsState, setIngredientsState] = useState([]);
  // const [isLoading,setIsLoading] = useState(false);
  // const [error,setError] = useState();

  // useEffect(()=>{
  //   fetch('https://react-ff178-default-rtdb.firebaseio.com/ingredients.json').then(response=>{

  //     return response.json();

  //   }).then(responseData=>{

  //     const fetchData = [];

  //     for(const key in responseData){

  //       fetchData.push({
  //         id: key,
  //         title: responseData[key].title,
  //         amount: responseData[key].amount
  //       });

  //     }

  //     setIngredientsState(fetchData);

  //   });
  // },[]);

  const addIngredientsHandeler = useCallback((ingredient)=>{
    
    sendRequest('https://react-ff178-default-rtdb.firebaseio.com/ingredients.json','POST',JSON.stringify(ingredient)).then((reponse) => {

      const action = {
        type:'ADD',
        id:reponse.name,
        ingredient:ingredient
      };

      dispatch(action);

    });

    // // setIsLoading(true);
    // const httpAction = {
    //   type:'SEND'
    // }

    // dispatchHttp(httpAction);
    
    // fetch('https://react-ff178-default-rtdb.firebaseio.com/ingredients.json',{
    //   method: 'POST',
    //   body: JSON.stringify(ingredient),
    //   headers: {'Content-Type':'application/json'}
    // }).then(response=>{

    //   // setIsLoading(false);
    //   const httpAction = {
    //     type:'RESPONSE'
    //   }
      
    //   dispatchHttp(httpAction);

    //   return response.json();
      
    // }).then(responseData=>{

    //   const action = {
    //     type:'ADD',
    //     id:responseData.name,
    //     ingredient:ingredient
    //   };

    //   dispatch(action);

    //   // setIngredientsState((prevIngredientsState)=>{

    //   //   const updateIngredientsState = [...prevIngredientsState,{...ingredient,id:responseData.name}];
  
    //   //   return updateIngredientsState;
  
    //   // });

    // });

   

  },[]);

  const filteredIngredientsHandler = useCallback((ingredients)=>{

    // setIngredientsState(ingredients);
    const action = {
      type:'SET',
      ingredients:ingredients
    }

    dispatch(action);

  },[]);

  const onRemoveItemHandler = useCallback((ingredientId)=>{

    sendRequest(
      `https://react-ff178-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      'DELETE'
    ).then(response=>{

      const action = {
        type:'DELETE',
        ingredientId:ingredientId
      };

      dispatch(action);

    });

    // setIsLoading(true);

    // const httpAction = {
    //   type:'SEND'
    // }
    
    // dispatchHttp(httpAction);

    // fetch(`https://react-ff178-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,{
    //   method: 'DELETE'
    // }).then(response=>{

    //   // setIsLoading(false);

    //   const httpAction = {
    //     type:'RESPONSE'
    //   }
      
    //   dispatchHttp(httpAction);

    //   const action = {
    //     type:'DELETE',
    //     ingredientId:ingredientId
    //   };

    //   dispatch(action);

    //   // setIngredientsState(prevState=>{

    //   //   const updatedIngredients = prevState.filter(item=>{

    //   //     return item.id != ingredientId;

    //   //   });

    //   //   return updatedIngredients;

    //   // });

      

    // }).catch(error=>{

    //   const httpAction = {
    //     type:'ERROR',
    //     error: 'Something went wrong! '+error.message
    //   }
      
    //   dispatchHttp(httpAction);

    //   // setError('Something went wrong! '+error.message);
    //   // setIsLoading(false);

    // });

  },[sendRequest]);

  const clearhandler = useCallback(()=>{
    // setError(null);
    const httpAction = {
      type:'CLEAR'
    }
    
    dispatchHttp(httpAction);
    
  },[]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearhandler}>{error}</ErrorModal>}
      <IngredientForm submit={addIngredientsHandeler} loading={isLoading}/>

      <section>
        <Search filteredIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredientsState} onRemoveItem={onRemoveItemHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
