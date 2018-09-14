import * as React from "react";
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { InfoCard, InfoCardDataType } from "./InfoCard/InfoCard";

import * as classes from "./Forum.css";

import { BASE_URL } from '../../util/Helpers';

class ForumClass extends React.Component<RouteComponentProps<{}>, {forumId: number, forumData: any}> {
    isUnmounted = false;

    constructor(props) {
        super(props);
        const forumId = this.obtainForumId(this.props.match.url);
        this.state = {
            forumId: forumId,
            forumData: undefined
        };
    }

    getTopicId() {
        let subUrl = this.props.match.url.replace("createChat/", "").replace("createChat", "");        
        
        let list = subUrl.split("/");
        list = list.filter((item) => item != "");

        const topicId = list[list.length - 1].replace("topic", "");
        console.log(topicId);
        return topicId;
    };

    obtainForumId(url) {
        var regex = /^\/topics\/topic[\d]+[\/]?$/;
        var anythingButNumRegex = /[\/a-zA-Z]+/g;

        if (regex.test(url)) {
            // Checking /topic{num}/ or /topic{num} and nothing after
            return url.replace(anythingButNumRegex, "");
        }

        return null;
    }

    generateForumData = () => {
        return Array.apply(null, Array(8)).map((_, index) => (
            {
                chatId: index,
                chatTitle: `Chat${index}`,
                chatDescription: `Description: ${index}`,
                authorName: "Amardeep",
                date: "08/31/2018",
                numberOfReplies: 30,
                numberOfViews: 20
            }
        ));
    }

    /**
     * Renders forum component
     * @return  {React.Component}   Rendered component
     */
    render() {
        const forumData = this.generateForumData();//this.state.forumData;
        if (!forumData) {
            return null;
        }
        
        const infoCards = forumData.map(discussionPreview => {
            return <InfoCard key={discussionPreview.chatId} data={discussionPreview} match={this.props.match} />
        });

        let baseUrl = this.props.match.url;
        if (baseUrl.charAt(baseUrl.length - 1) == '/') {
            baseUrl = baseUrl.substring(0, baseUrl.length - 1);
        }

        return (
            <div className={classes.Container}>
                <div className={classes.BodyStyle}>
                    <h1 className={classes.ForumTitle}>{"Topic " + this.state.forumId}</h1>
                    <div style={{justifyContent: "flex-end", display: "flex"}}>
                        <Link to={`${baseUrl}/createChat`}>
                            <button
                                className={classes.CreateChatButton}>
                                <span style={{fontWeight: "bold"}}>+</span>
                                <span style={{}}> Create new discussion</span>
                            </button>
                        </Link>
                    </div>
                    {infoCards}
                </div>
            </div>
        );
    }

    componentDidMount() {
        const _this = this;
        fetch(`${BASE_URL}/getchatpreviews?topicId=${this.getTopicId()}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(function(response) {
            const output = response.json();
            return output;
        }).then(function(data) {
            if(!_this.isUnmounted){
                _this.setState({
                    forumData: data
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    componentWillMount() {
        this.isUnmounted = true;
    }
}

export const Forum = withRouter(ForumClass);