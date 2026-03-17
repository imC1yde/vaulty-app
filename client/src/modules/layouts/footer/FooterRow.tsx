import { type FC } from 'react'
import { Link } from 'react-router-dom'

interface ITableRowProps {
  readonly label: string
  readonly value: string
  readonly isLink: boolean
}

const FooterRow: FC<ITableRowProps> = (props) => {
  return (
    <tr className="group py-0.5">
      <td className="w-1/2 px-4 whitespace-nowrap text-faded-text/70 text-right sm:text-sm sm:px-4">
        {props.label}
      </td>
      <td className="w-1/2 px-4 text-left truncate max-w-[150px] sm:max-w-none sm:px-4">
        <p className="block truncate max-w-[120px] xs:max-w-[180px] sm:max-w-none sm:text-sm text-faded-text/70 italic">
          {props.isLink ?
            <Link
              to={props.value}
              className="hover:font-medium cursor-pointer hover:text-faded-text/100 transition-colors">
              {props.value}
            </Link>
            :
            props.value
          }
        </p>
      </td>
    </tr>
  )
}

export default FooterRow