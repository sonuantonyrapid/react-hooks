import React, {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const [enteredFilter,setEnteredFilter] = useState('');
  const {filteredIngredients} = props;
  const inputRef = useRef();

  useEffect(()=>{

    const timer = setTimeout(() => {

      if(enteredFilter === inputRef.current.value){

        const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;

        fetch('https://react-ff178-default-rtdb.firebaseio.com/ingredients.json'+query).then(response=>{
    
          return response.json();
    
        }).then(responseData=>{
    
          const fetchData = [];
    
          for(const key in responseData){
    
            fetchData.push({
              id: key,
              title: responseData[key].title,
              amount: responseData[key].amount
            });
    
          }
    
          filteredIngredients(fetchData);
    
        });


      }

      
    }, 500);

    return ()=>{

      clearTimeout(timer);

    };

 
  },[enteredFilter,filteredIngredients,inputRef]);

  const searchHandler = (event)=>{

    let value = event.target.value;
    value = value.trim();

    setEnteredFilter(value);


  };


  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" value={enteredFilter} onChange={event=>{searchHandler(event)}} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
