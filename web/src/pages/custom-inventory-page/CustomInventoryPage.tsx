import { useQuery } from '@apollo/client/react'
import { useBreakpoint } from '@src/common/hooks/use-mobile.hook'
import type { IUserCatalogItem } from '@src/common/interfaces/user-catalog-item.interface.ts'
import { isQueryReady } from '@src/common/utilities/is-query-ready.util'
import type { Nullable } from '@src/common/utilities/nullable.util'
import { CustomInventoryRequest } from '@src/core/features/requests/custom-inventory.request.ts'
import InventoryCard from '@src/pages/custom-inventory-page/components/InventoryCard.tsx'
import ItemDetails from '@src/pages/custom-inventory-page/components/ItemDetails.tsx'
import ItemForm from '@src/pages/custom-inventory-page/forms/ItemForm.tsx'
import Layout from '@src/widgets/layouts/page-layout/Layout.tsx'
import Modal from '@src/widgets/modals/Modal.tsx'
import Button from '@src/widgets/ui/buttons/Button'
import Pagination from '@src/widgets/ui/pagination/Pagination'
import { type FC, memo, useEffect, useMemo, useState } from 'react'

const CustomInventoryPage: FC = memo(() => {
  const [ isCreateModalOpen, setIsCreateModalOpen ] = useState<boolean>(false)
  const [ currentPage, setCurrentPage ] = useState<number>(1)
  const [ selectedItem, setSelectedItem ] = useState<Nullable<IUserCatalogItem>>(null)
  const { isMobile, isTablet, isDesktop } = useBreakpoint()

  const pageSize = useMemo(() => {
    if (isDesktop) return 72
    if (isTablet) return 51
    return 20
  }, [ isTablet, isDesktop, isMobile ])

  useEffect(() => {
    setCurrentPage(1)
  }, [ pageSize ])

  const handlePageChange = (page: number) => setCurrentPage(page)

  const { data } = useQuery(
    CustomInventoryRequest.GET_ALL_ITEMS,
    {
      variables: {
        input: {
          page: currentPage,
          pageSize: pageSize
        }
      }
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

        <section className="flex flex-row justify-between border-b border-gray-800 pb-6 items-center gap-2 md:items-end">
          <div>
            <h1 className="md:text-2xl text-lg font-bold text-white">Моя коллекция</h1>
            <p className="text-gray-400 text-[9px] md:text-sm">Всего предметов: {totalCount}</p>
          </div>
          <div className="flex-none">
            <Button
              className="!flex-none w-fit bg-accent/10 border-accent/30 hover:border-accent text-accent px-4 py-2 md:px-6 md:py-2.5 text-[10px] md:text-xs"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Добавить
            </Button>
          </div>
        </section>

        <section className="grid gap-4 sm:gap-6
          grid-cols-1 sm:grid-cols-3 xl:grid-cols-6">
          {items.map((item: any, i: number) => (
            <div key={item.id} onClick={() => setSelectedItem(item)} className="cursor-pointer transition-transform active:scale-95">
              <InventoryCard item={item} index={(currentPage - 1) * pageSize + i}/>
            </div>
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
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Добавить новый предмет"
      >
        <ItemForm
          onSuccess={() => setIsCreateModalOpen(false)}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </Modal>

      <ItemDetails
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </Layout>
  )
})

export default CustomInventoryPage;