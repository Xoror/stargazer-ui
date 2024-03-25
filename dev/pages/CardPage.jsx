import Card from "../../src/Card"

const CardPage = () => {
    return (
        <>
            <h4 style={{marginLeft: "1.5rem"}}>Regular Cards</h4>
            <section className="cards-container">
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
            </section>
            <h4 style={{marginLeft: "1.5rem", marginTop:"1rem"}}>Inverted Cards</h4>
            <section className="cards-container">
                {["primary", "secondary", "success", "info", "warning", "danger", "dark", "light"].map((color, index) => 
                    <Card key={color} variant={color} inverted={true}>
                        <Card.Header>
                            <Card.Title>
                                Card {color}
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
            </section>
        </>
    )
}

export default CardPage