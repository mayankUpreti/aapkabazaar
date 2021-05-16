import React from 'react'
import {ErrorImageOverlay,ErrorImageContainer,ErrorImageText} from './error-boundary'

class ErrorBoundary extends React.Component{
    constructor(){
        super();
       this.state={
            hasErrored:false
        }
    }

    static getDerivedStateFromError(error){
        //process an error
        return {hasErrored:true}
    }

    componentDidCatch(error,info){
        console.log(error)
    }


    render(){
        if(this.state.hasErrored){
           return(<ErrorImageOverlay>
                  <ErrorImageContainer imageUrl='https://i.imgur.com/qIufhof.png'/>
                    <ErrorImageText>Sorry this page is broken</ErrorImageText>
           </ErrorImageOverlay>
       
         )
        }else{
            return this.props.children
        }
    }

}



export default ErrorBoundary