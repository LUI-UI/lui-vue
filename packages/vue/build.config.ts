import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    { builder: 'mkdist', input: './src', pattern: ['**/*.css', '!**/*.stories.ts', '!tests/**'], loaders: ['sass'] },
    { builder: 'mkdist', input: './src', pattern: ['**/*.vue', '!**/*.stories.ts', '!tests/**'], loaders: ['vue'] },
    { builder: 'mkdist', input: './src', pattern: ['**/*.ts', '!**/*.stories.ts', '!tests/**'], format: 'esm', loaders: ['js'] },
  ],
  clean: true,
  declaration: true,
  externals: ['vue'],
})
