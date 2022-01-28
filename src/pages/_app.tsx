import type { AppProps } from 'next/app'
import React from 'react'
import '../styles/globals.css'
import 'prosemirror-example-setup/style/style.css'
import 'prosemirror-view/style/prosemirror.css'
import 'prosemirror-menu/style/menu.css'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return <Component {...pageProps} />
}

export default MyApp
