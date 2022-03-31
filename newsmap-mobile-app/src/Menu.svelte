<script>
    let menus = [
        {menu:'Home',id:0, active:true, link:"#newsmap", source:"./image/home.svg"},
        {menu:'Search',id:1, active:false, link:"#search", source:"./image/search.svg"},
        {menu:'Jurno',id:2, active:false, link:"#original", source:"./image/artikel.svg"},
        {menu:'Podcast',id:3, active:false, link:"#podcast", source:"./image/podcast.svg"}
    ]

    const menuClick = (id) => {
        menus.forEach((menu) => {
            menu.active = false;
        })
        menus[id].active = true;
    }
    
</script>

<nav class="container">
    <div class="menubar">
        {#each menus as list, key}
        <div class="menu" class:selected ="{list.active === true}">
            <div class="circle">
                <img src={list.source} alt={list.menu}>
            </div>

            <h4 class="menutext" id={list.id}>
                {list.menu}
            </h4>
        </div>
            
        {/each}
    </div>
</nav>


<style>
    .container {
        position:fixed;
        bottom:0;
        z-index: 100;
        width:100vw;
        height:80px;
        background-color: white;
        border-radius: 2rem 2rem 0 0;
        box-shadow: 0rem 1rem 1rem 1rem rgba(0,0,0,0.1);
    }
    .menubar {
        display: flex;
        margin: 0 auto;
        width: 88vw;
        justify-content: space-evenly;
    }
    .menu {
        color:#ef5959;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;
    }
    .menutext{
        font-family: var(--fontfamily3);
        font-weight: 700;
        font-size: 0.8rem;
        margin-top: 0.2rem;
    }
    .circle {
        width:9vw;
        height:9vw;
        background-color: #ef5959;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    img {
        width:6vw;
        height:6vw;
        fill: #A4D9D2;
    }
    .selected {
        color:#242053;
    }
    .selected .circle {
        background-color: #242053;
    }
    .selected img {
        color: #eefffc;
    }
    @media only screen and (min-width:1200px) {
        nav {
            display: none;
        }
    }
</style>