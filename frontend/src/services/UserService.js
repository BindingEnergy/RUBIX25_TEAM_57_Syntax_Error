import { Client, Databases, Query } from 'appwrite';
import config from '../config/config';

export class UserService {
    client = new Client();
    database;

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);
        this.database = new Databases(this.client); // Initialize database instance
    }

    // Fetch all users (not including the current user)
    async getUsers() {
        try {
            const response = await this.database.listDocuments(
                config.appWriteDatabaseId, // Your database ID
                config.appWriteCollectionUsers // Your users collection ID
            );
            return response.documents;
        } catch (error) {
            throw error;
        }
    }
}

const userService = new UserService();
export default userService;
