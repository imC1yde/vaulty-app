import type { INestable } from '@src/common/interfaces/nestable.interface.ts'
import Footer from '@src/widgets/layouts/page-layout/footer/Footer.tsx'
import Header from '@src/widgets/layouts/page-layout/header/Header.tsx'
import { type FC } from 'react'

interface ILayoutProps extends INestable {}

const Layout: FC<ILayoutProps> = (props) => {
  return (
    <div className="w-full min-h-dvh flex flex-col bg-primary-bg antialiased thin-scrollbar">
      <Header/>

      <main className="flex-1 w-full flex flex-col pt-20">
        <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          {props.children}
        </div>
      </main>

      <Footer/>
    </div>
  )
}

export default Layout