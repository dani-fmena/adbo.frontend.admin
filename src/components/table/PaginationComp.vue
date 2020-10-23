<template>
    <div class="mt-5 d-flex justify-content-center justify-content-sm-between">
        <div><p class="card-category"> Showing 1 to 5 of 50 entries </p></div>
        <ul class="pagination pagination-no-border">
            <li class="page-item prev-page disabled"><a aria-label="Previous" class="page-link">
                <i aria-hidden="true" class="tim-icons icon-double-left"></i></a>
            </li>
            <li class="page-item active"><a class="page-link">1</a></li>
            <li class="page-item"><a class="page-link">2</a></li>
            <li class="page-item"><a class="page-link">3</a></li>
            <li class="page-item"><a class="page-link">4</a></li>
            <li class="page-item"><a class="page-link">5</a></li>
            <li class="page-item page-pre next-page"><a aria-label="Next" class="page-link">
                <i aria-hidden="true" class="tim-icons icon-double-right"></i></a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'


    export default defineComponent({
        name: 'PaginationComp'
    })
</script>
