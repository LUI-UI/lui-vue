import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    { builder: 'mkdist', input: './src', pattern: ['**/*.css', '!stories/**', '!tests/**'], loaders: ['sass'] },
    { builder: 'mkdist', input: './src', pattern: ['**/*.vue', '!stories/**', '!tests/**'], loaders: ['vue'] },
    { builder: 'mkdist', input: './src', pattern: ['**/*.ts', '!stories/**', '!tests/**'], format: 'esm', loaders: ['js'] },
  ],
  clean: true,
  declaration: true,
  externals: ['vue'],
})
