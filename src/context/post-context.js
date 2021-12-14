import React, {useState} from 'react';

const PostContext = React.createContext({
    posts: [],
    initializePosts: () => {},    
});

//create context provider to wrap around app
export const PostContextProvider = (props) => {
    //define plants using the use state hook
    const [posts, setPosts] = useState([]);

    //initialize the plants from the api
    const initializePosts = (postsFromApi) => {
        //set plants to the plants from the api
        setPosts(postsFromApi);
    }
    
    //return the plant context provider with the plants and initialize plants function
    return (<PostContext.Provider
     value={{posts: posts, initializePosts: initializePosts}}
    >
        {props.children}
    </PostContext.Provider>)

} 

export default PostContext;