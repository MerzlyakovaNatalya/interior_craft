import './icon.css'

export const StatusIcon: React.FC<{ status: 'red' | 'green' | 'yellow' }> = ({
    status,
  }) => {
    const getColor = (status: 'red' | 'green' | 'yellow') => {
      switch (status) {
        case 'red':
          return '#ff0000'
        case 'green':
          return '#00ff00'
        case 'yellow':
          return '#ffff00'
        default:
          return '#000000'
      }
    }
  
    return (
      <svg className="svg-icon" height="24" width="24">
        <circle cx="12" cy="12" r="10" fill={getColor(status)} />
      </svg>
    )
  }

