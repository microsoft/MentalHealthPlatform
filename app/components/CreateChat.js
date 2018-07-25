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

    isSubmitButtonDisabled() {
        return this.state.inputTitle.length > 0 && this.state.inputDescription.length > 0;
    }

    handleSubmit(e, title, description) {
        e.preventDefault();
        alert("submitting with title: " + title +  " and description: " + description);
    }


    renderForm() {
        const submitButtonStyle = Object.assign({}, CreateChatStyles.submitButtonStyle, {
            backgroundColor: this.isSubmitButtonDisabled() ? "#4CAF50" : "#CCCCCC"
        });
        
        return (
        <div style={CreateChatStyles.paneStyle}>
            <form onSubmit={(e) => this.handleSubmit(e, this.state.inputTitle, this.state.inputDescription)} style={CreateChatStyles.containerStyle}>
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
        )
    };


    render() {
        
        return this.renderForm();
    }
}

export default withRouter(CreateChat);