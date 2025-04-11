import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    if (!usuario) {
      setError('O campo usuário é obrigatório.')
      return
    }
   
    if (senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    const users = JSON.parse(localStorage.getItem('usuarios') ?? '[]') || []
    const user = users.find((e) => e.usuario === usuario && e.senha === senha)
    if (user) {
      localStorage.setItem('usuarioLogado', JSON.stringify(user))
      alert('Login realizado com sucesso!')
      navigate('/formulario')
    } else {
      alert('Usuario ou senha inválidos!')
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="form">
        <h2>Login</h2>
        <input
          type="text"
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
        {error && <p className="error">{error}</p>}
        <button type="submit">Entrar</button>
        <p className="text-small">
          Não tem conta?{' '}
          <a href="/register" className="link">
            Cadastre-se
          </a>
        </p>
      </form>
    </div>
  )
}
