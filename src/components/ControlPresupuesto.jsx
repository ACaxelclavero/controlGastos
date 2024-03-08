import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import NuevoPresupuesto from "./NuevoPresupuesto"

const ControlPresupuesto = ({gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto}) => {
    
    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)

        const totalDisponible = presupuesto - totalGastado

        //CALCULAR EL PORCENTAJE GASTADO
            const nuevoPorcentaje = (( ( presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2)

        setDisponible(totalDisponible)
        setGastado(totalGastado)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000)
    }, [gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const resultado = confirm("Deseas reiniciar presupuesto y gastos")

        if(resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    trailColor: '#F5F5F5',
                    textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
            />
        </div>

            <div className="contenido-presupuesto">
                <button
                className="reset-app"
                type="button"
                onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>presupuesto:</span>{formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible:</span>{formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado:</span>{formatearCantidad(gastado)}
                </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto