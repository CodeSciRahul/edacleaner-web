const fs = require('fs')

const source = JSON.parse(fs.readFileSync('i18n/locales/_en.json', 'utf8'))
const protectedTerms = [
  '{{year}}', '{{name}}', '{{step}}', '{{amount}}', '{{pct}}', '{{days}}',
  '{{n}}', '{{rating}}', '{{label}}', '{{state}}', '{{hint}}', '{{level}}',
  'EdaCleaner', 'EDA Cleaner', 'Windows', 'macOS', 'Linux', 'Premium', 'Pro',
  'Free', 'Smart Scan', 'Chrome', 'Edge', 'Firefox', 'Safari', 'Steam',
  'Figma', 'SSD',
]

function protect(text) {
  const replacements = []
  let result = text
  for (const term of protectedTerms) {
    result = result.split(term).join(() => {
      const token = `ZXQ${replacements.length}QXZ`
      replacements.push([token, term])
      return token
    })
  }
  return { result, replacements }
}

function restore(text, replacements) {
  let result = text
  for (const [token, term] of replacements) {
    const flexible = new RegExp(token.split('').join('\\s*'), 'gi')
    result = result.replace(flexible, term)
  }
  return result
}

async function translate(text, target) {
  const { result, replacements } = protect(text)
  const url = new URL('https://translate.googleapis.com/translate_a/single')
  url.searchParams.set('client', 'gtx')
  url.searchParams.set('sl', 'en')
  url.searchParams.set('tl', target)
  url.searchParams.set('dt', 't')
  url.searchParams.set('q', result)
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
      const payload = await response.json()
      return restore(payload[0].map((part) => part[0]).join(''), replacements)
    } catch (error) {
      if (attempt === 4) throw error
      await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** attempt))
    }
  }
}

async function createLocale(target) {
  const entries = Object.entries(source)
  const output = {}
  let cursor = 0
  const workers = Array.from({ length: 8 }, async () => {
    while (cursor < entries.length) {
      const index = cursor++
      const [key, value] = entries[index]
      output[key] = await translate(value, target)
      if ((index + 1) % 50 === 0) console.log(`${target}: ${index + 1}/${entries.length}`)
    }
  })
  await Promise.all(workers)
  const ordered = Object.fromEntries(entries.map(([key]) => [key, output[key]]))
  ordered['pricing.perMonth'] = target === 'fr' ? '${{amount}}/mois' : '${{amount}}/Mon.'
  fs.writeFileSync(`i18n/locales/_${target}.json`, `${JSON.stringify(ordered, null, 2)}\n`)
}

;(async () => {
  await createLocale('fr')
  await createLocale('de')
})().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
