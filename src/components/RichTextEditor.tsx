import { PluginKey, Plugin } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { useEffect, useRef } from 'react'
import { RichTextEditorState } from '../RichTextEditor/RichTextEditorState'

export type RichTextEditorProps = {
  initDoc: HTMLElement | null
  mountedDom?: HTMLDivElement
}

const reactPropsKey = new PluginKey<RichTextEditorProps>('reactProps')

export const reactProps = (initialProps: RichTextEditorProps) => {
  return new Plugin({
    key: reactPropsKey,
    state: {
      init: () => initialProps,
      apply: (tr, prev) => {
        return (tr.getMeta(reactPropsKey) as RichTextEditorProps) || prev
      },
    },
  })
}

export const RichTextEditor: React.FC<RichTextEditorProps> = (props) => {
  const viewHost = useRef<HTMLDivElement>(null)
  const view = useRef<EditorView>()

  useEffect(() => {
    if (viewHost.current) {
      const state = RichTextEditorState({
        ...props,
        mountedDom: viewHost.current,
      })
      view.current = new EditorView(viewHost.current, { state })
    }
    return () => view.current && view.current.destroy()
  }, [props])

  useEffect(() => {
    if (view.current) {
      const tr = view.current.state.tr.setMeta(reactPropsKey, props)
      view.current.dispatch(tr)
    }
  })

  return <div ref={viewHost} />
}
