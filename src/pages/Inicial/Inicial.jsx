import Cabecalho from "../Cabecalho";
import style from './Inicial.module.scss';
import { Alert, Button, Paper, Snackbar, TextField } from '@mui/material'
import { useState } from "react";
import axios from 'axios';

const Inicial = () => {

    

    const [ open, setOpen ] = useState(false);

    const handClose = () => { setOpen(false); }

    const [ msg, setMsg ] = useState('');
    const [ status, setStatus ] = useState('success'); 

    const [ log, setLog ] = useState({
        login: '',
        senha: ''
    })
    
    const Login = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3005/Logar', {
            login: log.login,
            senha: log.senha
        })
        .then((response) => {
            if(response.status === 200) {
                if(!response.data) {
                    setMsg('Login ou Senha incorreto!')
                    setStatus('error')
                    setOpen(true)
                } else {
                    setMsg('Login realizado com Sucesso!')
                    setStatus('success')
                    setOpen(true)
                    localStorage.setItem('usr', JSON.stringify(response.data))
                    setTimeout(() => {
                        window.location.href = "Dashboard";
                    }, 3000)
                }
            }
        })
        .catch((err) => {
            setMsg('Houve um erro no servidor, tente novamente mais tarde!')
            setStatus('error')
            setOpen(true)
        })
        .finally(() => {
            setLog(a => ({...a, login: '', senha: ''}))
        })
    }

    // console.log(localStorage.getItem('usr'))

    return (
        <>
            <Cabecalho />
            <Snackbar open={open} autoHideDuration={5000} onClose={handClose} >
                <Alert variant='filled' onClose={handClose} severity={status} >{msg}</Alert>
            </Snackbar>
            <div className={style.nav}>
                <p className={style.navTexto}>Inicial</p>
                <p className={style.navTexto}>Sobre</p>
            </div>
            <div className={style.box}>
                <div className={style.login}>
                    <Paper elevation={5}>
                        <h3>Login</h3>
                        <form id='formulario' className={style.formulario} onSubmit={Login}>
                            <div>
                                <TextField sx={{m: '10px 0'}} fullWidth label='Usuário' size="small" required value={log.login} onChange={e => setLog(a => ({...a, login: e.target.value}))}  />
                            </div>
                            <div>
                                <TextField sx={{m: '10px 0'}} fullWidth label='Senha' size='small' required value={log.senha} onChange={e => setLog(a => ({...a, senha: e.target.value}))} type="password" />
                            </div>
                            <div>
                                <Button sx={{m: '10px 0'}} fullWidth variant="contained" color="success" type="submit" >Logar</Button>
                            </div>
                        </form>
                        <p>Esqueci minha senha</p>
                    </Paper>
                </div>
                <div className={style.container}>
                    <Paper elevation={5} sx={{ p: 2, borderRadius: '10px' }}>
                        <h3 className={style.titulo}>Confira os serviços disponíveis:</h3>
                        <div className={style.lista}>
                            <div>
                                <h4>Alteração de Documento</h4>
                                <li>Alteração de Informações do Proprietário</li>
                                <li>Alteração de Informações de Veículos</li>
                                <li>Alteração de Restrição Financeira</li>
                            </div>
                            <div>
                                <h4>Autorização</h4>
                                <li>Autorização para Alteração de Caracteristicas</li>
                                <li>Autorização para Fabricação de Placa</li>
                                <li>Autorização para Regravação de Chassi</li>
                                <li>Autorização para Regravação de Motor</li>
                                <li>Autorização para Colocação de Lacre em Placa</li>
                            </div>
                            <div>
                                <h4>Baixa</h4>
                                <li>Baixa de Placa de Experiência ou de Fabricante</li>
                                <li>Baixa para Militarização</li>
                                <li>Baixa para outro UF</li>
                                <li>Baixa para outro Pais</li>
                                <li>Baixa Simples de Veículo</li>
                            </div>
                            <div>
                                <h4>Processo</h4>
                                <li>Comunicação de Processo</li>
                                <li>Cancelamento de Processo</li>
                            </div>
                            <div>
                                <h4>Correção</h4>
                                <li>Correção das Observações do CRLV-E</li>
                                <li>Correção de Chassi</li>
                                <li>Correção de Informações do Proprietário</li>
                                <li>Correção de Informações do Veículo</li>
                                <li>Correção de Município</li>
                                <li>Correção de Município</li>
                            </div>
                            <div>
                                <h4>Inclusão</h4>
                                <li>Inclusão de Restrição Financeira</li>
                                <li>Inclusão de Placa de Experiências ou de Fabricante</li>
                                <li>Inclusão de Averbação de Execução</li>
                            </div>
                            <div>
                                <h4>Troca/Transferência</h4>
                                <li>Transferência de Propriedade de Veículo de Outra UF</li>
                                <li>Transferência de Propriedade de Veículo do RS</li>
                                <li>Troca de Município de Veículo de Outra UF</li>
                                <li>Troca de Município de Veículo do RS</li>
                            </div>
                            <div>
                                <h4>Outros</h4>
                                <li>Emissão de Certidão</li>
                                <li>Impressão do CRLV-E</li>
                                <li>Liberação de Restrição Financeira</li>
                                <li>Licença Especial de Trânsito</li>
                                <li>Mudança para Placa Única de Placa Mercosul</li>
                                <li>Primeiro Emplacamento</li>
                                <li>Renovação de Placa de Experiência ou Fabricante</li>
                                <li>Reserva de Placa</li>
                                <li>Restrição de Transferência</li>
                                <li>Solicitação de Vistoria</li>
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        </>
    )
}

export default Inicial;