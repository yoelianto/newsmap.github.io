<script>
    let menus = [
        {menu:'Jurno',id:0, active:false, link:"#jurno", source:"./images/home.svg"},
        {menu:'Original',id:1, active:false, link:"#original", source:"./images/search.svg"},
        {menu:'Deduktif',id:2, active:false, link:"#deduktif", source:"./images/deduktif.svg"},
        {menu:'Podcast',id:3, active:false, link:"#podcast", source:"./images/podcast.svg"}
    ]

    const menuClick = (id) => {
        menus.forEach((menu) => {
            menu.active = false;
        })
        menus[id].active = true;
    }
    
    export let showMenu
</script>

<nav>
    <div class="container"  class:moveDown={showMenu}>
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
    </div>
</nav>


<style>
    nav {
        position: fixed;
        bottom:0;
        z-index: 100;
    }
    .container {
        position:absolute;
        bottom:0;
        width:100vw;
        height:80px;
        background-color: white;
        border-radius: 2rem 2rem 0 0;
        box-shadow: 0rem 1rem 1rem 1rem rgba(0,0,0,0.1);
        transition: bottom 400ms ease-in-out;
    }
    .moveDown {
        bottom:-80px;
        transition: bottom 400ms ease-in-out;
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
        cursor: pointer;
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
    @media only screen /*xtrasmall*/
        and (max-width: 575px) {


    }
    @media only screen /*small*/
    and (min-width: 576px)
    and (max-width: 767px) {
    
    }
    @media only screen /*medium*/
    and (min-width: 768px)
    and (max-width: 991px) {
        .menubar {
            width: 50vw;
        }
        .container {
            height: 90px;
            width: 50vw;
            left: 25vw;
            border-radius: 2rem;
            bottom: 1rem;
        }
        .circle {
            width: 5vw;
            height: 5vw;
        }
        img {
            width:3vw;
            height:3vw;
        }
        .moveDown {
            bottom:-90px;
            transition: bottom 400ms ease-in-out;
        }
        .menu:hover {
            color:#242053;
            transition: color 400ms ease-in-out;
        }
        .circle:hover {
            background-color:#242053;
            transition: background-color 400ms ease-in-out;
        }
    }
    @media only screen /*large*/
    and (min-width: 992px)
    and (max-width: 1199px) {
       
    }
    @media only screen /*xtralarge*/
    and (min-width: 1200px) {
        .menubar {
            width: 50vw;
        }
        .container {
            height: 90px;
            width: 50vw;
            left: 25vw;
            border-radius: 2rem;
            bottom: 1rem;
        }
        .circle {
            width: 3vw;
            height: 3vw;
        }
        img {
            width:2vw;
            height:2vw;
        }
        .moveDown {
            bottom:-80px;
            transition: bottom 400ms ease-in-out;
        }
        .menu:hover {
            color:#242053;
            transition: color 400ms ease-in-out;
        }
        .circle:hover {
            background-color:#242053;
            transition: background-color 400ms ease-in-out;
        }
    }
</style>