import List from "../../src/List"
import Button from "../../src/Button"
import { useEffect, useRef } from "react"

const ListPage = () => {
    return(
        <>
            <h4 style={{marginLeft:"1.5rem"}}>List</h4>
            <section className="list-container">
                <List depth={1} dragdrop={true}>
                    <List.Item>
                        <span style={{padding:"0.5rem 1rem", border:"1px solid white"}}>Test 0</span>
                        </List.Item>
                    <List.Sublist>
                        <List.Label id="test-1">
                            <span style={{padding:"0.5rem 1rem", border:"1px solid white"}}>Sublist 1</span>
                        </List.Label>
                        <List depth={2} aria-labelledby="test-1">
                            <List.Item id="1">
                                <span style={{padding:"0.5rem 1rem", border:"1px solid white"}}>Test 2</span>
                            </List.Item>
                            <List.Item id="2">
                                <span style={{padding:"0.5rem 1rem", border:"1px solid white"}}>Test 3</span>
                            </List.Item>
                            <List.Sublist>
                                <List.Label id="sublist-test-1">
                                    <span style={{padding:"0.5rem 1rem", border:"1px solid white"}}>Sublist 2</span>
                                </List.Label>
                                <List depth={3} aria-labelledby="sublist-test-1">
                                    <List.Item id="1">
                                        <span style={{padding:"0.5rem 1rem", border:"1px solid white"}}>Test 5</span>
                                    </List.Item>
                                    <List.Item id="2">
                                        <span style={{padding:"0.5rem 1rem", border:"1px solid white"}}>Test 6</span>
                                    </List.Item>
                                </List>
                            </List.Sublist>
                        </List>
                    </List.Sublist>
                    <List.Item id="test-4">
                        <span style={{ padding:"0.5rem 1rem", border:"1px solid white"}}>Test 4</span>
                    </List.Item>
                    <List.Item id="test-5">
                        <span style={{ padding:"0.5rem 1rem", border:"1px solid white"}}>Test 5</span>
                    </List.Item>
                </List>
            </section>
        </>
    )
}

export default ListPage