/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const ListUsr = ({ usr }) => {

    console.log(usr)

    const [listuser, setListuser] = useState('')

    const [ changeCadastro, setChangeCadastro ] = useState('')

    const [ open, setOpen ] = useState(false);

    const handClose = () => {
        setOpen(false);
    }  

    useEffect(() => {
        axios.get('http://localhost:3005/Usuarios/Listar', {
            params: {
                user: usr
            }
        })
            .then((res) => {
                res.data && setListuser(res.data)
            })
            .catch((err) => console.log(err))
    }, [])
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 20, editable: false, hide: true },
        { field: 'nome', headerName: 'Nome', width: 240, editable: true },
        { field: 'rg', headerName: 'RG', width: 150, editable: true },
        { field: 'cpf', headerName: 'CPF', width: 150, editable: true },
        { field: 'email', headerName: 'Email', width: 240, editable: true, align: "right" },
        { field: 'nCrddrs', headerName: 'Registro CRDD-RG', width: 150, editable: true, hide: true },
        { field: 'tel', headerName: 'Telefone', width: 150, editable: true },
        { field: 'cep', headerName: 'Cep', width: 150, editable: true },
        { field: 'logradouro', headerName: 'Rua', width: 150, editable: true, hide: true },
        { field: 'numero', headerName: 'Numero', width: 150, editable: true, hide: true },
        { field: 'complemento', headerName: 'Complemento', width: 150, editable: true, hide: true },
        { field: 'bairro', headerName: 'Bairro', width: 150, editable: true, hide: true },
        { field: 'cidade', headerName: 'Cidade', width: 200, editable: true },
        { field: 'uf', headerName: 'UF', width: 150, editable: true, hide: true },
        { field: 'usuariotipo', headerName: 'Tipo de usuário', width: 150, editable: false, hide: true },
    ];

    const AlteraDado = (e) => {
        setChangeCadastro(e)
    }

    const [ dados, setDados ] = useState('')

    const ConfirmaDado = (e) => {
        console.log('teste1', e)
        console.log( 'teste' ,changeCadastro[e])
        setDados(a => ({ ...a,
            nome: changeCadastro[e.id].nome.value,
            rg: changeCadastro[e.id].rg.value,
            cpf: changeCadastro[e.id].cpf.value,
            email: changeCadastro[e.id].email.value,
            nCrddrs: changeCadastro[e.id].nCrddrs.value,
            tel: changeCadastro[e.id].tel.value,
            cep: changeCadastro[e.id].cep.value,
            logradouro: changeCadastro[e.id].logradouro.value,
            numero: changeCadastro[e.id].numero.value,
            complemento: changeCadastro[e.id].complemento.value,
            bairro: changeCadastro[e.id].bairro.value,
            cidade: changeCadastro[e.id].cidade.value,
            uf: changeCadastro[e.id].uf.value,
            _id: e.row._id,
        }))
        setOpen(true)
    }

    const AlterUser = () => {
        axios.post("http://localhost:3005/Atualizar/Usuario", {
            dados
        })
        .then((resp) => {
            console.log(resp)
            setOpen(false)
        })
        .catch((err) => console.log(err))
        
    }

    console.log(listuser, usr, changeCadastro)

    return (
        <>
        <Dialog
            open={open}
            onClose={handClose}
            aria-labelledby="titulo"
            aria-describedby="descricao"
        >
            <DialogTitle id='titulo'>
                Alteração de Cadastro
            </DialogTitle>
            <DialogContent>
                <DialogContentText id='descricao'>
                    Confirme para realizar a alteração de cadastro
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={AlterUser} >Confirmar</Button>
                <Button onClick={handClose} >Cancelar</Button>
            </DialogActions>
        </Dialog>
            <div style={{ height: 595, width: '100%' }}>
                { listuser && 
                    <DataGrid
                        // onStateChange={Teste}
                        onEditRowsModelChange={AlteraDado}
                        onRowEditStop={ConfirmaDado}
                        editMode="row"
                        columns={columns} 
                        rows={listuser} 
                    />}
            </div>
        </>
    )
}

export default ListUsr;