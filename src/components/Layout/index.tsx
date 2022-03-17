import type {PropsWithChildren} from "react"
import {Fragment} from "react";
import {Notification} from "@Components/Notification";

const Layout = ({children}: PropsWithChildren<any>) => {
    return (
        <Fragment>
            <Notification />
            {children}
        </Fragment>
    )
}

export default Layout
