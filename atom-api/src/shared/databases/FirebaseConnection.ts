import { AbstractConnection } from "./AbstractConnection";
import admin from "firebase-admin";
import { format } from 'date-fns';
import path from "path";

export class FirebaseConnection implements AbstractConnection {
    private static instance: FirebaseConnection;

    private constructor() {
        if (!admin.apps.length) {
            const CREDENTIALS_PATH = path.resolve(__dirname, "../config/firestore-key.json");
            admin.initializeApp({
                credential: admin.credential.cert(CREDENTIALS_PATH),
            });
        }
    }

    public static getInstance(): FirebaseConnection {
        if (!FirebaseConnection.instance) {
            FirebaseConnection.instance = new FirebaseConnection();
        }
        return FirebaseConnection.instance;
    }

    private getCollection(collectionName: string): FirebaseFirestore.CollectionReference {
        return admin.firestore().collection(collectionName);
    }

    public async findOne(collectionName: string, query: { id: string }): Promise<any> {
        const collection = this.getCollection(collectionName);
        const doc = await collection.doc(query.id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }

    public async findByField(collectionName: string, query: {field: string, value: string}): Promise<any> {
        const collection = this.getCollection(collectionName);
        const doc = await collection.where(query.field, "==", query.value).limit(1).get()
        if (doc.empty) {
            return null;
        }
        const resp = doc.docs[0];
        return resp.data()
    }

    public async findAllByField(collectionName: string, query: {field: string, value: string}): Promise<any> {
        const collection = this.getCollection(collectionName);
        const doc = await collection.where(query.field, "==", query.value).get()
        if (doc.empty) {
            return null;
        }
        const tasks = doc.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return tasks;
    }

    public async insertOne(collectionName: string, data: object): Promise<any> {
        const timestamp = new Date();
        const formattedDate = format(timestamp, 'yyyy-MM-dd HH:mm:ss');
        const dataWithTimestamps = {
            ...data,
            createdAt: formattedDate,
            updatedAt: formattedDate
        };
        const collection = this.getCollection(collectionName);
        const docRef = await collection.add(dataWithTimestamps);
        return docRef.id;
    }

    public async updateOne(collectionName: string, query: { id: string , data: Partial<any> }): Promise<any> {
        const timestamp = new Date();
        const formattedDate = format(timestamp, 'yyyy-MM-dd HH:mm:ss');
        const dataWithTimestamps = {
            ...query.data,
            updatedAt: formattedDate
        };
        const collection = this.getCollection(collectionName);
        await collection.doc(query.id).update(dataWithTimestamps);
    }

    public async deleteOne(collectionName: string, query: { id: string }): Promise<void> {
        const collection = this.getCollection(collectionName);
        await collection.doc(query.id).delete();
    }
}