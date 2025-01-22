const config = {
    appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteCollectionUsers: String(
        import.meta.env.VITE_APPWRITE_COLLECTION_USERS_ID
    ),
    appWriteCollectionChats: String(
        import.meta.env.VITE_APPWRITE_COLLECTION_CHATS_ID
    ),
    appWriteCollectionMessages: String(
        import.meta.env.VITE_APPWRITE_COLLECTION_MESSAGES_ID
    ),
    appWriteCollectionSMC: String(
        import.meta.env.VITE_APPWRITE_COLLECTION_SMC_ID
    ),
    appWriteCollectionNotifs: String(
        import.meta.env.VITE_APPWRITE_COLLECTION_NOTIFS_ID
    ),
    appWriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default config;
