/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import dayjs from 'dayjs';
import ptBr from "dayjs/locale/pt-br";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

const Home = ({ usr }) => {


    const ano = dayjs().locale(ptBr).format("YYYY")
    const dia = dayjs().locale(ptBr).format("DD")
    const mes = dayjs().locale(ptBr).format("MMMM")
    const hoje = dayjs().locale(ptBr).format("dddd")
    return (
        <>
            <Typography variant="h5">CRDD-RS</Typography>
            <Typography>{hoje}, {dia} de {mes} de {ano}</Typography>
            <Typography>Seja bem vindo, {usr.nome}</Typography>
        </>
    )
}

export { Home };


const CountGrt = ({ usr }) => {

    const [grt, setGrt] = useState('Loading...')

    useEffect(() => {
        axios.get('http://localhost:3005/GRT/Utilizaveis', {
            params: {
                user: usr._id
            }
        })
            .then((response) => {
                setGrt(response.data.length)
            })
            .catch((error) => {
                // console.log(error)
            })
    }, [usr._id])

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography>GRTs Disponíveis: </Typography>
                <Typography color={grt < 20 ? "red" : "blue"} > {grt} </Typography>
            </Box>
        </>
    )
}

export { CountGrt };

const GraficoGRT = ({ usr }) => {

    ChartJS.register(ArcElement, Tooltip, Legend);

    const [grts, setGrts] = useState({});
    const [somador, setSomador] = useState(1)

    console.log(usr)

    useEffect(() => {
        axios.get("http://localhost:3005/grt/Listar", {
            params: {
                user: usr
            }
        })
            .then(resp => {
                setGrts(resp.data)
                for (let x = 0; x < resp.data.length; x++) {
                    if (resp.data.situacao === "GRT ATIVA") {
                        setSomador(somador => somador + 1)
                    }
                }
                // let serv = resp.data.filter(se => )
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    console.log(somador)

    const funcao = () => {
        var ret = []
        for (let x = 0; x < grts.length; x++) {
            console.log('tt', x)
            ret[x] = grts[x].quantidade
            console.log('t', grts[x])
        }
        return ret
    }

    console.log(funcao(), grts)

    const data = {
        labels: ['GRTs Ativos', 'GRTs Utilizados'],
        datasets: [
            {
                label: 'Controle de GRT',
                data: funcao(),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            }
        ]
    }

    console.log(grts)

    return (
        <>
            <div style={{ width: 300 }}>
                <Pie data={data} />
            </div>
        </>
    )
}

export { GraficoGRT };

const GraficoUso = ({ usr }) => {

    return (
        <>
            Opa teste
        </>
    )
}

export { GraficoUso }