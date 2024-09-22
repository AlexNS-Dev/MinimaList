export const capitalize = (str: string) => {
    if (!str) return ''
    const trimmedStr = str.trim()
    return trimmedStr.charAt(0).toLocaleUpperCase() + trimmedStr.slice(1)
}