import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";
import { getAllPosts, createNewPost, updatePost } from "../models/postModel.js";

export async function listarPosts (req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);
}

export async function criarNovoPost (req, res) {
    const post = req.body;

    try {
        const recebido = await createNewPost(post);
        res.status(200).json(recebido);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "Erro": "Falha na requisição." });
    }
}

export async function uploadImagem (req, res) {
    const post = {
        descricao: "",
        imgUrl: req.file.originalname,
        altImg: ""
    }

    try {
        const recebido = await createNewPost(post);
        const imagemAtualizada = `uploads/${recebido.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);

        res.status(200).json(recebido);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "Erro": "Falha na requisição." });
    }
}

export async function atualizarNovoPost (req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:8080/${id}.png`;    

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            descricao: descricao,
            imgUrl: urlImagem,
            altImg: req.body.altImg
        }
        
        const recebido = await updatePost(id, post);
        res.status(200).json(recebido);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "Erro": "Falha na requisição." });
    }
}