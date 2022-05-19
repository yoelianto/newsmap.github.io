<script>
    export let subjudul;
    export let list = [{
        img:'',
        tahun:'',
        berita:'',
        detail:''
    }];

</script>

<section>
    {#if subjudul}
        <h3>{ subjudul }</h3>
    {/if}
    {#each list as item, i}
        <div class="container">
            <div class="img">
                <img src={item.img} alt={item.berita}>
            </div>
            <div class="text">
                <p class='tahun'>{@html item.tahun}</p>
                <h3 class='berita' style="color:hsla(76, 69%, 41%)">{@html item.berita}</h3>
                {#if item.detail}
                <p class='detail' >{@html item.detail}</p>
                {/if}
            </div>
            
        </div>
    {/each}
</section>

<style>
    section {
        font-family: 'Roboto';
        width:90%;
        max-width: 650px;
        margin: 4rem auto 4rem auto;
        text-align: left;
    }
    h3{
        font-weight: 700;
        font-size: 1.5rem;
        line-height: 2.4rem;
        text-align: center;
        font-family: 'Roboto Mono';
        color:hsla(76, 69%, 41%, 1);
        white-space: normal;
    }
    .container {
        display: flex;
        flex-direction: row;
        width:60%;
        margin:0 auto;
        position: relative;
        margin-bottom: 2rem;
        border-radius: 1rem;
        padding: 1rem;
        box-shadow: 1px 1px 10px 0.1px lightgray;
    }
    .berita {
        text-align: left;
        white-space: normal;
    }
    .img {
        width:80px;
        height:80px;
        background-color: hsla(76, 69%, 41%, 0.5);
        border-radius: 50%;
    }
    img {
        width:100%;
    }
    .text {
        display: flex;
        flex-direction: column;
        width:70%;
        margin-left: 1rem;
    }
    .berita {
        margin:0;
        font-family: 'Mulish', sans-serif;
        line-height: 1.5rem;
    }
    .tahun {
        font-weight: 800;
        margin:0;
    }
    .detail {
        font-size: 1rem;
        white-space: normal;
    }
    @media only screen and (max-width: 800px) {
        section {
            width:80%;
        }
    }
    @media only screen and (max-width: 400px) {
        section {
            width:90%;
        }
        .container {
            width:80%;
        }
    }
</style>