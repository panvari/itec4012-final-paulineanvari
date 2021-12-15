import './styles.css';

export const Post  = (props) => {
    //define props for item card
    const {username, title, time, servings, text, image} = props;

    //return item card that uses props
    return (
        <div className="post">
            <p className="user-name">{username}</p>
            <h1 className="title">{title}</h1>
            <p className="time">{"Total Time: " + time}</p>
            <p className="servings">{"Serves: " + servings}</p>
            <p className="text">{text}</p>
            <img className="photo" src={image} alt={username + "'s" + "photo"}/>
        </div>
    )
}