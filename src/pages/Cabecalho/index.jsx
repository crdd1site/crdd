import style from '../../style/cabecalho.module.scss';
import crddrs from '../../img/crddrs.png'

const Cabecalho = () => {
    return (
        <>
            <div className={style.cabecalho}>
                <img src={crddrs} alt='crddrs' />
                <p>Conselho Regional dos Despachantes Documentalistas do Rio Grande do Sul</p>
            </div>
            <div className={style.linha1}></div>
            <div className={style.linha2}></div>
        </>
    )
}

export default Cabecalho;