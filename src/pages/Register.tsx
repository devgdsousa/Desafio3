import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'

export default function Register() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmSenha, setConfirmSenha] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    setError('')

    // Validação de e-mail
    if (!usuario) {
      setError('O campo e-mail é obrigatório.')
      return
    }

    // Validação de senha (mínimo 6 caracteres, por exemplo)
    if (senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    // Confirmação de senha
    if (senha !== confirmSenha) {
      setError('As senhas não conferem.')
      return
    }

  
    const usuarios = JSON.parse(localStorage.getItem('usuarios') ?? '[]') || []
    if (usuarios.some(e => e.usuario === usuario)) {
      setError('Este usuario já está cadastrado.')
      return
    }

    // Salvar novo usuário
    usuarios.push({ usuario, senha })
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    alert('Usuário cadastrado com sucesso!')
    navigate('/login')
  }

  return (
    <div className="container">
      <form onSubmit={handleRegister} className="form">
        <h2>Cadastro</h2>
        <input
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Usuário"
          required
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          required
        />
        <input
          type="password"
          value={confirmSenha}
          onChange={(e) => setConfirmSenha(e.target.value)}
          placeholder="Confirme a senha"
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Cadastrar</button>
        <p className="text-small">
          Já tem conta?{' '}
          <a href="/login" className="link">
            Entrar
          </a>
        </p>
      </form>
    </div>
  )
}
