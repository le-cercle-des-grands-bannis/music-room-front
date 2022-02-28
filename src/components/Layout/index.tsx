import type {PropsWithChildren} from "react"
import {Fragment} from "react";

const Layout = ({children}: PropsWithChildren<any>) => {
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export default Layout
