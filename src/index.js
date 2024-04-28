import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore ,applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/App';
import rootReducer from './reducers'

// const logger = ({dispatch,getState})=>{

//   return (next)=>{

//     return (action)=>{
//       console.log("Action-Type",action.type) 

//       next(action);
//     }
    
//   }

// }


const logger = ({dispatch,getState})=>(next)=>(action)=>{

  if(typeof action !=='function')
    {
    console.log("Action-Type",action.type) 
    }
      next(action);

}

// const thunk = ({dispatch,getState})=>(next)=>(action)=>{

//   if(typeof action ==='function')
//   {
//     action(dispatch)
//     return;
//   }

//       next(action);

// }


const store=createStore(rootReducer,applyMiddleware(logger,thunk));
// console.log("Store",store);
// console.log("State",store.getState())

// store.dispatch({
//   type:"ADD_MOVIES",
//   movies:[{name:"Superman"}]
// })

// console.log("State",store.getState())

// export const StoreContext=createContext();
// console.log("StoreContext",StoreContext)

// class Provider extends React.Component{

//   render()
//   {
//     const {store}=this.props;
//     return (
//       <StoreContext.Provider value={store}>
//       {this.props.children}
//     </StoreContext.Provider>
//     )
  
//   }
  
// }



// const connectedAppComponent=connect(callback)(App);

// export function connect(callback){
//   return function(Component)
//   {
//      class ConnectedComponent extends React.Component{

//       constructor(props)
//       {
//         super(props)
//         this.unsubscribe=this.props.store.subscribe(()=>{
//           console.log("Updated");
//           this.forceUpdate()
//         })
//       }

//       componentWillUnmount(){
//         this.unsubscribe();
//       }
//       render(){
//         const {store}=this.props;
//         const state=store.getState();
//         const dataToBePassesAsProps =callback(state);

//         return (<Component {...dataToBePassesAsProps} dispatch={store.dispatch}/>)
//       }
//     }

//     class ConnectedComponentWrapper extends React.Component{
//       render(){
//         return <StoreContext.Consumer>
//           {store=><ConnectedComponent store={store}/>}
//         </StoreContext.Consumer>
//       }
//     }

//     return ConnectedComponentWrapper
//   }
// }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <App/>
  </Provider>
   
  
);

