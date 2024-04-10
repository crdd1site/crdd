/* eslint-disable react-hooks/exhaustive-deps */
import Menu from './Menu'
import Cabecalho from "../Cabecalho";
import style from './Dashboard.module.scss';
import { useEffect, useState } from 'react';
import { CountGrt, GraficoGRT, GraficoUso, Home } from '../Home';
import { Paper } from '@mui/material';
import axios from 'axios';
import AddUsr from '../AddUsr';
import ListUsr from '../ListUsr';
import AddServ from '../AddServ';
import ListServ from '../ListServ';
import AddGrt from '../AddGrt';
import ListGrt from '../ListGrt';

const Dashboard = () => {

    const usr = JSON.parse(localStorage.getItem('usr'))

    const [cliente, setCliente] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3005/UserLoading', {
            params: {
                usuario: usr
            }
        })
            .then((response) => {
                setCliente(response.data[0])
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const [navegar, setNavegar] = useState({
        home: true,
        add_usr: false,
        list_usr: false,
        add_serv: false,
        list_serv: false,
        add_grt: false,
        list_grt: false,
        msg: 'Inicio'
    })

    console.log(cliente)


    const Linha1 = () => {
        if (cliente.usuariotipo) {
            if (cliente.usuariotipo === 'master' || cliente.usuariotipo === 'administrador') {
                return;
            } else {
                return (
                    <>
                        <div className={style.line1}>
                            <div className={style.countGrt}>
                                <Paper elevation={8} sx={{ p: 2, height: 80, display: 'flex', alignItems: 'center' }}>
                                    <CountGrt usr={usr} />
                                </Paper>
                            </div>
                            <div className={style.pendencia}>
                                <Paper elevation={8} sx={{ p: 2, height: 80, display: 'flex', alignItems: 'center' }}>
                                    <CountGrt usr={usr} />
                                </Paper>
                            </div>
                        </div>
                        <div className={style.line1}>
                            <div className={style.graficogrt}>
                                <Paper elevation={8} sx={{ p: 2, minHeight: 300, display: 'flex', alignItems: 'center' }}>
                                    <GraficoGRT usr={cliente} />
                                </Paper>
                            </div>
                            <div className={style.graficouso}>
                                <Paper elevation={8} sx={{ p: 2, minHeight: 300, display: 'flex', alignItems: 'center' }}>
                                    <GraficoUso usr={cliente} />
                                </Paper>
                            </div>
                        </div>
                    </>
                )
            }
        }
    }

    return (
        <>
            <Cabecalho />
            <div className={style.titulo} ><p>{navegar.msg}</p></div>
            <div className={style.centerBlock}>
                <div className={style.menu}>
                    <Menu setNavegar={setNavegar} cliente={cliente.usuariotipo} />
                </div>
                <div className={style.actionBlock}>
                    <div className={style.welcome}>
                        <Paper elevation={8} sx={{ p: 4 }}>
                            {navegar.home && <Home usr={usr} />}
                            {navegar.add_usr && <AddUsr usr={usr} />}
                            {navegar.list_usr && <ListUsr usr={cliente} />}
                            {navegar.add_serv && <AddServ usr={usr} />}
                            {navegar.list_serv && <ListServ usr={cliente} />}
                            {navegar.add_grt && <AddGrt usr={usr} />}
                            {navegar.list_grt && <ListGrt usr={cliente} />}
                        </Paper>
                    </div>
                    {navegar.home && <Linha1 />}
                </div>
            </div>
        </>
    )
}

export default Dashboard;