<script>
    export let data=[{
        nama:'',
        umur:'',
        menabung:'',
        domisili:'',
        alasan:'',
        profesi:'',
        catatan:'',
        celengan:false
    }]
</script>

<section class="tabungan">
    {#each data as d}
    <div class="container">
        <div class="name">{d.nama} ({d.umur})</div>
        <div class="bottom">
            <div class="left">
                <div class="menabung">
                    <p class='key'>Menabung:</p>
                    <p class='value'>{d.menabung}</p>
                </div>
                <div class="alasan">
                    <p class='key'>Alasan:</p>
                    <p class='value'>{d.alasan}</p>
                    
                </div>
                <div class="catatan">
                    <p class='key'>Catatan:</p>
                    <p class='value'>{d.catatan}</p>
                    
                </div>
            </div>
            <div class="right">
                <div class="domisili">
                    <p class='key'>Domisili:</p>
                    <p class='value'>{d.domisili}</p>
                </div>
                <div class="profesi">
                    <p class='key'>Profesi:</p>
                    <p class='value'>{d.profesi}</p>
                </div>
                {#if d.celengan}
                    <div class="img">
                        <img src="./images/bank-celengan-01.png" alt="">
                    </div>
                {:else}
                    <div class="img">
                        <img src="./images/bank-celengan-02.png" alt="">
                    </div>
                {/if}
            </div>
        </div>
    </div>
    {/each}
</section>


<style>
    .tabungan {
        font-family: 'Roboto';
        width:90%;
        max-width: 650px;
        margin: 4rem auto 4rem auto;
        text-align: left;
        white-space: normal;
    }
	.container{
		background-color: white;
        box-shadow: 1px 1px 5px hsla(0,0%,50%,0.5);
		color: black;
		padding:1rem;
		margin-top:0.5rem;
		margin-bottom:0.5rem;
		border-radius:0.5rem;
	}
    .key {
        color:hsl(0,0%,50%);
        font-size:0.6rem;
        margin: 0;
    }
    .name {
        font-size:1.2rem;
        margin-bottom: 0.5rem;
        font-family: 'Azeret Mono', monospace;
    }
    .container {
        display: flex;
        flex-direction: column;
    }
    .bottom {
        display:flex;
    }
    .value {
        margin-top:0.25rem;
        font-size: 0.8rem;
    }
    .right {
        width:25%;
        max-width:100px;
    }
    .left {
        width:70%;
    }
    .img {
        max-width:80px;
        width:100%;
    }
    img{
        width:100%;
    }
</style>