<script>
    export let data =[{
        nama:'',
        follower:null
    }]
</script>

<div class="container">
    {#each data as d}
    <div class="profile">
        <div class="top">
            <p class='nama'>{d.nama}</p>
        </div>
        <div class="bottom">
            <div class="left">
                <div class="img">
                    <img src="" alt="">
                </div>
            </div>
            <div class="right">
                <p class="followers">{d.follower}</p>
                <p style='color:grey'>followers</p>
            </div>
        </div>
        
    </div>
    
    {/each}
</div>

<style>
    p {
        margin:0;
    }
    .container {
        width:60%;
        max-width:300px;
        margin:0 auto;
    }
    .profile {
        background-color: white;
        margin-bottom:1rem;
        padding:1rem;
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .bottom {
        display: flex;
        align-items: center;
        width:100%;
    }
    .left {
        width:100px;
        height:100px;
    }
    .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
    }
    .followers {
        font-size: 1.5rem;
        font-weight: bold;
    }
    .img {
        background-color: grey;
        width:100%;
        height:100%;
        border-radius: 50%;
    }
    .top {
        border-bottom: 1px solid grey;
        width:100%;
        text-align: center;
        margin-bottom: 0.5rem;
        padding-bottom:0.5rem;
        font-weight: bold;
    }

    @media only screen and (max-width:509px) {
        .left {
            width:60px;
            height:60px;
        }
    }
</style>