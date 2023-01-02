import type { NextPage } from 'next'
import React from 'react'
import ReactDOM from 'react-dom'

import { RichTextEditor } from '../components/RichTextEditor'

const InitDoc: React.FC = () => {
  return (
    <table>
      <tbody>
        <tr>
          <th>One</th>
          <th>Two</th>
          <th>Three</th>
        </tr>
        <tr>
          <td>Four</td>
          <td>Five</td>
          <td>Six</td>
        </tr>
      </tbody>
    </table>
  )
}

const Page: NextPage = () => {
  let dom = null
  if (process.browser) {
    dom = document.createElement('div')
    ReactDOM.render(<InitDoc />, dom)
  }
  return <RichTextEditor initDoc={dom} />
}

export default Page
