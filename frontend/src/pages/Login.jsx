import React, { useState } from 'react'
import { Link, useNavigate } from "react-router"
import axios from 'axios'

function Login() {
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3000/login",{
        cpf:cpf,
        senha:senha
      })
      alert("Usuario logado com sucesso.")
      useNavigate("/cadastro")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <section className='h-screen flex justify-center items-center'>
      <div className='w-125 h-150 bg-neutral-500'>
        <header className='w-full h-30 flex justify-center items-center'>
          <h1 className='text-4xl text-white'>Login</h1>
        </header>
        <form onSubmit={handleLogin} className='w-full flex flex-col justify-center items-center px-15 text-white gap-4'>
          <label htmlFor="cpf">CPF</label>
          <input type="number" className='border p-2 w-full rounded ' 
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}/>

          <label htmlFor="senha">Senha</label>
          <input type="password" className='border p-2 w-full rounded ' 
          value={senha}
          onChange={(e) => setSenha(e.target.value)}/>

          <button type='submit' className='border p-2 w-full rounded cursor-pointer mt-5'>Entrar</button>
        </form>
        <footer className='text-white flex justify-center items-center mt-10'>
          <h2>Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></h2>
        </footer>
      </div>
    </section>
  )
}

export default Login