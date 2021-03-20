import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import '../StyleSheet/TweetBox.css';
import axios from 'axios';

const TweetBox = () => {
    const profile_image = localStorage.getItem("pp") || "";
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState("");

    const Tweet = (e) => {
        const url = "http://localhost:5000/api/tweet-upload";
        const token = localStorage.getItem("sid");

        const data = new FormData();
        data.append("tweet", tweet);
        data.append("file", file);

        axios
        .post(url,data, {
            headers: {
                "x-auth-token": token,
            },
        })
        .then((response) => {
            console.log(response);
            alert(response.data.msg);
            setTweet("");
            setFile("");
        })
        .catch((error) => {
            console.log(error);
        });
    };
    return (
        <div className="TweetBox__container">
            <div className="TweetBox__title">
                <h2>HOME</h2>
            </div>
            <div className="TweetBox">
                <Avatar alt="User Profile" src={profile_image} />
                <input 
                type="text" 
                placeholder="What's Happening..."
                onChange={(e) => setTweet(e.target.value)}
                value={tweet}
                 />
            </div>
            <div className="Tweet__fileUpload">
                <div className="File">
                    <label>File Upload </label>
                    <input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>
                <div className="Tweet__button">
                    <button disabled={tweet === ""} onClick={Tweet}>TWEET</button>
                </div>
            </div>
        </div>
    )
}

export default TweetBox
