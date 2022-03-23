<script>
    export let scrollText = [];
</script>

<article class="scroll-article">
    
    <div class="step" data-step=0>
        <div class="step-text" id="st-0">
        </div>
    </div>

    {#each scrollText as text, key}
    <div class="step" data-step={ key + 1 }>
        <div class="step-text" id={`st-${ key + 1 }`}>
            <p>{ text }</p>
        </div>
    </div>
    {/each}
</article>

<style>

</style>