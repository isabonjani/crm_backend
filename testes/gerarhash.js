const bcrypt = require("bcryptjs");

// Senha que você quer transformar em hash
const password = "3737";

// Gerar o salt (recomendado 10-12 rounds para equilíbrio entre segurança e performance)
const salt = bcrypt.genSaltSync(10);

// Gerar o hash
const hash = bcrypt.hashSync(password, salt);

console.log("P6:", hash);
