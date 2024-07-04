import { mkdirSync, writeFileSync } from 'node:fs'

mkdirSync('lib', { recursive: true })

const files = [
    [
        'lib/index.js',
        (
            await (
                await Bun.build({
                    entrypoints: ['index.ts'],
                    minify: {
                        whitespace: false,
                        syntax: true,
                        identifiers: true,
                    },
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
        'lib/scramble.js',
        (
            await (
                await Bun.build({
                    entrypoints: ['scramble.ts'],
                    minify: {
                        whitespace: false,
                        syntax: true,
                        identifiers: true,
                    },
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
        'lib/restore.js',
        (
            await (
                await Bun.build({
                    entrypoints: ['restore.ts'],
                    minify: {
                        whitespace: false,
                        syntax: true,
                        identifiers: true,
                    },
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
]

for (const [file, content] of files) {
    writeFileSync(file, content)
}

const readme = files.map(([file, content]) => `## ${file}\n\`\`\`js\n${content}\n\`\`\``).join('\n\n')

writeFileSync('README.md', `# edge-scrambler\n\n${readme}`)
