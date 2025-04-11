import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Formulario.css';

export default function Formulario() {
  const [formData, setFormData] = useState({
    nome: '',
    nascimento: '',
    cpf: '',
    sexo: '',
    email: '',
    telefone: '',
    userId: '',
    senha: '',
    aceite: false,
    documentoIdentidade: '',
    anexoIdentidade: '',
    cep: '',
    rua: '',
    cidade: '',
    comprovanteResidencia: '',
    trilha: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuarioLogado') ?? '{}');
    if (!user || Object.keys(user).length === 0) navigate('/login');
  }, [navigate]);

  // Função para aplicar máscara de CPF: 000.000.000-00
  const formatCPF = (value: string): string => {
    const digits: string = value.replace(/\D/g, '');
    let formatted: string = digits;
    if (digits.length > 3) {
      formatted = digits.replace(/(\d{3})(\d+)/, '$1.$2');
    }
    if (digits.length > 6) {
      formatted = formatted.replace(/(\d{3})\.(\d{3})(\d+)/, '$1.$2.$3');
    }
    if (digits.length > 9) {
      formatted = formatted.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d+)/, '$1.$2.$3-$4');
    }
    return formatted;
  };

  // Função para aplicar máscara de Telefone
  const formatTelefone = (value: string): string => {
    const digits: string = value.replace(/\D/g, '');
    if (digits.length > 10) {
      
      return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    } else {
      
      return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Tratamento especial para inputs de arquivos
    if (type === 'file') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setFormData((prev) => ({ ...prev, [name]: reader.result }));
          setErrors((prev) => ({ ...prev, [name]: '' }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      let newValue = value;
      // Aplicando máscara para CPF e Telefone
      if (name === 'cpf') {
        newValue = formatCPF(value);
      }
      if (name === 'telefone') {
        newValue = formatTelefone(value);
      }

      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : newValue,
      }));
   
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    // Verifica cada campo - todos são obrigatórios, exceto os de anexo  que podem ser opcionais
    Object.entries(formData).forEach(([campo, valor]) => {
      if (
        (typeof valor === 'string' && valor.trim() === '' && campo !== 'anexoIdentidade' && campo !== 'comprovanteResidencia') ||
        (campo === 'aceite' && !valor)
      ) {
        newErrors[campo] = `O campo ${campo} é obrigatório.`;
      }
    });
    // Validação específica para e-mail
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!emailValido) {
      newErrors.email = 'E-mail inválido.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    localStorage.setItem('dadosFormulario', JSON.stringify(formData));
    alert('Inscrição realizada com sucesso!');
  };

  return (
    <div className="formulario-container">
      <div className="form-left">
        <h2>Formulário de inscrição</h2>
        <p>Preencha os dados abaixo para fazer sua inscrição no Programa Trilhas.</p>
        <form onSubmit={handleSubmit}>
          {/* Dados Pessoais */}
          <label>Nome Completo</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome completo" />
          {errors.nome && <p className="error">{errors.nome}</p>}

          <label>Data de nascimento</label>
          <input type="date" name="nascimento" value={formData.nascimento} onChange={handleChange} />
          {errors.nascimento && <p className="error">{errors.nascimento}</p>}

          <label>CPF</label>
          <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="CPF" maxLength="14" />
          {errors.cpf && <p className="error">{errors.cpf}</p>}

          <label>Sexo</label>
          <select name="sexo" value={formData.sexo} onChange={handleChange}>
            <option value="">Selecione o sexo</option>
            <option value="Feminino">Feminino</option>
            <option value="Masculino">Masculino</option>
            <option value="Outro">Outro</option>
          </select>
          {errors.sexo && <p className="error">{errors.sexo}</p>}

          <label>E-mail</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Telefone</label>
          <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Telefone" maxLength={15} />
          {errors.telefone && <p className="error">{errors.telefone}</p>}


          {/* Documento de Identidade */}
          <label>Documento de Identidade</label>
          <input type="text" name="documentoIdentidade" value={formData.documentoIdentidade} onChange={handleChange} placeholder="Número do documento" />
          {errors.documentoIdentidade && <p className="error">{errors.documentoIdentidade}</p>}

          <div className="file-upload-area">
            <label className="file-upload-label">
              <img src="src/assets/cloud-upload.svg" alt="Ícone de nuvem" className="file-upload-icon" />
              <p>Clique aqui para selecionar o arquivo</p>
            </label>
            <input type="file" name="anexoIdentidade" className="file-upload-input" onChange={handleChange} />
            {errors.anexoIdentidade && <p className="error">{errors.anexoIdentidade}</p>}
          </div>

          {/* Endereço Residencial */}
          <h4>Endereço Residencial</h4>
          <label>CEP</label>
          <input type="text" name="cep" value={formData.cep} onChange={handleChange} placeholder="CEP" />
          {errors.cep && <p className="error">{errors.cep}</p>}

          <label>Rua</label>
          <input type="text" name="rua" value={formData.rua} onChange={handleChange} placeholder="Rua" />
          {errors.rua && <p className="error">{errors.rua}</p>}

          <label>Cidade</label>
          <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} placeholder="Cidade" />
          {errors.cidade && <p className="error">{errors.cidade}</p>}

          <div className="file-upload-area">
            <label className="file-upload-label">
              <img src="src/assets/cloud-upload.svg" alt="Ícone de nuvem" className="file-upload-icon" />
              <p>Clique aqui para selecionar o arquivo</p>
            </label>
            <input type="file" name="comprovanteResidencia" className="file-upload-input" onChange={handleChange} />
            {errors.comprovanteResidencia && <p className="error">{errors.comprovanteResidencia}</p>}
          </div>

          {/* Trilhas de Aprendizagem */}
          <h3>Trilhas de Aprendizagem</h3>
          <div className="trilhas">
            <label className="trilha-option">
              <input type="radio" name="trilha" value="front-end" checked={formData.trilha === 'front-end'} onChange={handleChange} />
              <span className="check-indicator"></span>
              <div className="trilha-icon">
                <img src="src/assets/icon-front.svg" alt="Front-end" />
              </div>
              <span>Programação front-end</span>
            </label>
            <label className="trilha-option">
              <input type="radio" name="trilha" value="back-end" checked={formData.trilha === 'back-end'} onChange={handleChange} />
              <span className="check-indicator"></span>
              <div className="trilha-icon">
                <img src="src/assets/icon-back.svg" alt="Back-end" />
              </div>
              <span>Programação back-end</span>
            </label>
            <label className="trilha-option">
              <input type="radio" name="trilha" value="jogos" checked={formData.trilha === 'jogos'} onChange={handleChange} />
              <span className="check-indicator"></span>
              <div className="trilha-icon">
                <img src="src/assets/icon-jogos.png" alt="Jogos" />
              </div>
              <span>Programação de jogos</span>
            </label>
            <label className="trilha-option">
              <input type="radio" name="trilha" value="design" checked={formData.trilha === 'design'} onChange={handleChange} />
              <span className="check-indicator"></span>
              <div className="trilha-icon">
                <img src="src/assets/icon-ux.svg" alt="Design" />
              </div>
              <span>Design de experiência</span>
            </label>
            <label className="trilha-option">
              <input type="radio" name="trilha" value="dados" checked={formData.trilha === 'dados'} onChange={handleChange} />
              <span className="check-indicator"></span>
              <div className="trilha-icon">
                <img src="src/assets/icon-dados.png" alt="Ciências de dados" />
              </div>
              <span>Ciências de dados</span>
            </label>
            {errors.trilha && <p className="error">{errors.trilha}</p>}
          </div>

          {/* Aceite dos termos */}
          <div className="final">
            <label className="checkbox-label">
              <input type="checkbox" name="aceite" checked={formData.aceite} onChange={handleChange} />{' '}
              Declaro que li e concordo com os Termos e Condições e com a Política de Privacidade
            </label>
            {errors.aceite && <p className="error">{errors.aceite}</p>}
            <div className="buttons">
              <button type="button" className="cancelar">Cancelar</button>
              <button type="submit" className="inscrever">Fazer Inscrição</button>
            </div>
          </div>
        </form>
      </div>
      <div className="form-right">
        <img src="src/assets/Ilustration.svg" alt="Ilustração" />
        <img src="src/assets/logo-trilhas-inova.svg" alt="Logo" />
      </div>
    </div>
  );
}
