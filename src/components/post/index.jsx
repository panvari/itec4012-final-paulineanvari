import './styles.css';

export const Post  = (props) => {
    //define props for item card
    const {username, title, time, servings, text, image} = props;

    //return item card that uses props
    return (
        <div className="post">
            <div className="text-container">
                <p className="user-name">{username}</p>
                <h1 className="title">{title}</h1>
                <p className="time">{"Time: " + time}</p>
                <p className="servings">{"Serves: " + servings}</p>
                <p className="instructions">{text}</p>
            </div>
            <div className="image-container">
                <img className="image" src={image} alt={title + "photo"}/>
            </div>
        </div>
    )
}