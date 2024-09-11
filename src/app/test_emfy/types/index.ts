export interface IDeal {
  id: number
  name: string
  price: number
  created_at: number
  closest_task_at: number
  tasks?: ITask[]
}

export interface ITask {
  id: number
  date: string
}

export interface ISelectedDeal extends IDeal {
  taskStatus: 'red' | 'green' | 'yellow'
}

export interface IDealProps {
  deals: IDeal[]
  handleClick: (id: number) => void
  loading: boolean
  selected: ISelectedDeal | null
}
