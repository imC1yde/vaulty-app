import { footerData } from '@src/modules/layouts/page-layout/footer/footer-data.ts'
import FooterRow from '@src/modules/layouts/page-layout/footer/FooterRow.tsx'
import { type FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className="w-full pb-12 px-4 font-light text-sm flex flex-col items-center ">
      <div className="w-full max-w-2xl overflow-hidden">
        <table className="mx-auto border-separate border-spacing-y-1 text-xs font-normal">
          <tbody className="divide-y divide-transparent">
          {footerData.map(([ label, value ], i) => (
            <FooterRow key={i} label={label} value={value} isLink={value.includes('http')}/>
          ))}
          </tbody>
        </table>
      </div>
    </footer>
  )
}

export default Footer