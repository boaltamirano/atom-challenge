export interface AbstractConnection {
    findOne(collectionName: string, query: object): Promise<any>;
    insertOne(collectionName: string, data: object): Promise<any>;
    updateOne(collectionName: string, query: object): Promise<any>;
    deleteOne(collectionName: string, query: object): Promise<any>;

    findByField(collectionName: string, query: object): Promise<any>;
    findAllByField(collectionName: string, query: object): Promise<any>;
}