import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import CommuteIcon from '@mui/icons-material/Commute';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddchartIcon from '@mui/icons-material/Addchart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const Menu = ({ setNavegar, cliente }) => {

    const [open, setOpen] = useState({
        open1: false,
        open2: false,
        open3: false,
    })

    const handClick = (e) => {
        var porta;
        if (e === 'usuario') {
            porta = document.getElementById(e)
            porta.addEventListener("click", setOpen(a => ({ ...a, open1: !open.open1 })))
        } else if (e === 'servico') {
            porta = document.getElementById(e)
            porta.addEventListener("click", setOpen(a => ({ ...a, open2: !open.open2 })))
        } else if (e === 'grt') {
            porta = document.getElementById(e)
            porta.addEventListener("click", setOpen(a => ({ ...a, open3: !open.open3 })))
        }
    }

    return (
        <>
            <List
                component='nav'
                aria-labelledby="Lista-do-Menu"
                subheader={
                    <ListSubheader sx={{ fontSize: 20, fontWeight: 600 }} component="div" id='Lista-do-Menu'>
                        Menu
                    </ListSubheader>
                }
            >
                <ListItemButton
                    sx={{ height: 30 }}
                    onClick={() => setNavegar(a => ({
                        ...a,
                        home: true,
                        add_usr: false,
                        list_usr: false,
                        add_serv: false,
                        list_serv: false,
                        add_grt: false,
                        list_grt: false,
                        msg:'Inicio'
                    }))}>
                    <ListItemIcon>
                        <HomeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary='Inicial' />
                </ListItemButton>

                {cliente ? cliente !== 'despachante' ? cliente !== 'auxiliar' ?
                    <>
                        <ListItemButton sx={{ height: 30 }} id='usuario' onClick={() => handClick('usuario')}>
                            <ListItemIcon>
                                <AccountCircleIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary='Usuário' />
                            {open.open1 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open.open1} timeout='auto' unmountOnExit>
                            <List component='div' disablePadding>
                                <ListItemButton
                                    sx={{ pl: 4, height: 30 }}
                                    onClick={() => setNavegar(a => ({
                                        ...a,
                                        home: false,
                                        add_usr: true,
                                        list_usr: false,
                                        add_serv: false,
                                        list_serv: false,
                                        add_grt: false,
                                        list_grt: false,
                                        msg: 'Cadastrar Usuário '
                                    }))}>
                                    <ListItemIcon>
                                        <PersonAddIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary='Cadastrar Usuário' />
                                </ListItemButton>
                                <ListItemButton
                                    sx={{ pl: 4, height: 30 }}
                                    onClick={() => setNavegar(a => ({
                                        ...a,
                                        home: false,
                                        add_usr: false,
                                        list_usr: true,
                                        add_serv: false,
                                        list_serv: false,
                                        add_grt: false,
                                        list_grt: false,
                                        msg: 'Listar Usuários '
                                    }))}>
                                    <ListItemIcon>
                                        <GroupIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary='Listar Usuários' />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </> : null : null : null}

                <ListItemButton sx={{ height: 30 }} id='servico' onClick={() => handClick('servico')}>
                    <ListItemIcon>
                        <CommuteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary='Serviço' />
                    {open.open2 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open.open2} timeout='auto' unmountOnExit>
                    <List component="div" disablePadding>
                        {cliente ? cliente !== 'master' ? cliente !== 'administrador' ?
                            <>
                                <ListItemButton
                                    sx={{ pl: 4, height: 30 }}
                                    onClick={() => setNavegar(a => ({
                                        ...a,
                                        home: false,
                                        add_usr: false,
                                        list_usr: false,
                                        add_serv: true,
                                        list_serv: false,
                                        add_grt: false,
                                        list_grt: false,
                                        msg: 'Solicitar Serviço '
                                    }))}>
                                    <ListItemIcon>
                                        <AddchartIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Solicitar Serviço" />
                                </ListItemButton>
                            </> : null : null : null}
                        <ListItemButton
                            sx={{ pl: 4, height: 30 }}
                            onClick={() => setNavegar(a => ({
                                ...a,
                                home: false,
                                add_usr: false,
                                list_usr: false,
                                add_serv: false,
                                list_serv: true,
                                add_grt: false,
                                list_grt: false,
                                msg: 'Listar Serviço '
                            }))}>
                            <ListItemIcon>
                                <ListAltIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Listar Serviço" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton sx={{ height: 30 }} id='grt' onClick={() => handClick('grt')}>
                    <ListItemIcon>
                        <DocumentScannerIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary='GRT' />
                    {open.open3 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open.open3} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                        {cliente ? cliente !== 'master' ? cliente !== 'administrador' ?
                            <>
                                <ListItemButton
                                    sx={{ pl: 4, height: 30 }}
                                    onClick={() => setNavegar(a => ({
                                        ...a,
                                        home: false,
                                        add_usr: false,
                                        list_usr: false,
                                        add_serv: false,
                                        list_serv: false,
                                        add_grt: true,
                                        list_grt: false,
                                        msg: 'Solicitar GRT'
                                    }))}>
                                    <ListItemIcon>
                                        <AddCircleIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary='Solicitar GRT' />
                                </ListItemButton>
                            </> : null : null : null}
                        <ListItemButton
                            sx={{ pl: 4, height: 30 }}
                            onClick={() => setNavegar(a => ({
                                ...a,
                                home: false,
                                add_usr: false,
                                list_usr: false,
                                add_serv: false,
                                list_serv: false,
                                add_grt: false,
                                list_grt: true,
                                msg: 'Listar GRT'
                            }))}>
                            <ListItemIcon>
                                <FormatListNumberedIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Listar GRT" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <ListItemButton sx={{ height: 30 }}>
                    <ListItemIcon>
                        <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary='Sair' />
                </ListItemButton>
            </List>
        </>
    )
}

export default Menu;