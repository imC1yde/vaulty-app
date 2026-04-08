import { useQuery } from '@apollo/client/react'
import { useBreakpoint } from '@src/common/hooks/use-mobile.hook'
import { isQueryReady } from '@src/common/utilities/is-query-ready.util'
import { CustomInventoryRequest } from '@src/core/features/requests/custom-inventory.request.ts'
import InventoryCard from '@src/pages/custom-inventory-page/components/InventoryCard.tsx'
import CreateItemForm from '@src/pages/custom-inventory-page/forms/CreateItem.form.tsx'
import Layout from '@src/widgets/layouts/page-layout/Layout.tsx'
import Modal from '@src/widgets/modals/Modal.tsx'
import Button from '@src/widgets/ui/buttons/Button'
import Pagination from '@src/widgets/ui/pagination/Pagination'
import { type FC, memo, useEffect, useMemo, useState } from 'react'

const CustomInventoryPage: FC = memo(() => {
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false)
  const [ currentPage, setCurrentPage ] = useState<number>(1)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const { isMobile, isTablet, isDesktop } = useBreakpoint()

  const pageSize = useMemo(() => {
    if (isDesktop) return 72
    if (isTablet) return 52
    return 30
  }, [ isTablet, isDesktop, isMobile ])

  useEffect(() => {
    setCurrentPage(1)
  }, [ pageSize ])

  const { data } = useQuery(
    CustomInventoryRequest.GET_ALL_ITEMS,
    {
      variables: {
        input: {
          page: currentPage,
          pageSize: pageSize
        }
      },
      context: { withCredentials: true }
    }
  )

  const { data: items, totalPages, totalCount } = useMemo(() => {
    if (isQueryReady(data)) {
      return data.getAllItems
    }
    return { data: [], totalPages: 0, totalCount: 0 }
  }, [ data ])

  return (
    <Layout>
      <main className="max-w-[1440px] mx-auto p-4 md:p-8 flex flex-col gap-8">

        <section className="flex flex-row justify-between items-end border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Моя коллекция</h1>
            <p className="text-gray-400 text-sm">Всего предметов: {totalCount}</p>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-500 text-white px-6"
            onClick={() => setIsModalOpen(true)}
          >
            Добавить
          </Button>
        </section>

        <section className="grid gap-4 sm:gap-6
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6
          @xs:grid-cols-2">
          {items.map((item: any, i: number) => (
            <InventoryCard key={item.id} item={item} index={i}/>
          ))}
        </section>

        <section className="py-13">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Добавить новый предмет"
      >
        <CreateItemForm/>
      </Modal>
    </Layout>
  )
})

export default CustomInventoryPage;