import "./styles.css";
import {useEffect, useState, useContext} from 'react';
import {Post} from '../../post';
import PostContext from "../../../context/post-context";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Navbar } from "../../navbar";

export const ProfilePage = () => {

  //use the use state hook to define the user's email
  const [email, setEmail] = useState();
  //use the use state hook to define the random id
  const [rand, setRand] = useState();
  //use the use state hook to define the posts state
  const [posts, setPosts] = useState([]);
  //use the use state hook to define the filtered posts
  const [filteredPosts, setFilteredPosts] = useState([]);
  //use the use state hook to define the loading state
  const [loading, setLoading] = useState(true);

  //use the use context hook to define the globate state using custom context
  const globalState = useContext(PostContext);

  //use the user form hook to define the register value
  const {register, handleSubmit} = useForm();

  //use the use history hook to define the history
  const history = useHistory();
  
  //check if user is logged in
  useEffect(
    () => {
      //get authentication 
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        //check is user is logged in
        if (!user) {
          //if the user is not logged in, navigate them to login page
          history.push('/login');
        }

        else {
          //if the user is logged in, get their email
          setEmail(user.email);
        }
      })
    }, []
  );

  //define functionality for submitting a post to firebase 
  const submitPost = async (formVals) => {
    //create random number to set as post id
    setRand(Math.floor(Math.random() * 500))

    //define formatted data to be sent to the database 
    const formattedData = {
        fields: {
            id: {
              //set id as random number
              stringValue: String(rand)
            },
            username: {
              //set email as currently signed in user's email
              stringValue: email
            },
            title: {
              //set title from user input
              stringValue: formVals.title
            },
            time: {
              //set time from user input
              stringValue: formVals.time
            },
            servings: {
              //set servings from user input
              stringValue: formVals.servings
            },
            text: {
              //set text from user input
              stringValue: formVals.text
            },
            image: {
              //set image from user input
              stringValue: formVals.image
          },
        }
    }

    console.log(formVals, formattedData);
    //try to send formatted data to database
    try {
      //fetch firebase api
      const response = await fetch('https://firestore.googleapis.com/v1/projects/itec4012-final/databases/(default)/documents/posts/',
      //use HTTP post request to submit values to api
      {
          headers: {
              'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(formattedData)
      });
      //push user to home page
      history.push('/');
      //display error if submit failed
      } catch (error) {
          console.log("Error", error);
      }
  };

  //use the use effect hook to perform the get post function
  useEffect(
    () => {
      getPosts();
    }, []
  );

  //user the user effect hook to filter through posts
  useEffect(
    () => {
      //call handle filtered by user function
      handleFilterByUser();
    }, [email, posts]
  );

  //define functionality for handle filter by user function
  const handleFilterByUser = () => {
    //define posts filtered
    const postsFiltered = posts.filter(
      //only display posts that many the current user's email
      (post) => post.username.stringValue === email
    )

    //set the filtered posts to the correct set of posts
    setFilteredPosts(postsFiltered);
  }

  //defining the function to get posts from api
  const getPosts = async() => {
    try {
      //fetch data from firebase api
      const response = await fetch('https://firestore.googleapis.com/v1/projects/itec4012-final/databases/(default)/documents/posts/')
      const data = await response.json();
      //map through api to get post data
      const formattedData = data.documents.map((item) => {
        return item.fields
      });

      //set the posts to the formatted data from the api
      setPosts(formattedData); 
      //set the posts to the filtered data from the api
      setFilteredPosts(formattedData);
      //pass the formatted data to the initialize posts function in the global context
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

  //return page with item cards for each post in api
  return (
    <div className="page">
      {/*include nav bar component at top of page*/}
      <Navbar/>
      <div className="profile-page">
        <h1 className="profile-title">{email}</h1>
        <hr class="divider"></hr>
        {/*define form inputs to submit new post*/}
        <div className="post-form">
              <form className="form-layout" onSubmit={handleSubmit(submitPost)}>
                  <h2>New Post</h2>
                  <br />

                  {/*define title form field*/}
                  <label htmlFor="title">Title</label>
                  <input {...register("title")} name="title" required/>

                  {/*define time form field*/}
                  <label htmlFor="time">Time</label>
                  <input {...register("time")} name="time" required />

                  {/*define servings form field*/}
                  <label htmlFor="servings">Servings</label>
                  <input {...register("servings")} name="servings" required />

                  {/*define text form field*/}
                  <label htmlFor="text">Text</label>
                  <input {...register("text")} name="text" required />

                  {/*define image form field*/}
                  <label htmlFor="image">Image</label>
                  <input {...register("image")} name="image" required />

                  {/*define submit button*/}
                  <input type="submit" value="Submit" />
                  <br />
              </form>
        </div>
        {/*displays all posts associated with current user*/}
        <div className="my-posts">
          {
            //map through posts and create an item card for each that belongs to the logged in user
            filteredPosts.map((post) => (
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
            //define the state when there are no posts for the logged in user
            !loading && filteredPosts.length === 0 && <p>No posts found for {email}</p>
          }
          {
            //define the loading state
            loading && <div class="loader"></div>
          }
        </div>
      </div>
    </div>
  );
};
