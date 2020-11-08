/***
 * If the value is required
 *
 * @param val Value to check
 */
export const vRequired = (val: any) => {
    return val !== undefined
}

/***
 * Return if the value has minimum length (default 3).
 *
 * @param val Value to check
 * @param length Length to compare to.
 */
export const vLengthMin = (val: any, length = 3) => {
    return val.length >= length
}
