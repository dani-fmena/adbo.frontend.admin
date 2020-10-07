<template>
    <footer class="footer">
        <div class="container-fluid">
            <div class="copyright">
                © {{year}} made with ❤ by <a href="http://www.mamei.pro" target="_blank" rel="noopener">MAMEI</a>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    type YearDataT = {
        year: number
    }

    export default defineComponent({
        name: 'FooterContentLay',
        data (): YearDataT {
            return {
                year: new Date().getFullYear()
            }
        }
    })
</script>
