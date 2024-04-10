/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ListServ = ({ usr }) => {

    const [list, setList] = useState('')

    const [open, setOpen] = useState(false)

    const [dado, setDado] = useState('')

    const [tipo, setTipo] = useState(0)

    const [motivo, setMotivo] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3005/Servicos/Listar', {
            params: {
                user: usr
            }
        })
            .then(resp => {
                console.log(resp)
                setList(resp.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const columns = [
        { field: "veiculo", headerName: 'Veículo', width: 150, align: 'center' },
        { field: "chassi", headerName: 'Chassi', width: 200 },
        { field: "placa", headerName: 'Placa', width: 150 },
        { field: "proprietario", headerName: 'Proprietário', width: 230 },
        { field: "situacaoServico", headerName: 'Situação', width: 200 },
        { field: "situacao", headerName: 'Serviço', width: 250 },
        {
            field: 'Opções', width: 150, renderCell: (cellValues) => {
                return (
                    <>
                        <Tooltip title='Detalhes'>
                            <IconButton
                                variant="text"
                                color="primary"
                                onClick={(e) => { handleClick(e, cellValues, 1) }}
                            >
                                <ContentPasteSearchIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Continuar'>
                            <IconButton
                                variant="text"
                                color="success"
                                onClick={(e) => { handleClick(e, cellValues, 2) }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Cancelar'>
                            <IconButton
                                variant="text"
                                color="error"
                                onClick={(e) => { handleClick(e, cellValues, 3) }}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                )
            }
        }
    ]

    console.log(list)
    const handleClick = (e, cellValues, num) => {
        setTipo(num)
        setDado(cellValues.row)
        setOpen(true)
    }

    const handClose = () => {
        setTipo(0)
        setDado('')
        setOpen(false)
    }

    console.log(dado)

    return (
        <>
            {dado !== '' && <Dialog
                maxWidth={"lg"}
                open={open}
                onClose={handClose}
                aria-labelledby='titulo'
                aria-describedby="descricao"
            >
                {tipo === 1 && <DialogTitle id='titulo'>Historico</DialogTitle>}
                {tipo === 3 && <DialogTitle id='titulo'>Solicitação de Cancelamento de Serviço</DialogTitle>}
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }} id='descricao' color='blue' fontSize='16pt' >
                        Descrição
                    </DialogContentText>
                    {tipo === 1 &&
                        <>
                            <Typography variant="h6" >Informações complementares do veículo</Typography>
                            <div style={{ display: 'flex', margin: '20px 0 0 0' }} >
                                <Table sx={{ minWidth: 650 }} size='small' aria-label='Tabela historico veículo' >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ width: 150, bgcolor: 'silver' }}>Veículo</TableCell>
                                            <TableCell sx={{ width: 100 }} >{dado.veiculo}</TableCell>
                                            <TableCell sx={{ width: 150, bgcolor: 'silver' }}>Placa</TableCell>
                                            <TableCell sx={{ width: 180 }} >{dado.placa}</TableCell>
                                            <TableCell sx={{ width: 150, bgcolor: 'silver' }}>Chassi</TableCell>
                                            <TableCell sx={{ width: 110 }} >{dado.chassi}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ width: 150, bgcolor: 'silver' }}>Motor</TableCell>
                                            <TableCell sx={{ width: 100 }} >{dado.motor}</TableCell>
                                            <TableCell sx={{ width: 150, bgcolor: 'silver' }}>Ano de Fabricação</TableCell>
                                            <TableCell sx={{ width: 180 }} >{dado.anoFabricacao}</TableCell>
                                            <TableCell sx={{ width: 150, bgcolor: 'silver' }}>Ano do Modelo</TableCell>
                                            <TableCell sx={{ width: 110 }} >{dado.anoModelo}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ width: 150, bgcolor: 'silver' }}>Tipo do Veículo</TableCell>
                                            <TableCell sx={{ width: 100 }} >{dado.tipoVeiculo}</TableCell>
                                            <TableCell sx={{ width: 150, bgcolor: 'silver' }}>Potência</TableCell>
                                            <TableCell sx={{ width: 180 }} >{dado.potencia}</TableCell>
                                            <TableCell sx={{ width: 150, bgcolor: 'silver' }}>Cor do Veículo</TableCell>
                                            <TableCell sx={{ width: 110 }} >{dado.corVeiculo}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ width: 150, bgcolor: 'silver' }}>Combustível</TableCell>
                                            <TableCell sx={{ width: 100 }} >{dado.combustivel}</TableCell>
                                            <TableCell sx={{ width: 150, bgcolor: 'silver' }}>Município</TableCell>
                                            <TableCell sx={{ width: 180 }} >{dado.municipio}</TableCell>
                                            <TableCell sx={{ width: 150, bgcolor: 'silver' }}>UF</TableCell>
                                            <TableCell sx={{ width: 110 }} >{dado.uf}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                            <Typography sx={{ margin: '20px 0 0 0' }} variant="h6">Informações do cadastro do veículo</Typography>
                            <div style={{ display: 'flex', margin: '20px 0 0 0' }} >
                                <Table sx={{ minWidth: 650 }} size='small' aria-label='Tabela historico serviço' >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ width: 120, bgcolor: 'silver' }}>Cadastrado Por</TableCell>
                                            <TableCell sx={{ width: 280 }} >{dado.cadastradoPor.nome}</TableCell>
                                            <TableCell sx={{ width: 120, bgcolor: 'silver' }}>Cadastrado Em</TableCell>
                                            <TableCell sx={{ width: 280 }} >{dado.cadastradoPor.Data}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </div>
                            <div style={{ display: 'flex', margin: '20px 0 0 0' }} >
                                <Table sx={{ minWidth: 650 }} size='small' aria-label='Tabela historico serviço' >
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ width: 150, bgcolor: 'silver' }}>Serviço</TableCell>
                                            <TableCell sx={{ width: 100 }} >{dado.situacao}</TableCell>
                                            <TableCell sx={{ width: 150, bgcolor: 'silver' }}>GRT</TableCell>
                                            <TableCell sx={{ width: 180 }} >{dado.grtUtilizada}</TableCell>
                                            <TableCell sx={{ width: 150, bgcolor: 'silver' }}>Situação</TableCell>
                                            <TableCell sx={{ width: 110 }} >{dado.situacaoServico}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </>
                    }
                    {tipo === 3 &&
                        <>
                            <Typography sx={{ m: '20px 0' }}>Preencha o motivo do cancelamento para que a solicitação seja avaliada!</Typography>
                            <TextField
                                label="Preencha o motivo aqui!"
                                onChange={(e) => setMotivo(e.target.value)}
                                multiline
                                rows={6}
                                fullWidth
                            />
                        </>
                    }
                </DialogContent>
                <DialogActions>
                    {tipo === 3 && <Button variant="text" onClick={handClose} disabled={motivo.length > 10} >concluir</Button>}
                    <Button variant="text" color='error' onClick={handClose} >Fechar</Button>
                </DialogActions>
            </Dialog>}
            <div style={{ height: 595, width: "100%" }}>
                {list !== '' ?
                    <DataGrid
                        getRowId={(row) => row._id}
                        columns={columns}
                        rows={list}
                        disableSelectionOnClick
                    /> : null
                }
            </div>
        </>
    )
}

export default ListServ;