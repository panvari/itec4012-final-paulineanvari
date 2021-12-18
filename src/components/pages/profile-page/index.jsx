import "./styles.css";
import {useEffect, useState, useContext} from 'react';
import {Post} from '../../post';
import PostContext from "../../../context/post-context";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Navbar } from "../../navbar";

export const ProfilePage = () => {

  const [email, setEmail] = useState();
  const [rand, setRand] = useState();
  const [activeUser, setActiveUser] = useState();

  //use the use state hook to define the plants state
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  //use the use state hook to define the loading state
  const [loading, setLoading] = useState(true);

  //use the use context hook to define the globate state using custom context
  const globalState = useContext(PostContext);

  const {register, handleSubmit} = useForm();

  const history = useHistory();
  
    //check if user is logged in
    useEffect(
      () => {
        
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
          if (!user) {
            history.push('/login');
          }

          else {
            setEmail(user.email);
          }
        })
      }, []
    );

    const submitPost = async (formVals) => {
      setRand(Math.floor(Math.random() * 500))
      console.log(rand);

      const formattedData = {
          fields: {
              id: {
                  stringValue: String(rand)
              },
              username: {
                  stringValue: email
              },
              title: {
                  stringValue: formVals.title
              },
              time: {
                  stringValue: formVals.time
              },
              servings: {
                  stringValue: formVals.servings
              },
              text: {
                  stringValue: formVals.text
              },
              image: {
                stringValue: formVals.image
            },
          }
      }

      console.log(formVals, formattedData);
      try {
          const response = await fetch('https://firestore.googleapis.com/v1/projects/itec4012-final/databases/(default)/documents/posts/',
          {
              headers: {
                  'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify(formattedData)
          });
          history.push('/');

          } catch (error) {
              console.log("Error", error);
          }
  };

  //use the use effect hook to perform the get plant function
  useEffect(
    () => {

      getPosts();
    }, []
  );

  useEffect(
    () => {
        handleFilterByUser();
        console.log(email);
    }, [email, posts]
  );

  const handleFilterByUser = () => {

    const postsFiltered = posts.filter(
      (post) => post.username.stringValue === email
    )

    setFilteredPosts(postsFiltered);
  }

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
      setFilteredPosts(formattedData);
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
    <div className="page">
    <Navbar/>
    <div className="profile-page">
      <h1 className="profile-title">{email}</h1>
      <hr class="divider"></hr>
      <div className="post-form">
            <form className="form-layout" onSubmit={handleSubmit(submitPost)}>
                <h2>New Post</h2>
                <br />

                <label htmlFor="title">Title</label>
                <input {...register("title")} name="title" required/>

                <label htmlFor="time">Time</label>
                <input {...register("time")} name="time" required />

                <label htmlFor="servings">Servings</label>
                <input {...register("servings")} name="servings" required />

                <label htmlFor="text">Text</label>
                <input {...register("text")} name="text" required />

                <label htmlFor="image">Image</label>
                <input {...register("image")} name="image" required />

                <input type="submit" value="Submit" />
                <br />

            </form>
      </div>
      <div className="my-posts">
        {
          //map through plants and create an item card for each
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
