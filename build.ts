import { mkdirSync, writeFileSync } from 'node:fs'

mkdirSync('lib', { recursive: true })
mkdirSync('dist', { recursive: true })

const minify =
    process.env.MINIFY !== 'false'
        ? {
              whitespace: false,
              syntax: true,
              identifiers: true,
          }
        : false

console.log(`minify: ${JSON.stringify(minify)}`)

const files = [
    [
        'dist/index.js',
        (
            await (
                await Bun.build({
                    entrypoints: ['index.ts'],
                    minify,
                })
            ).outputs[0].text()
        )
            .trim()
            .replace(/^\/\/.+/, '')
            .trim()
            .replace(/^function \w+/, 'function createScrambler')
            .replace(/export \{[^}]+\};$/m, '')
            .trim(),
    ],
    [
        'dist/scramble.js',
        (
            await (
                await Bun.build({
                    entrypoints: ['scramble.ts'],
                    minify,
                })
            ).outputs[0].text()
        )
            .trim()
            .replace(/^\/\/.+/, '')
            .trim()
            .replace(/^function \w+/, 'function createScramble')
            .replace(/export \{[^}]+\};$/m, '')
            .trim(),
    ],
    [
        'dist/restore.js',
        (
            await (
                await Bun.build({
                    entrypoints: ['restore.ts'],
                    minify,
                })
            ).outputs[0].text()
        )
            .trim()
            .replace(/^\/\/.+/, '')
            .trim()
            .replace(/^function \w+/, 'function createRestore')
            .replace(/export \{[^}]+\};$/m, '')
            .trim(),
    ],
    [
        'lib/index.js',
        await (
            await Bun.build({
                entrypoints: ['index.ts'],
                minify,
            })
        ).outputs[0].text(),
    ],
    [
        'lib/scramble.js',
        await (
            await Bun.build({
                entrypoints: ['scramble.ts'],
                minify,
            })
        ).outputs[0].text(),
    ],
    [
        'lib/restore.js',
        await (
            await Bun.build({
                entrypoints: ['restore.ts'],
                minify,
            })
        ).outputs[0].text(),
    ],
]

for (const [file, content] of files) {
    writeFileSync(file, content)
}

const readme = files
    .filter(([f]) => f.startsWith('dist'))
    .map(([file, content]) => `## ${file}\n\`\`\`js\n${content}\n\`\`\``)
    .join('\n\n')

writeFileSync('README.md', `# edge-scrambler\n\n${readme}`)
