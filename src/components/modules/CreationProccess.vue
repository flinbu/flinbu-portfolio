<template>
    <b-container fluid class="module module__creation module__red content content__middle py-6 py-lg-10">
        <!-- <div class="module__background module__background--bl d-none d-lg-block">
            <img :src="imagePath('creation-proccess.svg')" alt="">
        </div> -->
        <b-container class="module__wrapper px-0">
            <b-row class="module__content">
                <b-col class="module__data" cols="12" xl="10" offset-xl="1">
                    <module-title
                        :strongText="labels.title[0]"
                        :lightText="labels.title[1]"
                        :supText="labels.subtitle"
                        class="mb-6"
                    />
                    <b-row class="creation-proccess__wrapper" align-v="stretch">
                        <b-col v-for="(step, index) in process" :key="index" class="creation-proccess__step mb-4 mb-lg-5" cols="12" md="6" lg="4">
                            <div class="creation-proccess__content">
                                <h3 class="creation-proccess__title">
                                    <span class="creation-proccess__title--step">{{ index < 9 ? `0${index+1}` : index+1}}</span>
                                    {{ step.title }}
                                </h3>
                                <div class="creation-proccess__description" v-html="step.description"/>
                            </div>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </b-container>
</template>
<script>
export default {
    data() {
        return {
            labels: {
                title: ['Creation','Process'],
                subtitle: "Research. Together.",
                description: ""
            },
            process: [
                {
                    title: "Research",
                    description: "We must evaluate the precedents and acquire the largest amount of data regarding what we want to give solution"
                },
                {
                    title: "Design",
                    description: "It's time to play, to create, to immerse yourself in the theme and get the best strategy for your users"
                },
                {
                    title: "Prototype",
                    description: "But the last word is the users, evaluate the design of their hand they ensure that in the end you have the perfect product for them"
                },
                {
                    title: "Improve",
                    description: "Re think things with all the feedback received from users and apply them to the design involves people in the process achieving a better goal"
                },
                {
                    title: "Deploy",
                    description: "Once out of the design flow, the solution is deployed, thought and adjusted to the real needs of the users"
                },
                {
                    title: "Support",
                    description: "In the end, you will not be alone, any disturbance, mishap or stumble with the final product, we will look for you again the best solution together"
                }
            ]
        }
    }
}
</script>
