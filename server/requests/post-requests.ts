import { signUp } from './post-requests/signUp';
import { login } from './post-requests/login';
import { sendMessage } from './post-requests/sendMessage';
import { createChat } from './post-requests/createChat';
import { createContact } from './post-requests/createContact';

const postRequests = {
	signUp,
	login,
	sendMessage,
	createChat,
	createContact
};

export default postRequests;
