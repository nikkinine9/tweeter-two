import React, {useEffect, useState} from 'react';
import '../StyleSheet/HomeFeed.css';
import TweetBox from "./TweetBox";
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import ReplayIcon from '@material-ui/icons/Replay';
import GetAppIcon from '@material-ui/icons/GetApp';

const HomeFeed = () => {

    const [tweets, setTweets] = useState([]);
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        const loadData = async function(){
            const url='http://localhost:5000/api/feeds'
            const {data} = await axios.get(url)

            if (mounted){
                setTweets(data)
            }
        };
        loadData();
        return ()=>{
            setMounted(false);
        };
    }, [mounted]);
    const likeFunction = (ID)=>{
        const url = `http://localhost:5000/api/likes/${ID}`

        axios.post(url).then((res)=>{
            console.log(res);
        })
        .catch((error) =>{
            console.log(error);
        });
    };
    const comments = (ID)=>{
        const url = `http://localhost:5000/api/comments/${ID}`

       const comment = prompt("Enter a comment");
       const data = new FormData();
       data.append('comment', comment);

       axios.post(url, data).then(res => {
          console.log(res);
       }).catch((error) => {
            console.log(error);
       })
    };
    return (
        <div className="HomeFeed__container">
            <TweetBox />
            <div className="Feed">
            { tweets && (
                <div className="Feeds">
                    {tweets.map((tweet) => {
                        return( 
                            <div className="Feeds__content">
                                <div className="User_profile">
                                    <Avatar alt="User Profile" src={tweet.profile} />
                                </div>
                                <div className="Tweet">
                                    <div className="user">
                                        <h3>{tweet.user}</h3>
                                        <h3 className="user__tag">{`@${tweet.user}`}</h3>
                                    </div>
                                    <h4>{tweet.tweet}</h4>
                                    {tweet.file ? <img src={tweet.file} alt="File" />: null}
                                    <div className="Tweet__icons">
                                        <div className="likes">
                                            <FavoriteIcon onClick={()=>likeFunction(tweet._id)} />
                                            <h5>{tweet.likes}</h5>
                                        </div>
                                        <div className="comments">
                                            <MessageIcon onClick={()=>comments(tweet._id)} />
                                            <h5>{tweet.comments}</h5>
                                        </div>
                                        <GetAppIcon className="download" />
                                        <ReplayIcon className="retweet" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}   
            </div>
        </div>
    );
};

export default HomeFeed;
