
const ConvertableValueType = {
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  BOOLEAN: 'BOOLEAN',
  DATE: 'DATE',
  NULL: 'NULL',
  ERROR: 'ERROR'
}

function isDateString (value: any): boolean {
  if (typeof value !== 'string') {
    return false
  }

  const matches = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/)

  if (matches === null) {
    return false
  }

  return true
}

function isProvided (val) {
  return (val !== null && val !== undefined)
}

export function migrateToConvertibleValue (val) {
  if (val && typeof val === 'object' && 'value' in val && 'valueType' in val) {
    return val
  }

  let value = isProvided(val) ? val.toString() : ''
  let valueType = ConvertableValueType.STRING

  if (!isProvided(val)) {
    valueType = ConvertableValueType.NULL
  } else if (typeof value === 'number' || typeof value === 'bigint') {
    valueType = ConvertableValueType.NUMBER
  } else if (val && typeof val === 'object' && 'label' in val) {
    value = `${val.label}`
    valueType = ConvertableValueType.ERROR
  } else if (typeof val === 'boolean') {
    valueType = ConvertableValueType.BOOLEAN
  } else if (isDateString(val)) {
    valueType = ConvertableValueType.DATE
  }

  return ({ valueType, value })
}

export function migrateFromConvertibleValue (val) {
  let result = ''
  if (!isProvided(val)) {
    result = ''
  } else if (typeof val === 'object' && 'value' in val && 'valueType' in val) {
    result = isProvided(val.value) ? val.value.toString() : ''
  } else {
    result = val.toString()
  }

  return result
}