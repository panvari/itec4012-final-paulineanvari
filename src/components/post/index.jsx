import './styles.css';

export const Post  = (props) => {
    //define props for item card
    const {username, title, time, servings, text, image} = props;

    //return item card that uses props
    return (
        <div className="post">
            <div className="text-container">
                {/*define username using prop*/}
                <p className="user-name">{username}</p>
                {/*define recipe title using prop*/}
                <h1 className="title">{title}</h1>
                {/*define total time using prop*/}
                <p className="time">{"Time: " + time}</p>
                {/*define number of servings using prop*/}
                <p className="servings">{"Serves: " + servings}</p>
                {/*define recipe instructions using prop*/}
                <p className="instructions">{text}</p>
            </div>
            {/*define recipe image using prop*/}
            <div className="image-container">
                <img className="image" src={image} alt={title + "photo"}/>
            </div>
        </div>
    )
}