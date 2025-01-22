import config from '../config/config';
import { Client, Databases, ID, Account, Query } from 'appwrite';

export class ChatService {
    client = new Client();
    database;
    account;

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);
        this.database = new Databases(this.client); // Initialize database instance
        this.account = new Account(this.client); // Initialize account instance
    }

    // Function to create a chat (both private and group)
    async createChat(userIds, chatType) {
        try {
            // Get the current user's ID
            const currentUser = await this.getCurrentUser();
            const userId = currentUser.$id; // Current authenticated user's ID

            // Determine if it's a private or group chat
            const isPrivateChat =
                chatType === 'private' && userIds.length === 1; // Private chat if only one other user is selected
            const isGroupChat = chatType === 'group' && userIds.length > 1; // Group chat if more than one user is selected

            if (!isPrivateChat && !isGroupChat) {
                throw new Error(
                    'Invalid chat type or insufficient participants'
                );
            }

            // Check if a chat already exists with these participants
            const existingChat = await this.checkForExistingChat(
                userId,
                userIds,
                isPrivateChat
            );

            if (existingChat) {
                return existingChat; // Return existing chat if found
            } else {
                // If no existing chat, create a new one
                const newChat = await this.database.createDocument(
                    config.appWriteDatabaseId,
                    config.appWriteCollectionChats,
                    ID.unique(),
                    {
                        type: isPrivateChat ? 'private' : 'group', // Set chat type
                        participants: [userId, ...userIds].sort(), // Sort participants array to avoid order issues
                        lastMessage: '',
                        createdAt: new Date().toISOString(),
                    }
                );
                return newChat; // Return the created chat
            }
        } catch (error) {
            console.error('Error creating chat:', error);
            throw error; // Handle any errors (e.g., network issues)
        }
    }

    // Function to check if a chat already exists between the current user and selected users
    async checkForExistingChat(userId, userIds, isPrivateChat) {
        try {
            // For private chat, participants should only have two users
            const participants = isPrivateChat
                ? [userId, ...userIds]
                : [...new Set([userId, ...userIds])]; // Ensure unique participants for group chat

            // Sort the participants array to avoid order issues during comparison
            participants.sort();

            const chats = await this.database.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionChats,
                [
                    Query.equal('participants', participants), // Check for chat with these participants
                ]
            );

            // Return the first chat found (if any)
            return chats.documents.length > 0 ? chats.documents[0] : null;
        } catch (error) {
            console.error('Error checking existing chat:', error);
            throw error;
        }
    }

    // Get the current authenticated user
    async getCurrentUser() {
        try {
            const currentUser = await this.account.get(); // Get the current logged-in user
            return currentUser;
        } catch (error) {
            console.error('Error getting current user:', error);
            throw error;
        }
    }

    // Function to fetch all chats for a given user
    async getUserChats(userId) {
        try {
            // Sort the participants array to avoid order issues in the query
            const response = await this.database.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionChats,
                [
                    Query.equal('participants', [userId].sort()), // Match the exact array order of participants
                ]
            );
            return response.documents; // Returns the list of chat documents
        } catch (error) {
            console.error('Error fetching chats:', error);
            throw error;
        }
    }

    // Function to search for users by their full name for chat creation
    async searchUsersByName(name) {
        try {
            const response = await this.database.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionUsers,
                [
                    Query.search('fullName', name), // Search users by fullName field
                ]
            );
            return response.documents; // Returns the list of users matching the search
        } catch (error) {
            console.error('Error searching users:', error);
            throw error;
        }
    }
}

const chatService = new ChatService();
export default chatService;
