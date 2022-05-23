<script>
    export let text
</script>

<div class="container">
    <div class="divider"></div>
    <h3>
        {@html text}
    </h3>
    <div class="divider"></div>
</div>


<style>
    .container {
        width:90%;
        max-width: 650px;
        margin: 4rem auto 4rem auto;
        text-align: center;
    }
    h3 {
        font-size:3rem;
        font-family:'Josefin Slab', serif;
        white-space: normal;
    }
    .divider {
		height:0.2rem;
		width:60%;
		background-color:hsl(217, 65%, 67%) ;
		margin:2rem auto;
		border-radius: 0.1rem;
	}
</style>