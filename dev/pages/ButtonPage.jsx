import Button from "../../src/Button"
import ButtonGroup from "../../src/ButtonGroup"

import { CodeBlock } from "./components"

const CardPage = () => {
    const code = `<ButtonGroup vertical={"boolean"}>
    <Button variant={"variant 1"}>
        Variant 1
    </Button>
    <Button variant={"variant 2"}>
        Variant 2
    </Button>
    <Button variant={"variant 3"}>
        Variant 3
    </Button>
</ButtonGroup>`
    return (
        <>
            <h4>Regular Buttons</h4>
            <section className="container">
                <CodeBlock code={code}>
                    <li>
                        Variants: string as "primary" (default), "secondary", "success", "info", "warning", "danger", "dark", "light"
                    </li>
                </CodeBlock>
                <div className="flex-display">
                    {["primary", "secondary", "success", "info", "warning", "danger", "dark", "light"].map((color, index) => 
                        <Button key={color} variant={color}>{color}</Button>
                    )}
                </div>
                <div className="flex-display">
                    <ButtonGroup>
                        {["primary", "secondary", "success", "info", "warning", "danger", "dark", "light"].map((color, index) => 
                            <Button key={color} variant={color}>{color}</Button>
                        )}
                    </ButtonGroup>
                </div>
            </section>
        </>
    )
}

export default CardPage