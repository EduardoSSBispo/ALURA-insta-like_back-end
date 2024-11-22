import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getAllPosts() {
    const db = conexao.db("node-server");
    const collection = db.collection("posts");

    return collection.find().toArray();
}

export async function createNewPost(post) {
    const db = conexao.db("node-server");
    const collection = db.collection("posts");

    return collection.insertOne(post);
}

export async function updatePost(id, post) {
    const db = conexao.db("node-server");
    const collection = db.collection("posts");

    const objectId = ObjectId.createFromHexString(id);

    return collection.updateOne({
        _id: new ObjectId(objectId)
    }, {$set: post});
}