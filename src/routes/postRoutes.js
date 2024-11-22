import multer from "multer";
import cors from "cors";
import express from "express";
import { listarPosts, criarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));

    // Rota de listagem de posts
    app.get("/posts", listarPosts);

    // Rota de criação de novo post
    app.post("/posts", criarNovoPost);
    app.post("/upload", upload.single("imagem"), uploadImagem);

    // Rota de upload para atualizar imagem
    app.put("/upload/:id", atualizarNovoPost);
}

export default routes;