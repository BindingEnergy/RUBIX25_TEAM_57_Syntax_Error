import config from '../config/config';
import { Client, Account, ID, Databases } from 'appwrite';

export class AuthService {
    client = new Client();
    account;
    database;

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);
        this.account = new Account(this.client);
        this.database = new Databases(this.client); // Initialize database instance
    }

    async createAccount({
        email,
        password,
        fullName,
        googleContacts = [],
        gender,
        mobileNumber,
    }) {
        try {
            // Create the user account in Appwrite
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                fullName,
                mobileNumber
            );

            if (userAccount) {
                // Create user document in the 'users' collection
                await this.database.createDocument(
                    config.appWriteDatabaseId,
                    config.appWriteCollectionUsers,
                    ID.unique(),
                    {
                        userId: userAccount.$id,
                        username: fullName,
                        email: email,
                        googleContacts: googleContacts,
                        createdAt: new Date().toISOString(),
                        fullName: fullName,
                        mobileNumber: mobileNumber, // Store phone number here
                        gender: gender, // Store gender if required
                    }
                );
                console.log(userAccount.$id);

                // Send email verification link
                await this.account.createVerification(email);

                return userAccount;
            } else {
                return userAccount;
            }
        } catch (error) {
            if (error.code === 429) {
                // Rate limit exceeded error
                console.log('Rate limit exceeded. Retrying...');
                await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds
                return this.createAccount({
                    email,
                    password,
                    fullName,
                    googleContacts,
                    gender,
                    mobileNumber, // Pass mobile number and gender for retry
                });
            }
            // Handle specific error related to duplicate email (e.g., user already exists)
            if (error.code === 409) {
                console.log('User with this email already exists');
                throw new Error('User with this email already exists');
            }
            throw error; // Other errors
        }
    }

    async createVerification(email) {
        try {
            await this.account.createVerification(
                email,
                'http://localhost:5173/verify-email'
            );
        } catch (error) {
            throw error;
        }
    }

    async verifyEmail(userId, secret) {
        try {
            return await this.account.updateVerification(userId, secret);
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            );
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSession('current');
        } catch (error) {
            throw error;
        }
    }

    async isAuthenticated() {
        try {
            const session = await this.account.get();
            return !!session;
        } catch (error) {
            return false;
        }
    }

    getUserId() {
        return localStorage.getItem('userId');
    }

    async getUserDetails(userId) {
        try {
            const user = await this.database.getDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionUsers,
                userId
            );
            return user;
        } catch (error) {
            throw error;
        }
    }

    async sendPasswordReset(email) {
        try {
            await this.account.createRecovery(
                email,
                'http://localhost:5173/reset-password'
            );
        } catch (error) {
            throw error;
        }
    }

    async resetPassword(userId, secret, password) {
        try {
            await this.account.updateRecovery(
                userId,
                secret,
                password,
                password
            );
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
