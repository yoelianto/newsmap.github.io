<script>
    import { WhatsApp, Facebook, Twitter } from 'svelte-share-buttons-component';
    import Fa from 'svelte-fa'
    import { faShare } from '@fortawesome/free-solid-svg-icons'

    export let url, title

</script>

<!-- <div class="share">
    <Fa icon={faShare} />
</div> -->

    <WhatsApp class="share-button sb1" text="{title} {url}"/>

    <Facebook class="share-button sb2" quote="{title}" {url} />

    <Twitter class="share-button sb3" text="{title}" {url} via="jurno_id" />



<style>
    :global(.share-button:hover) {
        background-color: #ef5959 !important;
    }
    :global(.share-button) {
        background-color: #ef5959 !important;
        clip-path: ellipse(20px 20px at 50% 55%) !important;
        z-index: 1100;
        position: fixed;
        right:10px;
    }
    :global(.sb1) {
        bottom:40px
    }
    :global(.sb2) {
        bottom:85px
    }
    :global(.sb3) {
        bottom:130px
    }

    /* .share {
        position: fixed;
        width:40px;
        height: 40px;
        border-radius: 50px;
        bottom:25px;
        right:25px;
        background-color: #ef5959;
        color: #fafafa;
        z-index: 1200;
    } */
</style>