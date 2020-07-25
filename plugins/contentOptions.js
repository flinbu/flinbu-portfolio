const richTypes = require('@contentful/rich-text-types')
const MARKS = richTypes.MARKS
const BLOCKS = richTypes.BLOCKS
const INLINES = richTypes.INLINES

module.exports = {
    options: {
        renderMark: {
            [MARKS.BOLD]: text => `<strong>${text}</strong>`,
            [MARKS.ITALIC]: text => `<i>${text}</i>`,
            [MARKS.UNDERLINE]: text => `<u>${text}</u>`,
            [MARKS.CODE]: text => `<code>${text}</code>`
        },
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node, key, h) => {
                const { title, description, file } = node.data.target.fields
                const contentType = file.contentType
                switch (contentType) {
                    case 'image/jpeg':
                    case 'image/png':
                        return h('LazyImage', {
                            key,
                            props: {
                                src: file.url,
                                customClass: 'portfolio__asset',
                                type: contentType
                            }
                        })
                        // return `<lazy-image src="${node.data.target.fields.file.url}" type="image"/>`
                }
            }
        }
    }
}