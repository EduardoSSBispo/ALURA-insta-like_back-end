import express from "express";
import routes from "./src/routes/postRoutes.js";

// const posts = [
//     {
//         id: 1,
//         descricao: "Foto teste",
//         imagem: "https://placecats.com/millie/300/150"
//     },
//     {
//         id: 2,
//         descricao: "Gato fazendo yoga",
//         imagem: "https://placecats.com/yoga/400/200",
//     },
//     {
//         id: 3,
//         descricao: "Gatinho comendo pizza",
//         imagem: "https://placecats.com/pizza/500/250",
//     },
//     {
//         id: 4,
//         descricao: "Gato explorando a caixa",
//         imagem: "https://placecats.com/box/300/300",
//     },
//     {
//         id: 5,
//         descricao: "Gato dormindo no sol",
//         imagem: "https://placecats.com/sun/400/200",
//     },
//     {
//         id: 6,
//         descricao: "Gato brincando com um novelo de lã",
//         imagem: "https://placecats.com/yarn/500/250"
//     },
//     {
//         id: 7,
//         descricao: "Gato olhando pela janela",
//         imagem: "https://placecats.com/window/300/300"
//     }
// ];

const app = express();

app.use(express.static("uploads"));
routes(app);

app.listen(8080, () => {
    console.log("Servidor está rodando na porta 8080");
});