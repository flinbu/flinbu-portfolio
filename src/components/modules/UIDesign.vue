<template>
    <b-container fluid class="module module__ui content content__middle">
        <b-row>
            <b-container fluid class="module__wrapper">
                <b-row class="module__content" align-v="center">
                    <b-col class="module__data order-2 order-md-1 mb-5 mb-md-0" cols="12" md="5" offset-xl="1">
                        <module-title
                            :strongText="labels.title[0]"
                            :lightText="labels.title[1]"
                            :supText="labels.subtitle"
                        />
                        <div class="module__description mb-5" v-html="labels.description"/>
                        <button-group
                            class="module__action d-flex align-items-center justify-content-center justify-content-md-start flex-wrap"
                            :buttons="buttons"
                            button-class="module__action"
                        />
                    </b-col>
                    <b-col class="module__image--wrapper order-1 order-md-2 mb-5 mb-md-0" cols="12" md="6">
                        <b-row>
                            <!-- <g-image 
                                src="~/assets/images/mon-1@2x.jpg" 
                                class="img-fluid module__image"
                                quality="100"
                            /> -->
                            <image-slider
                                location="ux"
                            />
                        </b-row>
                    </b-col>
                </b-row>
            </b-container>
        </b-row>
    </b-container>
</template>
<script>
export default {
    data() {
        return {
            labels: {
                title: ['UX', 'Design'],
                subtitle: "Innovate. Together.",
                description: "Together we investigate, we create, we approach, we test and innovate with the solution to that challenge you hav with yout digital products."
            },
            buttons: [
                {
                    type: "anchor",
                    label: "Let's create",
                    target: "#contact",
                    theme: "main",
                    shadow: true
                },
                {
                    type: "link",
                    label: "Check my work",
                    target: "https://dribbble.com/flinbu",
                    theme: "white",
                    shadow: true
                }
            ]
        }
    }
}
</script>
