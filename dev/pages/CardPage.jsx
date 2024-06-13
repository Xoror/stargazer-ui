import Card from "../../src/Card"
import { CodeBlock } from "./components"

const CardPage = () => {
    const code = `<Card variant={string} inverted={boolean}>
    <Card.Header>
        <Card.Title>
            Card
        </Card.Title>
    </Card.Header>
    <Card.Body>
        <Card.Text>
            Testing the card text
        </Card.Text>
    </Card.Body>
    <Card.Footer>
        <Card.Text>
            Test Footer
        </Card.Text>
    </Card.Footer>
</Card>`
    return (
        <>
            <h4>Regular Cards</h4>
            <section className="container">
                <CodeBlock code={code}>
                    <li>
                        Variants: string as "primary" (default), "secondary", "success", "info", "warning", "danger", "dark", "light"
                    </li>
                    <li>
                        Inverted: boolean, makes them solid color (with a little gradient)
                    </li>
                </CodeBlock>
                <div className="flex-display">
                    {["primary", "secondary", "success", "info", "warning", "danger", "dark", "light"].map((color, index) => 
                        <Card key={color} variant={color}>
                            <Card.Header>
                                <Card.Title>
                                    Card {color}
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Testing the card text
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Card.Text>
                                    Test Footer
                                </Card.Text>
                            </Card.Footer>
                        </Card>
                    )}
                </div>
                <div className="flex-display">
                    {["primary", "secondary", "success", "info", "warning", "danger", "dark", "light"].map((color, index) => 
                        <Card key={color} variant={color} inverted={true}>
                            <Card.Header>
                                <Card.Title>
                                    Inverted Card {color}
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Testing the inverted card text
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Card.Text>
                                    Test Footer
                                </Card.Text>
                            </Card.Footer>
                        </Card>
                    )}
                </div>
            </section>
        </>
    )
}

export default CardPage