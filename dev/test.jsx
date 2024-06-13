import { useLocation  } from "react-router-dom"

import Tabs from '../src/Tabs'
import Popout from '../src/Popout'

import CardPage from './pages/CardPage'
import ButtonPage from './pages/ButtonPage'
import DropdownPage from './pages/DropdownPage'
import OverlayPage from './pages/OverlayPage'
import FormPage from './pages/FormPage'
import ModalPage from './pages/ModalPage'
import ListPage from './pages/ListPage'
import { useState } from "react"

const tabs = [
    {
        label: "Cards",
        id: "cards",
        page: <CardPage />
    },
    {
        label: "Buttons",
        id: "buttons",
        page: <ButtonPage />
    },
    {
        label: "Modal",
        id: "modal",
        page: <ModalPage />
    },
    {
        label: "Overlay",
        id: "overlay",
        page: <OverlayPage />
    },
    {
        label: "Dropdown",
        id: "dropdown",
        page: <DropdownPage />
    },
    {
        label: "Form",
        id: "form",
        page: <FormPage />
    },
    {
        label: "Drag and Drop List",
        id: "drag-and-drop-list",
        page: <ListPage />
    }
]

export const Component = () => {


    return (
        <div style={{height:"200vh"}}>
            {false ? 
                <Popout move="true">
                    <Popout.Header>
                        <Popout.Title>Test</Popout.Title>
                    </Popout.Header>
                    <Popout.Body><p>test</p></Popout.Body>
                </Popout>
            : null}
            <Tabs controlId="tabs-test" defaultActive={tabs[0].id}>
                <Tabs.Controls>
                    {
                        tabs.map(tab => 
                            <Tabs.Button key={tab.id+"-button"} tabId={tab.id}>
                                {tab.label}
                            </Tabs.Button>
                        )
                    }
                </Tabs.Controls>
                <Tabs.Content>
                    {
                        tabs.map(tab => 
                            <Tabs.Page key={tab.id+"-page"} tabId={tab.id}>
                                {tab.page}
                            </Tabs.Page>
                        )
                    }
                </Tabs.Content>
            </Tabs>
        </div>
    )
}