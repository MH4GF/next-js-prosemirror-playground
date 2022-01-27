import { EditorState, PluginKey, Plugin } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { useEffect, useRef } from 'react'

import { schema } from '../richTextEditor/schema'

type RichTextEditorProps = {
  test?: string
}

const reactPropsKey = new PluginKey<RichTextEditorProps>('reactProps')

const reactProps = (initialProps: RichTextEditorProps) => {
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
  const viewHost = useRef()
  const view = useRef<EditorView>()

  useEffect(() => {
    const state = EditorState.create({
      schema,
      plugins: [reactProps(props)],
    })
    view.current = new EditorView(viewHost.current, { state })
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
