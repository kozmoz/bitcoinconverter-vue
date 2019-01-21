<template>
    <div class="position-absolute pr-2 language-selection">
        <div class="form-group my-0">
            <!--suppress HtmlFormInputWithoutLabel -->
            <select class="form-control form-control-sm" :value="locale" @input="updateLanguage">
                <option v-for="language of languages" :key="language" :value="language">
                    {{ $t(`message.${language}`) }}
                </option>
            </select>
        </div>
    </div>
</template>


<script>
    /**
     * Component to select currency from a list of currencies.
     */
    export default {
        computed: {
            languages: function () {
                return Object.keys(this.$i18n.messages);
            },
            title: function () {
                return process.env.VUE_APP_TITLE;
            },
            locale: function () {
                return this.$i18n.locale;
            }
        },
        methods: {
            updateLanguage(e) {
                this.$i18n.locale = e.target.value;
            }
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .language-selection {
        right: 0;
        /* Vertical align. */
        top: 50%;
        transform: translateY(-50%)
    }
</style>
