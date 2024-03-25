import Button from "../../src/Button"
import ButtonGroup from "../../src/ButtonGroup"

const CardPage = () => {
    return (
        <>
            <h4 style={{marginLeft: "1.5rem"}}>Regular Buttons</h4>
            <section className="description-container">
                <dl>
                    <dt>
                        Properties:
                    </dt>
                    <dd>
                        <ul>
                            <li>
                                Variants: string as "primary" (default), "secondary", "success", "info", "warning", "danger", "dark", "light"
                            </li>
                        </ul>
                    </dd>
                </dl>
            </section>
            <section className="buttons-container">
                {["primary", "secondary", "success", "info", "warning", "danger", "dark", "light"].map((color, index) => 
                    <Button key={color} variant={color}>{color}</Button>
                )}
            </section>
            <h4 style={{marginLeft: "1.5rem"}}>Button Group</h4>
            <section className="description-container">
                <dl>
                    <dt>
                        Properties:
                    </dt>
                    <dd>
                        <ul>
                            <li>
                                Vertical: boolean <var>true</var> or <var>false</var>, default <var>false</var>
                            </li>
                        </ul>
                    </dd>
                </dl>
            </section>
            <section className="buttons-container">
                <ButtonGroup>
                    {["primary", "secondary", "success", "info", "warning", "danger", "dark", "light"].map((color, index) => 
                        <Button key={color} variant={color}>{color}</Button>
                    )}
                </ButtonGroup>
            </section>
        </>
    )
}

export default CardPage