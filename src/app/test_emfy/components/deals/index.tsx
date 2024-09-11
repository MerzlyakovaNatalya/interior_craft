import { useCallback, useEffect, useRef, useState } from 'react'
import Deal from '../deal'
import { IDeal, ISelectedDeal } from '../../types'
import { ACCESS_TOKEN, API_URL, BATCH_SIZE } from '../../constants'
import './styles.css'

const Deals: React.FC = () => {
  const [deals, setDeals] = useState<IDeal[]>([])
  const [selectedDeal, setSelectedDeal] = useState<ISelectedDeal | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingDeal, setLoadingDeal] = useState<boolean>(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    let page = 1
    const fetchDeals = async () => {
      try {
        const response = await fetch(
          `${API_URL}?limit=${BATCH_SIZE}&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
            },
            method: 'GET',
          }
        )

        if (response.status === 204 && intervalRef.current) {
          clearInterval(intervalRef.current)
          setLoading(false)
          return
        }

        if (response.ok) {
          const data = await response.json()
          setDeals((prevDeals) => [
            ...prevDeals,
            ...data._embedded.leads.filter(
              (newDeal: { id: number }) =>
                !prevDeals.some((deal) => deal.id === newDeal.id)
            ),
          ])
          page++
        }
      } catch (error) {
        console.error('Error fetching deals:', error)
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        setLoading(false)
      }
    }

    setLoading(true)
    intervalRef.current = setInterval(fetchDeals, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const getTaskStatus = (deal: IDeal): 'red' | 'green' | 'yellow' => {
    const creationDate = new Date(deal.closest_task_at * 1000)
    const today = new Date()
    creationDate.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)

    if (creationDate < today) {
      return 'red'
    }

    if (creationDate.getTime() === today.getTime()) {
      return 'green'
    }

    if (creationDate > today) {
      return 'yellow'
    }

    return 'yellow'
  }

  const fetchDeal = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      })
      const deal: IDeal = await response.json()
      const taskStatus = getTaskStatus(deal)
      setSelectedDeal({ ...deal, taskStatus })
    } catch (error) {
      console.error('Error fetching deal details:', error)
    }
    setLoadingDeal(false)
  }

  const handleDealClick = useCallback(
    async (id: number) => {
      setLoadingDeal(true)
      if (selectedDeal && selectedDeal.id === id) {
        setSelectedDeal(null)
        setLoadingDeal(false)
        return
      }
      fetchDeal(id)
    },
    [selectedDeal, setLoadingDeal]
  )

  return (
    <div className="deals-container">
      <h1>Сделки</h1>
      <div className="deals-header">
        <div className="deals-header-item">ID</div>
        <div className="deals-header-item">Название</div>
        <div className="deals-header-item">Бюджет</div>
      </div>
      <div className="deals-body">
        <Deal
          deals={deals}
          handleClick={handleDealClick}
          loading={loadingDeal}
          selected={selectedDeal}
        />
      </div>
      {loading && <p>Загрузка...</p>}
    </div>
  )
}

export default Deals
