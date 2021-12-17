import "./styles.css";
import {useEffect, useState, useContext} from 'react';
import {Post} from '../../post';
import PostContext from "../../../context/post-context";

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useHistory } from "react-router-dom";


export const HomePage = () => {

  //use the use state hook to define the plants state
  const [posts, setPosts] = useState([]);
  //use the use state hook to define the loading state
  const [loading, setLoading] = useState(true);

  //use the use context hook to define the globate state using custom context
  const globalState = useContext(PostContext);


  const history = useHistory();

    //check if user is logged in
    useEffect(
      () => {
        
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (!user) {
            history.push('/login');
          }
        })
      }, []
    );

  //use the use effect hook to perform the get plant function
  useEffect(
    () => {

      getPosts();
    }, []
  );

  //defining the function to get plants from api
  const getPosts = async() => {
    try {
      //fetch data from firebase api
      const response = await fetch('https://firestore.googleapis.com/v1/projects/itec4012-final/databases/(default)/documents/posts/')
      const data = await response.json();
      //map through api to get plant data
      const formattedData = data.documents.map((item) => {
        return item.fields
      });

      //set the plants to the formatted data from the api
      setPosts(formattedData); 
      //pass the formatted data to the intialize plants function in the global context
      globalState.initializePosts(formattedData); 
      //set loading to false
      setLoading(false);  
    } catch (err) {
      //log error if fetching from api does not work
      console.log (err);
      //set loading to false
      setLoading(false);
    }
  }

  //return page with item cards for each plant in api
  return (
    <div className="home-page">
      <h1 className="home-title">All Posts</h1>
      <div className="posts-container">
        {
          //map through plants and create an item card for each
          posts.map((post) => (
            <Post
              //pass the component data from the api as props
              key={post.id.stringValue}
              username={post.username.stringValue} 
              title={post.title.stringValue}
              time={post.time.stringValue}
              servings={post.servings.stringValue}
              text={post.text.stringValue} 
              image={post.image.stringValue}>
            </Post>
          ))
        }
        {
          //define the loading state
          loading && <div class="loader"></div>
        }
      </div>
    </div>
  );
};
