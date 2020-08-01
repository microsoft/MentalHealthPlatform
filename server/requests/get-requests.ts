import { getTopics } from './get-requests/getTopics';
import { getChatPreviews } from './get-requests/getChatPreviews';
import { getTrendingPosts } from './get-requests/getTrendingPosts';
import { getTrendingKeywords } from './get-requests/getTrendingKeywords';
import { getChat } from './get-requests/getChat';
import { getTherapists } from './get-requests/getTherapists';
import { getEvents } from './get-requests/getEvents';
import { getContacts } from './get-requests/getContacts';
import { getNews } from './get-requests/getNews';

const getRequests = {
	getTopics,
	getChatPreviews,
	getTrendingPosts,
	getTrendingKeywords,
	getChat,
	getTherapists,
	getEvents,
	getContacts,
	getNews
};

export default getRequests;
