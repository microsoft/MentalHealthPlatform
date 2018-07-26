import React from 'react';
import { withRouter } from 'react-router-dom';
import { chats } from '../util/Dummy';
import Message from './Message';
import sendIcon from './../images/send_icon.png';

import { BASE_URL } from './../util/Helpers';

import CreateChatStyles from './CreateChatStyles';

class CreateChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputTitle: "",
            inputDescription: ""
        };
    }

    getTopicId() {
        let subUrl = this.props.match.url.replace("createChat/", "").replace("createChat", "");        
        
        let list = subUrl.split("/");
        list = list.filter((item) => item != "");

        const topicId = list[list.length - 1].replace("topic", "");
        
        return topicId;
    }

    handleInputTitleChange(e) {
        this.setState({
            inputTitle: e.target.value
        })
    }

    handleInputDescriptionChange(e) {
        this.setState({
            inputDescription: e.target.value
        })
    }

    isSubmitButtonDisabled() {
        return this.state.inputTitle.length > 0 && this.state.inputDescription.length > 0;
    }

    handleSubmit(e, title, description, ctx) {
        console.log(this.getTopicId());
        e.preventDefault();
        fetch(`${BASE_URL}/createchat`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatTitle: title,
                chatDescription: description,
                topicId: this.getTopicId(),
                username: "Aldo"
            })
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            if (data && data.chatId) {
                const path = `${ctx.props.match.url.replace("createChat/", "").replace("createChat", "")}chat/${data.chatId}`;
                ctx.props.history.push(path);
            }
        });
    }


    renderForm() {
        const backgroundStyle = Object.assign({}, CreateChatStyles.backgroundStyle, {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 1)), url(${require('./../images/topic_image_0.jpg')})`
        });
        
        const submitButtonStyle = Object.assign({}, CreateChatStyles.submitButtonStyle, {
            backgroundColor: this.isSubmitButtonDisabled() ? "#4CAF50" : "#CCCCCC"
        });

        const _this = this;
        
        return (
            <div style={backgroundStyle}>
                <div style={CreateChatStyles.formContainerStyle}>
                    <div style={CreateChatStyles.paneStyle}>
                        <form onSubmit={(e) => this.handleSubmit(e, _this.state.inputTitle, _this.state.inputDescription, _this)} style={CreateChatStyles.containerStyle}>
                            <h1 style={CreateChatStyles.formTitleStyle}>Create New Chat</h1>
                            <input
                                style={CreateChatStyles.inputTitleStyle}
                                type='text'
                                value={this.state.inputTitle}
                                placeholder="Enter chat title"
                                onChange={(e) => this.handleInputTitleChange(e)} />
                            <textarea
                                style={CreateChatStyles.inputDescriptionStyle}
                                type='text'
                                value={this.state.inputDescription}
                                placeholder="Enter chat description"
                                onChange={(e) => this.handleInputDescriptionChange(e)}></textarea>
                            <button
                                disabled={!this.isSubmitButtonDisabled()}
                                style={submitButtonStyle}
                                type='submit'>
                                Submit
                                {/* <input type="image" src={sendIcon} style={ChatStyles.sendIconStyle} /> */}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    };


    render() {
        
        return this.renderForm();
    }
}

export default withRouter(CreateChat);