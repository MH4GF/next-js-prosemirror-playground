import { EditorState } from 'prosemirror-state'
import { reactProps, RichTextEditorProps } from '../components/RichTextEditor'
import { exampleSetup } from 'prosemirror-example-setup'
import { schema } from './schema'
import { DOMParser } from 'prosemirror-model'

export const RichTextEditorState = (props: RichTextEditorProps) => {
  const state = EditorState.create({
    doc: props.initDoc
      ? DOMParser.fromSchema(schema).parse(props.initDoc)
      : null,
    plugins: [reactProps(props)].concat(exampleSetup({ schema })),
  })

  return state
}
