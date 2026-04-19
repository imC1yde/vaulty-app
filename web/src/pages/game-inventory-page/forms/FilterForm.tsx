import RemoteSelector from '@src/pages/game-inventory-page/components/RemoteSelector.tsx'
import type { GameFilterSchema } from '@src/pages/game-inventory-page/schemas/game-filter.schema.ts'
import Modal from '@src/widgets/modals/Modal.tsx'
import ActionButton from '@src/widgets/ui/buttons/action-button/ActionButton'
import Field from '@src/widgets/ui/field/Field'
import { type FC, useState } from 'react'
import { useForm } from 'react-hook-form'

interface IFilterFormProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly onApply: (data: GameFilterSchema) => void
  readonly currentFilters: GameFilterSchema
}

const FilterForm: FC<IFilterFormProps> = ({ isOpen, onClose, currentFilters, onApply }) => {
  const [ view, setView ] = useState<'main' | 'genres' | 'platforms'>('main')
  const { register, handleSubmit, setValue, watch, reset } = useForm<GameFilterSchema>({
    defaultValues: currentFilters
  })

  const formValues = watch()

  const handleReset = () => {
    reset({ name: null, rating: 0, isCompleted: null, genres: [], platforms: [], esrbRating: null })
    onApply({
      name: null,
      isCompleted: null,
      genres: null,
      platforms: null,
      esrbRating: null,
      rating: null
    })
  }

  if (view !== 'main') {
    return (
      <Modal
        isOpen={isOpen}
        onClose={() => setView('main')}
        title={view === 'genres' ? "Выбор жанров" : "Выбор платформ"}>
        <RemoteSelector
          type={view}
          selectedItems={view === 'genres' ? formValues.genres || [] : formValues.platforms || []}
          onSelect={(items: any) => {
            setValue(view, items)
            setView('main')
          }}
        />
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Фильтры">
      <form onSubmit={handleSubmit(onApply)} className="flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">

          <div className="space-y-2">
            <Field.Label>Поиск по названию</Field.Label>
            <Field.Input
              placeholder="Введите название игры..."
              registry={register('name')}
              className="h-12 bg-primary-bg/40"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Field.Label>Минимальный рейтинг</Field.Label>
              <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                {formValues.rating || 0}+
              </span>
            </div>
            <Field.Slider
              min={0} max={5} step={0.5}
              value={formValues.rating ?? 0}
              onChange={(e) => setValue('rating', Number(e?.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Field.Label>Статус прохождения</Field.Label>
            <Field.RadioGroup className="flex flex-col md:flex-row">
              <div
                onClick={() => setValue('isCompleted', true)}
                className={`
                  flex-1 p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col gap-3
                  ${formValues.isCompleted === true ? 'border-accent bg-accent/5' : 'border-white/5 bg-white/5 hover:border-white/10'}
                `}
              >
                <div className="flex justify-between items-start">
                  <Field.Label>Пройдено</Field.Label>
                  <Field.RadioButton checked={formValues.isCompleted === true} readOnly/>
                </div>
              </div>

              <div
                onClick={() => setValue('isCompleted', false)}
                className={`
                  flex-1 p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col gap-3
                  ${formValues.isCompleted === false ? 'border-accent bg-accent/5' : 'border-white/5 bg-white/5 hover:border-white/10'}
                `}
              >
                <div className="flex justify-between items-start">
                  <Field.Label>Не пройдено</Field.Label>
                  <Field.RadioButton checked={formValues.isCompleted === false} readOnly/>
                </div>
              </div>

              <div
                onClick={() => setValue('isCompleted', null)}
                className={`
                  flex-1 p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col gap-3
                  ${formValues.isCompleted === null ? 'border-accent bg-accent/5' : 'border-white/5 bg-white/5 hover:border-white/10'}
                `}
              >
                <div className="flex justify-between items-start">
                  <Field.Label>Все</Field.Label>
                  <Field.RadioButton checked={formValues.isCompleted === null} readOnly/>
                </div>
              </div>
            </Field.RadioGroup>
          </div>

          <div className="space-y-2">
            <Field.Label>Возрастной рейтинг</Field.Label>
            <Field.SelectGroup
              value={formValues.esrbRating ?? ''}
              onChoice={(value: string) => setValue('esrbRating', value)}
              placeholder="Любой рейтинг"
            >
              <Field.Option value="">Любой</Field.Option>
              <Field.Option value="Everyone">Everyone</Field.Option>
              <Field.Option value="Everyone 10+">Everyone 10+</Field.Option>
              <Field.Option value="Teen">Teen</Field.Option>
              <Field.Option value="Mature">Mature</Field.Option>
              <Field.Option value="Adults Only">Adults Only</Field.Option>
            </Field.SelectGroup>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setView('genres')} className="h-11 bg-white/5 border border-white/10 rounded-xl text-[10px] uppercase font-bold text-gray-400 hover:border-accent/40 transition-all">
                Выбрать жанры
              </button>
              <button type="button" onClick={() => setView('platforms')} className="h-11 bg-white/5 border border-white/10 rounded-xl text-[10px] uppercase font-bold text-gray-400 hover:border-accent/40 transition-all">
                Выбрать платформы
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {(formValues.genres && formValues.genres.length > 0) && (
                <div className="flex flex-wrap gap-1.5">
                  {formValues.genres.map(g => (
                    <span key={g} className="text-[9px] font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                      {g}
                    </span>
                  ))}
                </div>
              )}
              {(formValues.platforms && formValues.platforms.length > 0) && (
                <div className="flex flex-wrap gap-1.5">
                  {formValues.platforms.map(p => (
                    <span key={p} className="text-[9px] font-bold text-purple-400 uppercase tracking-wider bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-white/10 flex gap-3">
          <ActionButton.Primary
            type="submit"
            className="flex-1"
          >
            Применить
          </ActionButton.Primary>
          <ActionButton.Neon
            type="button"
            onClick={handleReset}
          >
            Сбросить
          </ActionButton.Neon>
        </div>
      </form>
    </Modal>
  )
}

export default FilterForm