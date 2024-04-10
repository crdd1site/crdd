
import { Alert, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const AddGrt = ({ usr }) => {


    const [addgrt, setAddGrt] = useState({
        quantidade: 50,
        valor: 1.50,
    })

    const [btnminus, setBtnMinus] = useState(false)

    const [open, setOpen] = useState(false)

    const [alerta, setAlerta] = useState({
        msg: '',
        status: 'success'
    })

    const [openAlert, setOpenAlert] = useState(false)

    const handClose = () => {
        setOpen(false);
    }

    const handCloseAlert = () => {
        setOpenAlert(false)
    }

    const confirmarGrt = () => {
        var d = dayjs();
        axios.post('http://localhost:3005/grt/solicitar', {
            loginUser: usr,
            GRT: {
                quantidade: addgrt.quantidade,
                valor: addgrt.valor * addgrt.quantidade,
                data: `${d.locale('pt-BR').format("dddd, DD")} de ${d.locale('pt-BR').format("MMMM")} de ${d.locale('pt-BR').format('YYYY')} `,
                hora: d.format('HH:MM:ss')
            }
        })
            .then(resp => {
                if ( resp.data.situacao === "SOLICITADO" ) {
                    setOpen(false)
                    setAlerta(a => ({...a, msg: 'GRTs solicitadas com sucesso!'}))
                    setTimeout(() => {
                        setOpenAlert(true)
                    }, 200);
                }
                console.log(resp);

            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        if (addgrt.quantidade < 99) {
            setBtnMinus(true)
        } else {
            setBtnMinus(false)
        }
    }, [addgrt])

    const Confirmacao = () => {
        return (
            <Dialog
                open={open}
                onClose={handClose}
                aria-labelledby='titulo'
            >
                <DialogTitle id='titulo'>
                    Confirmar a solicitação das GRTs
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ao confirmar a solicitação será cobrado o valor de R$: {(addgrt.valor * addgrt.quantidade).toFixed(2)} pela
                        quantidade de {addgrt.quantidade} GRTs solicitadas.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={confirmarGrt} >Confirmar</Button>
                    <Button onClick={handClose} >Sair</Button>
                </DialogActions>
            </Dialog>
        )
    }


    return (
        <>
            <Snackbar open={openAlert} autoHideDuration={5000} onClose={handCloseAlert} >
                <Alert variant='filled' onClose={handCloseAlert} severity={alerta.status} >{alerta.msg}</Alert>
            </Snackbar>
            <Confirmacao />
            <Box>
                <Typography variant="h6" >Valor da GRT (unidade): R${addgrt.valor.toFixed(2)}</Typography>
                <Typography variant='h6' >Quantidade de GRTs solicitadas: {addgrt.quantidade}</Typography>
                <Typography variant='h6' >Valor total das GRTs: R$: {(addgrt.valor * addgrt.quantidade).toFixed(2)}</Typography>
                <ButtonGroup sx={{ m: '30px 0 0 0' }} variant="contained" aria-label='controla-quantidade-grt' >
                    <Button sx={{ fontWeight: 600, letterSpacing: 1, fontSize: 18 }} onClick={() => setAddGrt(a => ({ ...a, quantidade: addgrt.quantidade + 50 }))} >+ 50</Button>
                    <Button sx={{ fontWeight: 600, letterSpacing: 1, fontSize: 18 }} onClick={() => setAddGrt(a => ({ ...a, quantidade: addgrt.quantidade - 50 }))} disabled={btnminus} >- 50</Button>
                </ButtonGroup>
                <p></p>
                <Button onClick={() => setOpen(true)} sx={{ m: '30px 0 0 0' }} >Solicitar</Button>
            </Box>
        </>
    )
}

export default AddGrt;