const slugThis = function (value) {
    return value == undefined ? '' : value.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
}

module.exports = {
    slugThis(value) {
        return slugThis(value)
    },
    // Content parser
    parsePostData(post) {
        let data = {}
        let thumbnail = post.fields.thumbnail.fields.file.url || ''
        let thumbnail_ph = post.fields.thumbnail_ph.fields.file.url || ''

        data.id = post.sys.id // ID
        data.title = post.fields.title // Title
        data.slug = slugThis(data.title)
        data.excerpt = post.fields.excerpt || '' // Excerpt
        data.thumbnail = (thumbnail) ? (!thumbnail.includes('https')) ? `https:${thumbnail}` : thumbnail : '' // Thumbnail
        data.thumbnail_ph = (thumbnail_ph) ? (!thumbnail_ph.includes('https')) ? `https:${thumbnail_ph}` : thumbnail_ph : '' // Thumbnail
        data.url = `/portfolio/${data.slug}` // URL path
        data.content = post.fields.content
        data.technologies = (post.fields.technologies && post.fields.technologies.length > 0) ? post.fields.technologies : []
        data.category = (post.fields.category && post.fields.category.length > 0) ? post.fields.category : []
        data.assets = (post.fields.assets && post.fields.assets.length > 0) ? post.fields.assets : []
        return data
    }
}