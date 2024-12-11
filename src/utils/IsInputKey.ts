export type InputKeyType = {id:string, alt?:boolean, shift?: boolean, ctrl?: boolean}

export const isValidInputKey = (event: React.KeyboardEvent | KeyboardEvent, inputKeys: InputKeyType[]) => {
    const isValidKey = inputKeys.find(inputKey => inputKey.id === event.key)
    if(!isValidKey) return

    let isCtrl = true, isAlt = true, isShift = true
    if (event.altKey && !isValidKey.alt) {
        isAlt = false
    }
    if (event.ctrlKey && !isValidKey.ctrl) {
        isCtrl = false
    }
    if (event.shiftKey && !isValidKey.shift) {
        isShift = false
    }
    return isValidKey && isAlt && isCtrl && isShift
}