import db from "../config/db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const registro = async (req, res) => {

    try {
        const { nome, cpf, senha, tipo_usuario } = req.body;

        if (nome.length < 5 || nome === "") {
            return res.status(400).json({ message: 'O nome deve ser completo. Deve conter pelo menos 5 caracteres e não pode estar vazio.' });
        }

        if (cpf.length < 5 || cpf === "") {
            return res.status(400).json({ message: 'O cpf deve ser completo. Deve conter pelo menos 5 caracteres e não pode estar vazio.' });
        }

        const saltRounds = 10; //numero mais comum para o bcrypt - define quantas vezes a senha será processada para gerar o hash / quanto maior o número, mais seguro, mas também mais lento
        const senhaHash = await bcrypt.hash(senha, saltRounds); //criptografa a senha

        const [result] = await db.query("INSERT INTO usuario (nome, cpf, senha, tipo_usuario, ativo) VALUES (?, ?, ?, ?, ?)", [nome, cpf, senhaHash, tipo_usuario, 1]);

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'Não foi possível criar o usuário.' });
        }

        return res.status(201).json({ message: 'Usuário criado com sucesso.' });

    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar usuário.', error: error.message });
    }

};

export const esqueciSenha = async (req, res) => {
    try {
        const { cpf, senha } = req.body;

        if (cpf === "")
            return res.status(400).json({ message: "cpf não deve estar vazio. Ele é obrigatório.", success: false });

        if (senha === "") {
            return res.status(400).json({ message: "A nova senha não deve estar vazio. Ela é obrigatória.", success: false });
        } else {
            if (senha.length < 6 || senha.length > 12)
                return res.status(400).json({ message: "A senha deve ter somente de 6 a 12 caracteres.", success: false });

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;
            if (!passwordRegex.test(senha)) { //se a senha NÃO conter pelo menos uma letra maiuscula, uma letra minuscula, um caracter e um numero
                return res.status(400).json({ message: "A senha não corresponde as regras impostas para uma senha forte.", success: false })
            }
        }
        //seleciona o id por cpf
        const [row] = await db.query("SELECT id FROM usuario WHERE cpf = ?", [cpf]);
        if (row.length === 0)
            return res.status(400).json({ message: "Esse usuário não foi encontrado.", success: false })

        const user = row[0]; //dado do usuario que veio da consulta

        //Criar nova senha
        const saltRound = 10;
        const hashPassword = await bcrypt.hash(senha, saltRound); //senha convertida para hash - criptografa a senha

        const [result] = await db.query("UPDATE usuario SET senha = ? WHERE id = ?", [hashPassword, user.id]);
        if (result.affectedRows === 0)
            return res.status(400).json({ message: "Não foi possível resetar a sua senha. Tente novamente!", success: false });

        return res.status(201).json({ message: "Senha atualizada com sucesso.", success: true })

    } catch (error) {
        return res.status(500).json({ message: "Erro ao atualizar senha.", erro: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const {cpf, senha} = req.body;

        if (!cpf || !senha) {  
            return res.status(400).json({ message: "Email e senha são obrigatórios.", success: false });  
        }

        const [rows] = await db.query(  
            "SELECT id, nome, cpf, senha, tipo_usuario FROM usuario WHERE cpf = ? LIMIT 1",  
            [cpf]  
        );  
    
        if (rows.length === 0) {  
            return res.status(401).json({ message: "Credenciais inválidas.", success: false });  
        }  
    
        const user = rows[0];  // usuário encontrado, agora verificar a senha
    
        const ok = await bcrypt.compare(senha, user.senha);  // compara a senha fornecida com o hash armazenado no banco de dados
        if (!ok) {  
            return res.status(401).json({ message: "Credenciais inválidas.", success: false });  
        }  
    
        // JWT: "crachá" do usuário  
        const token = jwt.sign(  
            { 
                sub: user.id, 
                tipo_usuario: user.tipo_usuario 
            }, // payload (não coloque senha aqui)  
            process.env.JWT_SECRET,
            { 
                expiresIn: "1h" 
            }
        );  
    
        return res.status(200).json({  
            message: "Login realizado com sucesso.",
            success: true,
            token: token,
            user: {
                id: user.id,
                cpf: user.cpf,
            }  
        });

    } catch (error) {
        res.status(500).json({message: 'Erro ao realizar login.', error: error.message, success: false});
    }
}

