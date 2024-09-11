import { memo } from "react"
import { StatusIcon } from "../../assets/status_icon"
import { IDealProps } from "../types"
import './styles.css'

const Deal: React.FC<IDealProps> = memo(
    ({ deals, handleClick, loading, selected }) => {
  
      const formatDate = (timestamp: number): string => {
        const date = new Date(timestamp * 1000)
        const day = String(date.getUTCDate()).padStart(2, '0')
        const month = String(date.getUTCMonth() + 1).padStart(2, '0')
        const year = date.getUTCFullYear()
        return `${day}.${month}.${year}`
      }
      
      return (
        <>
          {deals.map((deal) => (
            <div
              className="deal-row"
              key={deal.id}
              onClick={() => handleClick(deal.id)}
            >
              <div className="deal-item">{deal.id}</div>
              <div className="deal-item">{deal.name}</div>
              <div className="deal-item">{deal.price}</div>
              {loading && selected && selected.id === deal.id && (
                <div className="deal-spinner"></div>
              )}
              {selected && deal.id === selected.id && (
                <div className="deal-selected">
                  <h2>{selected.name}</h2>
                  <p>ID: {selected.id}</p>
                  <p>
                    Дата задачи: {String(formatDate(selected.closest_task_at))}
                  </p>
                  <p>
                    Статус задачи:
                    <StatusIcon status={selected.taskStatus} />
                  </p>
                </div>
              )}
            </div>
          ))}
        </>
      )
    }
  )

  export default Deal