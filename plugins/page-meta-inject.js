import { parse } from '@vue/compiler-dom'

const INJECT = '\n  <page-meta root-font-size="16px" />'

export default function pageMetaInject() {
  return {
    name: 'page-meta-inject',
    enforce: 'pre',
    transform(code, id) {
      if (id.includes('node_modules') || !/\.vue$/.test(id)) return
      if (!id.includes('/pages/') && !id.includes('\\pages\\')) return
      if (code.includes('<page-meta')) return

      let templateNode
      try {
        templateNode = parse(code, { onError: () => {} }).children.find((node) => node.tag === 'template')
      } catch {
        return
      }
      if (!templateNode) return

      const at = code.indexOf('>', templateNode.loc.start.offset) + 1
      return code.slice(0, at) + INJECT + code.slice(at)
    },
  }
}
