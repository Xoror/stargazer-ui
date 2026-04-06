import { ElementType, ComponentPropsWithoutRef } from "react"

type AsPropType<E extends ElementType> = ComponentPropsWithoutRef<E> & {as: E}

export default AsPropType