/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"
import axios from "axios";
import { useEffect, useState } from "react";

const ListGrt = ({ usr }) => {

    const [open, setOpen] = useState(false);

    const [linha, setLinha] = useState('')

    const [desp, setDesp] = useState({
        row: {
            nome: '',
            quantidade: '',
            valor: 0
        }
    })

    const [cadGrt, setCadGrt] = useState('')

    const [grtTotal, setGrtTotal] = useState('')

    const [sol, setSol] = useState(true);

    const [motivo, setMotivo] = useState('')

    const [inv, setInv] = useState(true)

    useEffect(() => {
        axios.get("http://localhost:3005/grt/Listar", {
            params: {
                user: usr
            }
        })
            .then((resp) => {
                // console.log(resp)
                setLinha(resp.data)
            })
            .catch((err) => console.log(err))
    }, [])

    if (linha !== '') {
        for (let x = 0; x < linha.length; x++) {
            linha[x].id = x
        }
    }


    const columns = [
        { field: 'nome', headerName: 'Nome', width: 250 },
        { field: 'quantidade', headerName: 'QTD GRT', width: 80 },
        { field: 'situacao', headerName: 'Situacao da GRT', width: 130 },
        { field: 'data', headerName: 'Solicitado Em', width: 250 },
        { field: 'hora', headerName: 'Solicitado As', width: 120 },
        { field: 'valor', headerName: 'Valor R$', width: 100 },
    ]

    const handClose = () => {
        setRes(0)
        setCadGrt('')
        setGrtTotal('')
        setOpen(false)
        setTimeout(() => {
            setSol(true)
        }, 500);
    }

    const selectClient = (e) => {
        setDesp(e)
        setOpen(true)
    }

    const addGrt = (e) => {
        let alpha = e.target.value.slice(1, 7)
        let beta = e.target.value.slice(0, 1)
        setCadGrt(`${beta.replace(/[^a-zA-Z]/g, '').toUpperCase()}${alpha.replace(/[^0-9]/g, '')}`)
    }

    const letra = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "U", "V", "W", "X", "Y", "Z"];
    var numero = []

    function numerador(num, len) {
        let a = num;
        let b = a.length;
        while (b < len) {
            a = "0" + a
            b++
        }
        return (a)
    }

    const countGrt = (e) => {
        if (e.target.value.length === 7) {
            let omega = e.target.value.slice(1, 7);
            let teta = e.target.value.slice(0, 1);
            var novaLetra = teta;
            for (let x = 0; x < desp.row.quantidade; x++) {
                if (omega.length < 7) {
                    numero[x] = `${novaLetra}${numerador(omega, 6)}`;
                } else {
                    for (let i = 0; 1 < letra.length; i++) {
                        if (teta === letra[i]) {
                            novaLetra = letra[i + 1];
                            break;
                        }
                    }
                    numero[x] = `${novaLetra}${numerador(omega.slice(1), 6)}`
                }
                if (x === desp.row.quantidade - 1) {
                    setGrtTotal(numero)
                }
                omega = parseInt(omega)
                omega = omega + 1
                omega = omega.toString()
            }
        }
    }

    const [res, setRes] = useState('')

    const CadastrarGrt = (e) => {
        e.preventDefault();
        // console.log(grtTotal)
        // console.log(desp.row)
        axios.post("http://localhost:3005/GerarGRT", {
            row: desp.row,
            grt: { grtTotal: grtTotal }
        })
            .then(resp => {
                console.log(resp)
                setRes(resp.status)
            })
            .catch(error => console.log(error))
    }

    const ValidaMotivo = (e) => {
        setMotivo(e.target.value)
    }

    useEffect(() => {
        if (motivo.length > 6) {
            setInv(false)
        } else {
            setInv(true)
        }
    }, [motivo])

    const Lista = () => {
        if (usr.usuariotipo === 'master' || usr.usuariotipo === 'administrador') {
            return (
                <>
                    {linha !== '' ?
                        <DataGrid
                            onCellDoubleClick={selectClient}
                            rowHeight={30}
                            columns={columns}
                            rows={linha}
                        />
                        :
                        null
                    }
                </>
            )
        } else {
            return (
                <>
                    {linha !== '' ?
                        <DataGrid
                            rowHeight={30}
                            columns={columns}
                            rows={linha}
                        />
                        :
                        null
                    }
                </>
            )
        }
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handClose}
                aria-labelledby='titulo'
                aria-describedby="descricao"
            >
                <DialogTitle id='titulo'>Solicitação de GRT</DialogTitle>
                <DialogContent>
                    <DialogContentText id='descricao'>
                        {`Despachante ${desp.row.nome} solicita a quantidade de ${desp.row.quantidade} GRTs no valor de R$ ${desp.row.valor.toFixed(2)}.`}
                    </DialogContentText>
                    {sol === true ?
                        <div style={{ display: 'inline-grid' }} >
                            <TextField variant="standard" sx={{ mt: 5 }} label='GRT inicial' size="small" onChange={addGrt} value={cadGrt} onBlur={countGrt} />
                            <Typography sx={{ mt: 2 }}> GRT final:</Typography>
                            <Typography >{grtTotal[desp.row.quantidade - 1]}</Typography>
                            {res === 200 && <Alert sx={{ mt: 4 }} variant="filled" severity='success'>GRTs cadastradas com sucesso!</Alert>}
                        </div>
                        :
                        <div>
                            <TextField sx={{ mt: 2 }} label='Motivo do cancelamento' multiline rows={5} fullWidth onChange={ValidaMotivo} />
                        </div>}
                    <DialogActions>
                        {sol === true ?
                            <Button onClick={CadastrarGrt} disabled={grtTotal.length !== desp.row.quantidade} >Validar</Button> :
                            <Button onClick={CadastrarGrt} disabled={inv} >Confirmar</Button>}
                        {sol === true && <Button onClick={() => setSol(false)} >Cancelar</Button>}
                        <Button onClick={handClose} >Sair</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <div style={{ height: 595, width: "100%" }}>
                <Lista />
            </div>
        </>
    )
}

export default ListGrt;