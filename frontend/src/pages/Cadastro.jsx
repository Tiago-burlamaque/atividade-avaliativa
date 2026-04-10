import React, { useState } from 'react';
import axios from 'axios'

const Cadastro = () => {

   const [nome, setNome] = useState('')
   const [cpf, setCpf] = useState('')
   const [senha, setSenha] = useState('')

	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			await axios.post('http://localhost:3000/registro', {
				nome:nome,
				cpf:cpf,
				senha:senha
			})
			alert("Usuario cadastrado com sucesso")
		} catch (error) {
			alert("Erro")
		}
	}


  	return (
    <>
        <section className="h-screen flex items-center justify-center">  
			<div className='w-150 h-100 bg-neutral-800 flex flex-col items-center justify-center text-white w-full'>
				<form onSubmit={handleRegister} className='  '>
					<input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/><input type="number"  value={cpf} onChange={(e) => setCpf(e.target.value)}/><input type="password" value={senha} onChange={(e) => setSenha(e.target.value)}/>

					<button type='submit'>registrar</button>
				</form>
			</div>
		</section>
    </>
  )
}

export default Cadastro;

