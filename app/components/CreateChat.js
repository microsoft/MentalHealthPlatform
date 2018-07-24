import React from 'react';
import { withRouter } from 'react-router-dom';
import { chats } from '../util/Dummy';
import Message from './Message';
import sendIcon from './../images/send_icon.png';

import CreateChatStyles from './CreateChatStyles';

class CreateChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputTitle: "",
            inputDescription: ""
        };
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


    handleSubmit(e, title, description) {
        e.preventDefault();
        alert("submitting with title: " + title +  " and description: " + description);
    }


    renderForm() {
        return (
        <form onSubmit={(e) => this.handleSubmit(e, this.state.inputTitle, this.state.inputDescription)} style={{}}>
            <input
                style={CreateChatStyles.inputTitleStyle}
                type='text'
                value={this.state.inputTitle}
                placeholder="Enter chat title"
                onChange={(e) => this.handleInputTitleChange(e)} />
            <input
                style={CreateChatStyles.inputDescriptionStyle}
                type='text'
                value={this.state.inputDescription}
                placeholder="Enter chat description"
                onChange={(e) => this.handleInputDescriptionChange(e)} />
            <button
                style={CreateChatStyles.submitButtonStyle}
                type='submit'>
                
                {/* <input type="image" src={sendIcon} style={ChatStyles.sendIconStyle} /> */}
            </button>
        </form>
        )
    };


    render() {
        
        return this.renderForm();
    }
}

export default withRouter(CreateChat);