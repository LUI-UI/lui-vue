
export function generateClasses(params) {
  const acc = []
  params.map((param) => {
    acc.push(...Object.values(param))
  })
  return acc.join(' ').toString().replace(/\s+/g, ' ')
}
export function generateVariant(variant, filter) {
  const backgroundColor =
    filter === 'none'
      ? `bg-${variant}`
      : filter === 'darker'
      ? `bg-${variant}-800`
      : `bg-${variant}-100`
  const fontColor =
    filter === 'none'
      ? `text-white`
      : filter === 'darker'
      ? `text-white`
      : `text-${variant}-500`
  return { backgroundColor, fontColor }
}
export function generateColorVariant(variant, filter, property) {
  const baseList = ['white','black','light','dark']
  const colorClasses =
    filter === 'none' || baseList.includes(variant)
      ? `${property}-${variant}`
      : filter === 'darker'
      ? `${property}-${variant}-800`
      : `${property}-${variant}-100`
  return { colorClasses }
}
