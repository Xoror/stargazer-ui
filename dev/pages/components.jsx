export const CodeBlock = ({children, code}) => {
    return (
        <div className="code-block">
            <pre>{code}</pre>
            <div>
                <dl>
                    <dt>
                        Properties:
                    </dt>
                    <dd>
                        <ul>
                            {children}
                        </ul>
                    </dd>
                </dl>
            </div>
        </div>
    )
}
