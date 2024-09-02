import { useEffect, useRef, useState } from "react"

import Form from "../../src/Form"
import Button from "../../src/Button"
import InputGroup from "../../src/InputGroup"
import FloatingLabel from "../../src/FloatingLabel"
import FileUploadButton from "../../src/FileUploadButton/FileUploadButton"

const FormPage = () => {
    const [sliderValue, setSliderValue] = useState(5)
    const handleChange = (event) => {
        console.log(event)
        setSliderValue(event)
    }
    const testRef = useRef(null)
    useEffect(() => {
        if(testRef.current) {
            //console.log(testRef.current.getBoundingClientRect())
        }
    }, [testRef])
    return (
        <div ref={testRef} style={{display:"grid", placeContent:"center"}}>
            <div style={{height:"fit-content", width:"fit-content", border:"1px solid white", padding:"1rem", resize:"both", overflow:"hidden"}}>
                <Form onSubmit={event => event.preventDefault()}>
                    <FileUploadButton />
                    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem"}}>
                        <Form.Group controlId="form-control">
                            <Form.Label>Form Control</Form.Label>
                            <Form.Control aria-describedby="test-hint" hint={{message: "Testing this error message"}} errorAsOverlay={true} error={{message: "Testing this error message"}} required type="number" min={4} placeholder="Placeholder..."/>
                            <Form.Hint id="test-hint">
                                <details>
                                    <summary>test</summary>
                                    more test
                                </details>
                            </Form.Hint>
                        </Form.Group>
                        <Form.Group controlId="form-control-disabled">
                            <Form.Label>Form Control Disabled</Form.Label>
                            <Form.Control placeholder="Placeholder..." defaultValue={"test"} disabled/>
                        </Form.Group>
                    </div>
                    <Form.Group controlId="form-control-vertical" vertical={true}>
                        <Form.Label>Form Control Vertical</Form.Label>
                        <Form.Control />
                    </Form.Group>
                    <Form.Group controlId="form-control-textbox">
                        <Form.Label>Form Control Textarea</Form.Label>
                        <Form.Control as="textarea"/>
                    </Form.Group>

                    <Form.Check >Form Checkbox</Form.Check>
                    <Form.Check type="radio">Form Radio</Form.Check>
                    <Form.Check required type="switch">Form Switch</Form.Check>
                    <Form.Check type="color">Form Color</Form.Check>

                    <Form.Group controlId="form-control-date">
                        <Form.Label>Form Date Picker</Form.Label>
                        <Form.Control type="date"/>
                    </Form.Group>

                    <Form.Group controlId="form-select">
                        <Form.Label>Form Select</Form.Label>
                        {true ? 
                            <Form.SelectTag>
                                <option value="">Select option...</option>
                                <option value="test-1">Test 1</option>
                                <option value="test-2">Test 2</option>
                                <option value="test-3">Test 3</option>
                            </Form.SelectTag> :
                            <Form.Select>
                                <Form.Select.Control/>
                                <Form.Select.Options>
                                    <Form.Select.Option value="test-1">Test 1</Form.Select.Option>
                                    <Form.Select.Option value="test-2">Test 2</Form.Select.Option>
                                    <Form.Select.Option value="test-3">Test 3</Form.Select.Option>
                                </Form.Select.Options>
                            </Form.Select>
                        }
                    </Form.Group>

                    <Form.Group controlId="form-prtogress">
                        <Form.Label>Progress / Gauge / Slider</Form.Label>
                        <progress value={50} max={100} />
                        <meter low={3} optimum={5} high={7} value={2}  min="0" max="10"/>
                        <Form.Slider min={-5} max={5} step={1} defaultValue={0} />
                        <input type="range" min={1} max={10} step={1} list="markers"/>
                        <datalist id="markers">
                            <option value="0"></option>
                            <option value="1"></option>
                            <option value="2"></option>
                            <option value="3"></option>
                            <option value="4"></option>
                            <option value="5"></option>
                            <option value="6"></option>
                            <option value="7"></option>
                            <option value="8"></option>
                            <option value="9"></option>
                            <option value="10"></option>
                        </datalist>
                    </Form.Group>

                    <h6>Input Group</h6>
                    <InputGroup.Grid>
                        <InputGroup controlId="input-group-test">
                            <InputGroup.Text>Form.Control</InputGroup.Text>
                            <Form.Control />
                        </InputGroup>
                        <InputGroup controlId="input-group-test-select">
                            <Form.SelectTag>
                                <option value="">Choose...</option>
                                <option value="wisely">Wisely</option>
                                <option value="poorly">Poorly</option>
                            </Form.SelectTag>
                            <InputGroup.Text>Form.Select</InputGroup.Text>
                        </InputGroup>
                        <Form.Check label="test"/>
                    </InputGroup.Grid>

                    <h6>Floating Label (in Input Group Grid)</h6>
                    <InputGroup.Grid>
                        <FloatingLabel controlId="floating-1" label="Floating 1">
                            <Form.Control hint={{message: "Testing this error message looooooooooooooooooooooooooooooooooooooooooooong"}} error={{message: "Testing this error message"}} placeholder="Enter input..." />
                        </FloatingLabel>
                        <FloatingLabel controlId="floating-2" label="Floating 2">
                            <Form.SelectTag>
                                <option value="">Choose...</option>
                                <option value="wisely">Wisely</option>
                                <option value="poorly">Poorly</option>
                            </Form.SelectTag>
                        </FloatingLabel>
                        <FloatingLabel controlId="floating-3" label="Floating 3">
                            <Form.Control as="textarea" placeholder="Enter input..." />
                        </FloatingLabel>
                    </InputGroup.Grid>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        </div>
    )
}

export default FormPage