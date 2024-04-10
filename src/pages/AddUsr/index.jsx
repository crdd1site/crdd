import { Alert, Button, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import style from './AddUsr.module.scss'

const AddUsr = ({ usr }) => {

    const [dados, setDados] = useState({
        nome: '',
        rg: '',
        cpf: '',
        nCrddrs: '',
        email: '',
        tel: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        usuariotipo: '',
        pai: usr.nome,
        situacao: 'ativo',
        login: '',
        senha: '',
    })

    const [err, setErr] = useState({
        login: false,
        msgLogin: ""
    })

    const [ open, setOpen ] = useState(false)
    const [ status, setStatus ] = useState("success")
    const [ msg, setMsg ] = useState('')

    const handClose = () => {
        setOpen(false)
    }

    const AddUser = (e) => {
        if(e.target.name === 'cep'){
            setDados(a => ({ ...a,  cep: e.target.value.replace(/[^0-9]/g, "").slice(0, 8) }))
        } else if (e.target.name === 'rg') {
            setDados(a => ({ ...a,  rg: e.target.value.replace(/[^0-9]/g, "") }))
        } else if (e.target.name === 'cpf') {
            setDados(a => ({ ...a,  cpf: e.target.value.replace(/[^0-9]/g, "") }))
        } else if (e.target.name === 'tel') {
            setDados(a => ({ ...a,  tel: e.target.value.replace(/[^0-9]/g, "") }))
        } else {
            setDados(a => ({ ...a, [e.target.name]: e.target.value }))
        }      
    }

    const ValidaLogin = () => {
        if (dados.login.length > 4) {
            axios.get("http://localhost:3005/ValidaUsuario", {
                params: {
                    login: dados.login
                }
            })
                .then((resp) => {
                    resp.data === 'invalido' ?
                        setErr(a => ({ ...a, login: true, msgLogin: 'O Login já existe! Digite um outro Login!' })) :
                        setErr(a => ({ ...a, login: false, msgLogin: '' }))
                })
                .catch((error) => { })
        } else if (dados.login.length === 0) {
            setErr(a => ({ ...a, login: false, msgLogin: '' }))
        } else {
            setErr(a => ({ ...a, login: true, msgLogin: 'Login no minimo 5 caracteres!' }))
        }
    }

    const AddCep = () => {
        if (dados.cep.length === 8) {
            axios.get(`http://viacep.com.br/ws/${dados.cep}/json/`)
                .then((resp) => {
                    setDados(a => ({
                        ...a,
                        logradouro: resp.data.logradouro,
                        complemento: resp.data.complemento,
                        bairro: resp.data.bairro,
                        cidade: resp.data.localidade,
                        uf: resp.data.uf
                    }))
                })
        }
    }
    
    const CadastrarUsuario = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3005/Cadastro/Usuario", {
            dados
        })
        .then((resp) => {
            console.log(resp)
            if (resp.data.keyValue) {
                setOpen(true)
                setStatus('error')
                setMsg(`Cadastro de usuário não foi realizado o dado ${resp.data.keyValue.login} já foi utilizado!`)
            } else {
                setOpen(true)
                setStatus('success')
                setMsg("Cadastro de usuário realizado com sucesso!")
            }
        })
        .catch((er) => console.log(er))
    }

    return (
        <>
            <Snackbar open={open} autoHideDuration={5000} onClose={handClose} >
                <Alert variant="filled" onClose={handClose} severity={status} > {msg} </Alert>
            </Snackbar>
            <form onSubmit={CadastrarUsuario}>
                <FormControl id='usuariotipo' variant="standard" size="small" fullWidth required>
                    <InputLabel id='Sel-User'>Tipo de Usuário</InputLabel>
                    <Select
                        labelId="Sel-User"
                        name='usuariotipo'
                        value={dados.usuariotipo}
                        label='Tipo de Usuário'
                        onChange={AddUser}
                    >
                        <MenuItem value="administrador">Administrador</MenuItem>
                        <MenuItem value="despachante">Despachante</MenuItem>
                        <MenuItem value="preposto">DAP</MenuItem>
                    </Select>
                </FormControl>
                <TextField name='nome' onChange={AddUser} value={dados.nome} label='Nome' variant="standard" fullWidth required />
                <TextField name='rg' onChange={AddUser} value={dados.rg} label='RG' variant="standard" fullWidth required />
                <TextField name='cpf' onChange={AddUser} value={dados.cpf} label='CPF' variant="standard" fullWidth required />
                <TextField name='email' onChange={AddUser} value={dados.email} type='email' label='Email' variant="standard" fullWidth required />
                { dados.usuariotipo === 'despachante' && <TextField name='nCrddrs' onChange={AddUser} value={dados.nCrddrs} label='Registro CRDD-RG' variant="standard" fullWidth required /> }
                <TextField name='login' onChange={AddUser} value={dados.login} onBlur={ValidaLogin} label='Login' variant="standard" error={err.login} helperText={err.msgLogin} fullWidth required />
                <TextField name='senha' onChange={AddUser} value={dados.senha} label='Senha' variant="standard" fullWidth required />
                <TextField name='tel' onChange={AddUser} value={dados.tel} label='Telefone' variant="standard" fullWidth required />
                <TextField name='cep' onChange={AddUser} value={dados.cep} onBlur={AddCep} label='CEP' variant="standard" fullWidth required />
                <TextField name='logradouro' onChange={AddUser} value={dados.logradouro} label='Rua' variant="standard" fullWidth required />
                <TextField name='numero' onChange={AddUser} value={dados.numero} label='Numero' variant="standard" fullWidth required />
                <TextField name='complemento' onChange={AddUser} value={dados.complemento} label='Complemento' variant="standard" fullWidth />
                <TextField name='bairro' onChange={AddUser} value={dados.bairro} label='Bairro' variant="standard" fullWidth required />
                <TextField name='cidade' onChange={AddUser} value={dados.cidade} label='Municipio' variant="standard" fullWidth required />
                <TextField name='uf' onChange={AddUser} value={dados.uf} label='UF' variant="standard" fullWidth required />
                <div className={style.botao}>
                    <Button sx={{ width: 250 }} variant="contained" color='success' type='submit' >Cadastrar</Button>
                </div>
            </form>
        </>
    )
}

export default AddUsr;