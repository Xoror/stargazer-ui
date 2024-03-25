import List from "../../src/List"
import Button from "../../src/Button"

const ListPage = () => {
    return(
        <>
            <h4 style={{marginLeft:"1.5rem"}}>List</h4>
            <section className="list-container">
                <List depth={1}>
                    <List.Item id="test-1">
                        <span>Test 1</span>
                    </List.Item>
                    <List depth={2}>
                        <List.Item id="test-2">
                            <span>Test 2</span>
                        </List.Item>
                        <List.Item id="test-3">
                            <span>Test 3</span>
                        </List.Item>
                    </List>
                    <List.Item id="test-4">
                        <span>Test 4</span>
                    </List.Item>
                </List>
            </section>
        </>
    )
}

export default ListPage