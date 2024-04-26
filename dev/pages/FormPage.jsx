import Form from "../../src/Form"

const FormPage = () => {
    return (
        <div style={{display:"grid", placeContent:"center"}}>
            <div style={{height:"30rem", width:"30rem", border:"1px solid white", padding:"1rem"}}>
                <Form.Group controlId="form-control">
                    <Form.Label>Form Control</Form.Label>
                    <Form.Control />
                </Form.Group>
                <Form.Group controlId="form-select">
                    <Form.Label>Form Select</Form.Label>
                    <Form.Select>
                        <Form.Select.Control />
                        <Form.Select.Options>
                            <Form.Select.Option value="test-1">Test 1</Form.Select.Option>
                            <Form.Select.Option value="test-2">Test 2</Form.Select.Option>
                            <Form.Select.Option value="test-3">Test 3</Form.Select.Option>
                        </Form.Select.Options>
                    </Form.Select>
                </Form.Group>
            </div>
        </div>
    )
}

export default FormPage