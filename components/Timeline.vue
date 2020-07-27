<template>
    <div v-if="timeline && timeline.length > 0" class="timeline__wrapper">
        <div class="timeline">
            <div 
                v-for="(item, i) in timeline"
                :key="`item-${i}`"
                class="timeline__item"
            >
                <div class="timeline__date">{{ item.date }}</div>
                <div class="timeline__data">
                    <h3 class="timeline__title" v-html="item.title"/>
                    <h4 class="timeline__company" v-html="item.company"/>
                    <div class="timeline__description" v-html="item.description"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        timeline: {
            type: Array,
            default: () => []
        }
    }
}
</script>